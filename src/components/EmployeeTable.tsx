import { AgGridReact } from "ag-grid-react"
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community"
import type { ColDef } from "ag-grid-community"
import type { Employee } from "../types/employee"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

ModuleRegistry.registerModules([AllCommunityModule])


const EmployeeTable = ({ employees }: { employees: Employee[] }) => {
  const columnDefs: ColDef<Employee>[] = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "Role", field: "role", sortable: true, filter: true },
    { headerName: "Joining Date", field: "joiningDate", sortable: true, filter: true },
  ]

  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
      <div
        className="ag-theme-alpine"
        style={{ height: 350, width: "100%" }}
      >
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          domLayout="autoHeight"
           theme="legacy"
        />
      </div>
    </div>
  )
}

export default EmployeeTable
