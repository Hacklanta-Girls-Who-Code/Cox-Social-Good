import { useState } from "react";

function Dashboard({ supabase }) {
    const [tab, setTab] = useState("documents");
    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentType, setDocumentType] = useState("");

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState("");
    const [analysis, setAnalysis] = useState(null);

    const upload = async () => {
        if (!selectedFile || isAnalyzing) return;

        setIsAnalyzing(true);
        setError("");
        setAnalysis(null);

        try {
            const fileBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result;
                    resolve(result.split(",")[1]);
                };
                reader.onerror = () => reject(new Error("Could not read the file."));
                reader.readAsDataURL(selectedFile);
            });

            const { data, error: functionError } =
                await supabase.functions.invoke("analyze-document", {
                    body: {
                        fileBase64,
                        mimeType: selectedFile.type,
                    },
                });

            if (functionError) {
                throw new Error(functionError.message || "Document analysis failed.");
            }

            if (data?.error) {
                throw new Error(data.error);
            }

            setAnalysis(data);

            const newDoc = {
                id: Date.now(),
                name: data.docTitle || documentType || selectedFile.name,
                image: selectedFile.type.startsWith("image/")
                    ? URL.createObjectURL(selectedFile)
                    : null,
                ...data,
            };

            setDocuments((prev) => [...prev, newDoc]);
            setTab("documents");
        } catch (err) {
            setError(err.message || "Something went wrong during upload.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#f2f2eb",
        }}
        >

            <div style={{
                width: "250px",
                backgroundColor: "#F0E592",
                color: "#1f2937",
                padding: "20px",
            }}
            >
                <img src="/img.webp" alt="Profile" style={{ width: "120px", borderRadius: "50%" }} />

                <h3>Jane Doe</h3>
                <p>Atlanta, GA</p>

                <hr />

                <p>My Profile</p>
                <p onClick={() => setTab("documents")} style={{ cursor: "pointer" }}>My Documents</p>
                <p onClick={() => setTab("contacts")} style={{ cursor: "pointer" }}>Contacts</p>
                <p onClick={() => setTab("upload")} style={{ cursor: "pointer" }}>Upload Document</p>
            </div>

            <div style={{
                flex: 1,
                padding: "30px",
                backgroundColor: "#f0f0ca",
                borderLeft: "3px solid #ccc",
            }}
            >

                <h1 style={{
                    color: "#1f2937",
                    marginTop: "60px",
                    marginBottom: "60px",
                    fontSize: "48px",
                    textAlign: "center"
                }}
                > LifeLocker
                </h1>

                <div style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "40px",
                    justifyContent: "center"
                }}
                >

                    {/* My Documents button */}
                    <button style={{
                        backgroundColor: tab === "documents"
                            ? "#1d4ed8"
                            : "#e5e7eb",
                        color: tab === "documents"
                            ? "white"
                            : "#1f2937",
                        border: "none", padding: "12px 24px",
                        cursor: "pointer",
                    }}
                        onClick={() => setTab("documents")}
                    > My Documents
                    </button>

                    {/* Upload Document button */}
                    <button style={{
                        backgroundColor: tab === "upload"
                            ? "#1d4ed8"
                            : "#e5e7eb",
                        color: tab === "upload"
                            ? "white"
                            : "#1f2937",
                        border: "none", padding: "12px 24px",
                        cursor: "pointer",
                    }}
                        onClick={() => setTab("upload")}
                    > Upload Document
                    </button>

                    {/* Contacts button */}
                    <button style={{
                        backgroundColor: tab === "contacts"
                            ? "#1d4ed8"
                            : "#e5e7eb",
                        color: tab === "contacts"
                            ? "white"
                            : "#1f2937",
                        border: "none", padding: "12px 24px",
                        cursor: "pointer",
                    }}
                        onClick={() => setTab("contacts")}
                    > Contacts
                    </button>
                </div>

                {tab === "documents" && (
                    <div>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "15px",
                        }}
                        >
                            {documents.map((doc) => (
                                <div key={doc.id} style={{
                                    backgroundColor: "#e5e7eb0e",
                                    color: "white",
                                    width: "220px",
                                    borderRadius: "10px",
                                    padding: "10px",
                                }}
                                >
                                    <h3>{doc.name}</h3>

                                    <button>
                                        Share
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "upload" && (
                    <div>
                        <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>

                            <option value="">Select Document Type</option>
                            <option value="Driver License">Driver License</option>
                            <option value="Birth Certificate">Birth Certificate</option>
                            <option value="Social Security Card">Social Security Card</option>
                            <option value="Medical Insurance Card">Medical Insurance Card</option>
                        </select>

                        <br /><br />

                        <input
                            type="file"
                            accept="image/*,.pdf,application/pdf"
                            onChange={(e) =>
                                setSelectedFile(e.target.files[0])
                            }
                        />

                        <br />
                        <br />
                        {isAnalyzing && <p>Analyzing document...</p>}

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <button onClick={upload} disabled={isAnalyzing || !selectedFile}>
                            {isAnalyzing ? "Analyzing..." : "Upload"}
                        </button>
                    </div>
                )}

                {tab === "contacts" && (
                    <div>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            alert("Contact information coming soon");
                        }}> Metro Atlanta Shelter</a>
                        <br />

                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            alert("Contact information coming soon");
                        }}> Community Resource Center</a>
                        <br />

                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            alert("Contact information coming soon");
                        }}> Case Worker Sarah Holmes</a>
                        <br />
                    </div>
                )}

            </div>
        </div>
    );
}

export default Dashboard;