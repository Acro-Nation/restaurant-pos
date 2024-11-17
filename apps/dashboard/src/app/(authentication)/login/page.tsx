import React from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import Ball from '@/assets/Ball'
import Ball2 from '@/assets/Ball2'
import Image from 'next/image'
import logo from '@/assets/Link 1.png'
import login from '@/assets/Login.png'
const page = () => {
  return (
    <div className="mb-56">
      <Ball className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:-left-4 hidden lg:flex " />
      <Ball2 className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:hidden  right-0  -top-10 " />
      <div className=" lg:max-w-[1600px] max-w-[335px] mx-auto flex items-center gap-5 relative top-20">
        <Image src={login} height={100} width={772} alt="login-person"></Image>
        <div>
          <Image
            src={logo}
            height={60}
            width={120}
            alt="logo"
            className="h-auto"
          />
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  )
}

export default page
