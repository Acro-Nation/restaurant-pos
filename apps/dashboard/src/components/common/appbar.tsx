import React from 'react'
import { Input } from '@/components/atoms/input'

import Image from 'next/image'
import NotificationIcon from '@/assets/icons/Notification'
import CartIcon from '@/assets/icons/CartIcon'
import { Search } from 'lucide-react'

const AppBar = () => {
  return (
    <div className="flex items-center justify-between p-4  w-full">
      <div className="flex-1 max-w-[730px] relative">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full  text-black bg-[#F5F5F5]" // Add padding to the left
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
          <Search className="w-5 h-5" />
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="hover:bg-[#F5F5F5] rounded-full p-2">
            <NotificationIcon />
          </button>
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </div>
        <div className="relative">
          <button className="hover:bg-[#F5F5F5] rounded-full p-2">
            <CartIcon />
          </button>
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Image
            src="https://s3-alpha-sig.figma.com/img/947c/cdec/a8d9bf6581dbac8f21b12a1c298903f7?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MFz2b36sKkwymR3uePUSmqQhCzEq0MToWZt27NgehO~srR4b1qjyf-DpUfmi58pbU0V1MlCqTTHOhAaRfS0u4TvoxRRSigq74zgZyMqDphS6UEZ74lsXODX0S2ZelJg4WnjdFLKneu0jUjfjKsGW5XirDQJCRq-eeyJP9qghEyODC5L4i6CAVWkcKMci7Z8CJYpEKqRZCBdmG07PZ6uYQZsWdMWQCAv7UG2Mp1rTp8wvHgyQOcd6OU0KgZvNJ1re9sXY76NzwePAEaBO5-xKHsuxXmY8semNw~QzwK-q-QeFpDEk~FI3Lrek~C4Z6J-o-PS8g6vFQskmg4Y1QSUo4w__" // Replace with the actual path to the profile image
            alt="Profile Picture"
            width={30}
            height={30}
            className="rounded-full size-[30px]"
          />
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-400">Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar
