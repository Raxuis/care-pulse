import { DOCTORS } from '@/src/constants';
import { getAppointment } from '@/src/lib/actions/appointment.action';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';

  const appointment = await getAppointment(appointmentId);

  const doctor = DOCTORS.find((doctor) => doctor.name === appointment.primaryPhysician);

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href="/">
          <Image
            src='/assets/icons/logo-full.svg'
            width={1000}
            height={1000}
            alt='logo'
            className='h-10 w-fit'
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={300}
            height={280}
          />
          <h2 className='header mb-6 max-w-[600px] text-center'>
            You have successfully <span className='text-green-500'> booked an appointment!</span>
          </h2>
          <p>We&apos;ll be in touch with you shortly to confirm.</p>
        </section>
        <section className='request-details'>
          <p>Requested Appointment Details</p>
          <div className='flex gap-3 items-center'>
            {/* <Image  */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Success
