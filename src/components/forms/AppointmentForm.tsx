"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { Dispatch, SetStateAction, useState } from "react"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { DOCTORS } from "@/constants"
import { createAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrites.types"



export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const AppointmentFormValidationSchema = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidationSchema>>({
    resolver: zodResolver(AppointmentFormValidationSchema),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidationSchema>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note
        };
        const newAppointment = await createAppointment(appointment);
        if (newAppointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const buttonLabel = type === "cancel"
    ? "Cancel Appointment"
    : type === "schedule"
      ? "Schedule Appointment"
      : "Request Appointment";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeHolder="Select a Doctor">
              {DOCTORS.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image src={doctor.image} alt={doctor.name} width={32} height={32} className="rounded-full border border-dark-500" />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected Appointment Date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for Appointment"
                placeHolder="Enter Reason for Appointment"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeHolder="Enter Notes"
              />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="cancellationReason"
            label="Reason for Cancellation"
            placeHolder="Enter Reason for Cancellation"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel"
            ? "shad-danger-btn"
            : "shad-primary-btn"
            } w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm