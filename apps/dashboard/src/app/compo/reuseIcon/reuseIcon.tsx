import React from 'react'

interface ReuseIconProps {
  size?: number
  color?: string
  onClick?: () => void
  icon?: React.ReactNode
  bgColor?: string
}

const ReuseIcon: React.FC<ReuseIconProps> = ({
  size = 24,
  color,
  onClick,
  icon,
  bgColor = '#00897B',
}) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center cursor-pointer ${bgColor ? `bg-[${bgColor}]` : 'bg-[#00897B]'}`}
      onClick={onClick}
      style={{ width: size, height: size, backgroundColor: bgColor }}
    >
      {icon ? icon : ''}
    </div>
  )
}

export default ReuseIcon
