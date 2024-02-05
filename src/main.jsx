import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/login/index.jsx";
import SignupPage from "./components/signup/index.jsx";
import Redirect from "./components/redirect/index.jsx";
import Dashboard from "./components/dashboard/index.jsx";
import Links from "./components/links/index.jsx";
import QRCodes from "./components/qrcodes/index.jsx";
import QRCodesCreate from "./components/qrcodes/qrcodecreate/index.jsx";
import { UserAuthContextProvider } from "./context/UserAuthContext.jsx";
import ProtectedRoute from "./auth/protectedRoute.jsx";
import LinkCreate from "./components/links/linkcreate/index.jsx";
import Bio from "./components/bio/index.jsx";
import FreeRedirect from "./components/redirect/freeRedirect.jsx";
import FreeQrRedirect from "./components/redirect/freeQrRedirect.jsx";
import BioLink from "./components/bio/biotemplate/index.jsx";
import Linkdetail from "./components/links/linkdetail/linkdetail.jsx";
import QrRedirect from "./components/redirect/qrRedirect.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/links",
    element: (
      <ProtectedRoute>
        <Links />
      </ProtectedRoute>
    ),
  },
  {
    path: "/links/:shortlink",
    element: (
      <ProtectedRoute>
        <Linkdetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/qrcodes/:shortlink",
    element: (
      <ProtectedRoute>
        <Linkdetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "links/linkcreate",
    element: (
      <ProtectedRoute>
        <LinkCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/qrcodes",
    element: (
      <ProtectedRoute>
        <QRCodes />
      </ProtectedRoute>
    ),
  },
  {
    path: "qrcodes/qrcodescreate",
    element: (
      <ProtectedRoute>
        <QRCodesCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:shortUrl",
    element: <Redirect />,
  },
  {
    path: "/qr/:shortUrl",
    element: <QrRedirect />,
  },
  {
    path: "/freelink/:shortUrl",
    element: <FreeRedirect />,
  },
  {
    path: "/freeqr/:shortUrl",
    element: <FreeQrRedirect />,
  },
  {
    path: "/bio",
    element: (
      <ProtectedRoute>
        <Bio />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bio/:bioName",
    element: (
      <ProtectedRoute>
        <BioLink />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </React.StrictMode>
);
