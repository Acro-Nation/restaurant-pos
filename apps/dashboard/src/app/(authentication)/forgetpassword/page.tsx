import login from '@/assets/Login.png'
import logo from '@/assets/Link 1.png'
import React from 'react'
import { ForgetPassForm } from '@/components/auth/ForgetPassword'
import Ball2 from '@/assets/Ball2'
import Image from 'next/image'
import Ball from '@/assets/Ball'

const page = () => {
  return (
    <div className="mb-56 relative">
      <Ball className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:-left-4 hidden lg:flex " />

      <Ball2 className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:hidden  right-0  -top-10 " />
      <div className=" lg:max-w-[1600px] max-w-[335px] mx-auto flex items-center gap-5 relative top-20">
        <Image
          src={login}
          height={100}
          width={772}
          alt="login-person"
          className="hidden md:flex"
        ></Image>
        <div>
          <Image
            src={logo}
            height={60}
            width={120}
            alt="logo"
            className="h-auto"
          />
          <ForgetPassForm></ForgetPassForm>
        </div>
      </div>
    </div>
  )
}

export default page
