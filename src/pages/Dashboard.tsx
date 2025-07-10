import { useEffect, useState } from "react"
import EmployeeForm from "../components/EmployeeForm"
import EmployeeTable from "../components/EmployeeTable"
import type { Employee } from "../types/employee"
import { Card, CardContent } from "@/components/ui/card"

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("employees")
    if (stored) {
      setEmployees(JSON.parse(stored))
    }
  }, [])

  const addEmployee = (emp: Employee) => {
    const updated = [...employees, emp]
    setEmployees(updated)
    localStorage.setItem("employees", JSON.stringify(updated))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-800 drop-shadow-md">
            👩‍💼 Employee Management App
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your team efficiently with a sleek UI
          </p>
        </div>

        {/* Employee Form Card */}
        <Card className="shadow-lg border border-indigo-200">
          <CardContent className="py-6 px-4 md:px-6">
            <EmployeeForm onSubmit={addEmployee} />
          </CardContent>
        </Card>

        {/* Employee Table Card */}
        <Card className="shadow-lg border border-indigo-200">
          <CardContent className="py-6 px-4 md:px-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Employee List</h2>
            <EmployeeTable employees={employees} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Dashboard
