import ball from '../../../assets/ball.svg'
import login from '../../../assets/login.svg'
import logo from '../../../assets/Link 1.svg'
import Image from 'next/image'
import React from 'react'
import { LoginForm } from '@/components/login/LoginForm'

const page = () => {
  return (
    <div className="mb-56">
      <Image
        src={ball}
        height={100}
        width={250}
        alt="ball"
        className="absolute"
      ></Image>
      <div className="max-w-[1600px] mx-auto flex items-center gap-5 relative top-20">
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
