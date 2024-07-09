"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import AppointmentForm from "./forms/AppointmentForm"
import { Appointment } from "@/types/appwrites.types"


const AppointmentModal = ({
  type,
  patientId,
  userId,
  title,
  description,
  appointment
}: {
  type: 'schedule' | 'cancel'
  patientId: string
  userId: string
  title: string
  description: string
  appointment?: Appointment
}) => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>
          {type}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="shad-dialog sm:max-w-md">
        <AlertDialogHeader className="mb-4 space-y-3">
          <AlertDialogTitle className="capitalize">{type}</AlertDialogTitle>
          <AlertDialogDescription>
            Please fill in the following details to {type} an appointment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AppointmentModal