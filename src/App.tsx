import { SignIn, UserButton, useUser } from "@clerk/clerk-react"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"

function App() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
        <div className="w-full max-w-md p-8 bg-indigo-300 rounded-2xl shadow-xl border border-indigo-100">
          <SignIn
            appearance={{
              elements: {
                card: "shadow-none", // prevent nested shadow
                formButtonPrimary:
                  "bg-indigo-600 hover:bg-indigo-700 text-white font-medium",
              },
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
      <div className="flex justify-end mb-4">
        <UserButton afterSignOutUrl="/" />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
