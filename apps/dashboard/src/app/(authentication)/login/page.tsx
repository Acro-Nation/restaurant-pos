import ball from '../../../assets/ball.svg'
import login from '../../../assets/login.svg'
import logo from '../../../assets/Link 1.svg'
import Image from 'next/image'
import React from 'react'
import ball2 from '../../../assets/Group 9.svg'
import { LoginForm } from '@/components/auth/LoginForm'

const page = () => {
  return (
    <div className="mb-56">
      <Image
        src={ball}
        content='fill'
        alt="ball"
        className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:-left-4 hidden lg:flex "
      ></Image>
      <Image
        src={ball2}
        content='fill'
        alt="ball"
        className="absolute h-[204px] w-[204px] lg:h-[422px] lg:w-[422px]  lg:hidden  right-0  -top-10 "
      ></Image>
      <div className=" lg:max-w-[1600px] max-w-[335px] mx-auto flex items-center gap-5 relative top-20">
        <Image src={login} height={100} width={772} alt="login-person" className='hidden md:flex'></Image>
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
