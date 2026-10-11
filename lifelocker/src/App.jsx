import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { GoogleGenAI, Type } from '@google/genai'

// Function to have convert a file object into the base64 format that Gemini expects.
const fileToGenerativePart = async (file) => {
  return new Promise((resolve, reject) => {
  // Create a new FileReader instance
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve ({
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type
        },
      });
    };
    reader.onerror = reject;
    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
};

// Function to process said base 64 file, have Gemini derive the text from it, 
// compile it in a .json format, and return it to the user.
export const analyzeDocumentImage = async (file) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not configured.');
    }

    const geminiClient = new GoogleGenAI({ apiKey });

    // Define our JSON Schema structure for the specific output we want from Gemini.
    const jsonSchema = {
      type: Type.OBJECT,
      properties: {
        docTitle: { 
          type: Type.STRING,
          description: "The title of the document.",
        },
        fullName: {
          type: Type.STRING,
          description: "The full legal name of the individual on the document.",
        },
        dateOfBirth: {
          type: Type.STRING,
          description: "The individual's Date of Birth converted into DD-MM-YYYY format.",
        },
        documentType: {
          type: Type.STRING,
          description: "The type of document provided (e.g., Passport, Driver's License, etc.).",
        },
      },
      required: ["docTitle", "fullName", "dateOfBirth", "documentType"],
    };

    const imageInput = await fileToGenerativePart(file);
    const prompt = 'Analyze this document image. Carefully extract the following details: Document Title, individual\'s Full Name, their Date of Birth (in DD-MM-YYYY format), and the specific Document Type.';
    
    const result = await geminiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [prompt, imageInput],
      config: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });
    const responseText = result.text;
    if (!responseText) {
      throw new Error('Gemini returned an empty response.');
    }

    return JSON.parse(responseText);
    
  } catch (error) {
    console.error("Error extracting document details:", error);
    throw error;
  }
};

function App() {
  // The following are state values to track 1. whether the API is processing the image, 2. the final JSON result, and 3. any errors that may occur during the extraction process.
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // This is a handler function that will capture the file from the HTML input element, trigger analyzeDocumentImage, and update the state values accordingly.
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // Do nothing if no file is selected.

    // Reset the state values prior to starting a new extraction process.
    setLoading(true);
    setExtractedData(null);
    setError(null);

    // Attempt to send the file to Gemini for analysis.
    try {
      const result = await analyzeDocumentImage(file);
      setExtractedData(result); // Store Gemini's JSON output in the state.
    } catch (error) {
      //setError("!! - Failed to extract document details. Please ensure the document is displayed clearly in the image and try again.");
      setError(error instanceof Error ? error.message : String(error));
      console.error(error);
    } finally {
      setLoading(false); // Regardless of success or failure, stop the loading state.
    }
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <div className="file-upload-container" style={{margin: '20px 0', padding: '15px', border: '1px dashed #FFEF00', borderRadius: '8px'}}>
            <label htmlFor="document-upload" style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>
              Upload Document Image (e.g., Passport, Driver's License, ID, etc.):
            </label>
            
            {/*The File Upload Input element*/}
            <input
              id="document-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading} // Disable the input while processing
            />

            {/*Various Conditional UI States*/}
            {loading && <p style={{ color: '#ffae00' }}>Please wait as Gemini AI processes your image...</p>}

            {error && <p style={{color: 'red'}}> {error}</p>}

            {extractedData && (
              <div className="result-card" style={{marginTop: '20px', textAlign: 'left', background: '#f2f2eb', padding: '15px', borderRadius: '8px'}}>
                <h3 style ={{color: '', marginTop: 0}}> File Processing Successful.</h3>
                <p><strong>Document Title:</strong> {extractedData.docTitle}</p>
                <p><strong>Full Name:</strong> {extractedData.fulLName}</p>
                <p><strong>Date of Birth:</strong> {extractedData.dateOfBirth}</p>
                <p><strong>Document Type:</strong> {extractedData.documentType}</p>
              </div>
            )}
              </div>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
