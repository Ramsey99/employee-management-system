import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"

import { ClerkProvider } from "@clerk/clerk-react"
import { BrowserRouter } from "react-router-dom"

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is missing in your .env file.")
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)
