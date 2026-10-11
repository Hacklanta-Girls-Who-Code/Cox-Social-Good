import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { createSupabaseClient } from "./lib/supabaseClient";
import Dashboard from "./Dashboard";

function App() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
    getAccessTokenSilently,
  } = useAuth0();

  // useMemo creates the function to create the Supabase client. 
  // When Supabase callsback, this will return the ID token
  const supabase = useMemo(
    () => createSupabaseClient(getAccessTokenSilently), [getAccessTokenSilently]);

  const signup = () =>
    login({ authorizationParams: { connection: "email", screen_hint: "signup", } });

  // Uses the passworldess authentication connection
  const passwordlessLogin = () => login ({ authorizationParams: {connection: "email",} })

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return "Loading...";

  return isAuthenticated ? ( // when the user is authenticated. Display's dashboard.
    <>
      <p>Logged in as {user.email}</p>

      <Dashboard supabase={supabase}/>

      <button onClick={logout}>Logout</button>
    </>
  ) : ( // when the user is not
    <>
      {error && <p>Error: {error.message}</p>}

      <button onClick={signup}>Signup</button>

      <button onClick={passwordlessLogin}>Login with Email</button>
   </>
  );
}

export default App;
