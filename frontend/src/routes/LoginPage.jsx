import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function LoginPage() {
  return (
    <div className='flex items-center justify-center w-full h-[calc(100vh-120px)]'>
        <SignIn signUpUrl='/register'/>
    </div>
  )
}

export default LoginPage