import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = () => {
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
      </div>
    </div>
  )
}

export default Success
