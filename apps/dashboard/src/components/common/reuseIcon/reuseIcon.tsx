import React from 'react'

interface ReuseIconProps {
  size?: number
  color?: string
  onClick?: () => void
  icon?: React.ReactNode
  bgColor?: string
  className?: string
}

const ReuseIcon: React.FC<ReuseIconProps> = ({
  size = 24,
  onClick,
  icon,
  bgColor = '#00897B',
  className,
}) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center cursor-pointer ${bgColor ? `bg-[${bgColor}]` : 'bg-primary'}${className}`}
      onClick={onClick}
      style={{ width: size, height: size, backgroundColor: bgColor }}
    >
      {icon ? icon : ''}
    </div>
  )
}

export default ReuseIcon
