import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 flex-col space-y-14'>
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='logo'
            width={32}
            height={162}
            className='h-8 w-fit'
          />
        </Link>

        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>
    </div>
  )
}

export default Admin
