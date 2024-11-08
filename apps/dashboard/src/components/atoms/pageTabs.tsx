'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DynamicTabs = () => {
  const pathname = usePathname()
  const [tabs, setTabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<number>(0)

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    setTabs([segments[segments.length - 1]])
    setActiveTab(0)
  }, [pathname])

  return (
    <div className="w-full border-t-4 border-gray">
      <div className="flex space-x-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 focus:outline-none ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-600'
                : ''
            }`}
            onClick={() => setActiveTab(index)} // Keeps it active when clicked
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DynamicTabs
