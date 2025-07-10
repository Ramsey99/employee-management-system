import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Employee } from "../types/employee"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10,15}$/.test(val), {
      message: "Phone must be 10–15 digits",
    }),
  role: z.enum(["Developer", "Designer", "Manager"]),
  joiningDate: z.string().refine(
    (date) => new Date(date) <= new Date(),
    { message: "Date must be in the past or today" }
  ),
})

type FormData = z.infer<typeof schema>

const EmployeeForm = ({
  onSubmit,
}: {
  onSubmit: (data: Employee) => void
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const submitHandler = (data: FormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-md">
      <CardHeader className="text-center pb-0">
        <CardTitle className="text-2xl font-semibold text-indigo-700 tracking-tight">
          ➕ Add New Employee
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 px-2">
          {/* Name */}
          <div className="col-span-1">
            <Label htmlFor="name">Name</Label>
            <Input {...register("name")} id="name" placeholder="John Doe" />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} id="email" placeholder="john@example.com" />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <Label htmlFor="phone">Phone</Label>
            <Input {...register("phone")} id="phone" placeholder="Optional" />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Role */}
          <div className="col-span-1">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(val) => setValue("role", val as FormData["role"])}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto p-1 bg-white rounded-lg shadow-lg border border-gray-200 focus-within:border-indigo-500">
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
          </div>

          {/* Joining Date */}
          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="joiningDate">Joining Date</Label>
            <Input type="date" {...register("joiningDate")} id="joiningDate" />
            {errors.joiningDate && (
              <p className="text-sm text-red-500 mt-1">{errors.joiningDate.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end pt-2">
            <Button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700">
              Add Employee
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default EmployeeForm
