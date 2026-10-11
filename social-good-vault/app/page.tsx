import { auth0 } from "@/lib/auth0";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth0.getSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">LifeLocker</h1>
        {/* Redirects to Auth0 to sign up */}
        <a className="px-4 py-2 bg-blue-500 text-white rounded" href="/auth/login?screen_hint=signup">Signup</a>
        {/* Redirects to Auth0 to log in */}
        <a className="px-4 py-2 bg-gray-200 text-black rounded" href="/auth/login">Login</a>
      </div>
    );
  }

  return (
    <div className="p-8">
      <p className="text-xl font-semibold mb-4">Logged in as {session.user.email}</p>

      {/* Display user info (name, email, etc.) */}
      <h2 className="text-lg font-bold">User Profile</h2>
      <pre className="bg-gray-100 p-4 rounded mt-2">{JSON.stringify(session.user, null, 2)}</pre>

      {/* Ends the session and redirects to Auth0 to log out */}
      <br />
      <a className="px-4 py-2 bg-red-500 text-white rounded mt-4 inline-block" href="/auth/logout">Logout</a>
    </div>
  );
}