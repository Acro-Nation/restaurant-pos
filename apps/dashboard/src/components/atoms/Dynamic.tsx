'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DynamicTabs = () => {
  const pathname = usePathname()
  const [tabs, setTabs] = useState<string[]>([])

  console.log(tabs)
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    setTabs([segments[segments.length - 1]])
  }, [pathname])

  return (
    <div className="">
      <div>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className="px-4 py-2 text-sm font-medium focus:outline-none "
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DynamicTabs
