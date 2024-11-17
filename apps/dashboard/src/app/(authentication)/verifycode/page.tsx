import { VerifyForm } from '@/components/auth/verifyForm'
import logo from '../../../assets/Link 1.png'
import Image from 'next/image'
import React from 'react'
import Ball from '@/assets/ball'
import Ball2 from '@/assets/Ball2'

const page = () => {
  return (
    <div className="lg:mb-56 mb-36">
      <Ball className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:-left-4 hidden lg:flex " />

      <Ball2 className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]    right-0  -top-10 " />
      <div className=" lg:max-w-[530px] max-w-[335px] mx-auto flex items-center gap-5 h-screen justify-center mt-36 lg:mt-0">
        <div>
          <Image
            src={logo}
            height={60}
            width={120}
            alt="logo"
            className="h-auto lg:mx-auto"
          />
          <VerifyForm></VerifyForm>
        </div>
      </div>
    </div>
  )
}

export default page
