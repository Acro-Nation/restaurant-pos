import { VerifyForm } from '@/components/auth/verifyForm'
import ball from '../../../assets/ball.svg'
import ball2 from '../../../assets/Group 9.svg'
import logo from '../../../assets/Link 1.svg'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="lg:mb-56 mb-36">
      <Image
        src={ball}
        content="fill"
        alt="ball"
        className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:-left-4 hidden lg:flex "
      ></Image>
      <Image
        src={ball2}
        content="fill"
        alt="ball"
        className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]    right-0  -top-10 "
      ></Image>
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
