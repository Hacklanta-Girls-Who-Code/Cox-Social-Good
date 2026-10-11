import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-2n1wsg1ya7k2usm3.us.auth0.com"
      clientId="KDUKbLzAYscKejMsPI8Bn82fw4LgKelR"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://lifelocker-api",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
);
