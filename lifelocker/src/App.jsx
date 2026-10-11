import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { createSupabaseClient } from "./lib/supabaseClient";

function App() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
    getIdTokenClaims, // Returns claims from id_token
  } = useAuth0();

  // useMemo creates the function to create the Supabase client. 
  // When Supabase callsback, this will return the ID token
  const supabase = useMemo(
    () => createSupabaseClient(getIdTokenClaims), [getIdTokenClaims]);

  const signup = () =>
    login({ authorizationParams: { connection: "email", screen_hint: "signup", } });

  // Uses the passworldess authentication connection
  const passwordlessLogin = () => login ({ authorizationParams: {connection: "email",} })

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  const testSupabaseConnection = async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("id")
      .limit(1);

  if (error) {
    console.error("Supabase test failed:", error);
    return;
  }

  console.log("Supabase test succeeded:", data);
};

const inspectAuth0Claims = async () => {
  const claims = await getIdTokenClaims();

  console.log("Auth0 token claims:", {
    sub: claims?.sub,
    role: claims?.role,
    issuer: claims?.iss,
    audience: claims?.aud,
  });
};


const testSupabaseIdentity = async () => {
  const { data, error } = await supabase.rpc("test_auth_identity");

  if (error) {
    console.error("Supabase identity test failed:", error);
    return;
  }

  console.log("Supabase identity result:", data);
};


  if (isLoading) return "Loading...";

  return isAuthenticated ? (
    <>
      <p>Logged in as {user.email}</p>

      <h1>User Profile</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <p>Auth0 user ID: {user.sub}</p>

      <button onClick={logout}>Logout</button>

      <button onClick={testSupabaseConnection}>
        Test Supabase Connection
      </button>

      <button onClick={inspectAuth0Claims}>
        Inspect Auth0 Claims
      </button>

      <button onClick={testSupabaseIdentity}>
        Test Supabase Identity
      </button>
    </>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}

      <button onClick={signup}>Signup</button>

      <button onClick={passwordlessLogin}>Login with Email</button>
   </>
  );
}

export default App;
