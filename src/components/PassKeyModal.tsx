'use client'
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from './ui/input-otp';


import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { encryptKey } from '../lib/utils';


const PassKeyModal = () => {
  const [open, setOpen] = useState(true);
  const [passKey, setPassKey] = useState('');
  const [error, setError] = useState('');

  const validatePassKey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (passKey === process.env.ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);

      localStorage.setItem('encryptedKey', encryptedKey);
      setOpen(false);
    } else {
      setError('Invalid passkey. Please try again.');
    }
  }

  const router = useRouter();

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Admin Access Verification
            <Image
              src='/assets/icons/close.svg'
              alt='close'
              width={20}
              height={20}
              onClick={closeModal}
              className='cursor-pointer'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin panel, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} onChange={(value) => setPassKey(value)}>
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>
          {
            error && <p className='shad-error text-14-regular mt-4 flex justify-center'>
              {error}
            </p>
          }
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePassKey(e)} className='shad-primary-btn w-full'>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default PassKeyModal
