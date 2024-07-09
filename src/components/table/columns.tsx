"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Appointment } from "@/types/appwrites.types"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { DOCTORS } from "@/constants"
import Image from "next/image"


export type Payment = {
  id: string
  amount: number
  status: "pending" | "scheduled" | "cancelled"
  email: string
  patient: Appointment
  schedule: Date
  primaryPhysician: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id")
      return <p className="text-14-medium">{row.index + 1}</p>
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <p className="text-14-medium">{row.original.patient.name}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="min-w-[115px">
      <StatusBadge status={row.original.status} />
    </div>
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <p className="text-14-regular min-w-[100px]">{formatDateTime(row.original.schedule).dateTime}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = DOCTORS.find((doctor) => doctor.name === row.original.primaryPhysician)
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">{doctor?.name}</p>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          AppointmentModal
        </div>
      )
    },
  }
]
