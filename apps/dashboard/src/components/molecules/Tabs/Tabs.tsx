'use client'
import React, { useState, ReactNode } from 'react'

interface TabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    className={`px-4 py-2 border-b-2 ${isActive ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
    onClick={onClick}
  >
    {label}
  </button>
)

interface TabContentProps {
  label: string
  children: ReactNode
}

export const TabContent: React.FC<TabContentProps> = ({  children }) => (
  <div>{children}</div>
)

interface TabsProps {
  children: ReactNode | ReactNode[] // Accepts a single or multiple children
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  // Ensure children is always an array, even if it's a single element
  const childrenArray = React.Children.toArray(children)

  return (
    <div>
      <div className="flex border-b">
        {childrenArray.map((tab, index) => (
          <Tab
            key={index}
            label={(tab as React.ReactElement).props.label}
            isActive={index === activeTab}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div className="p-4">{childrenArray[activeTab]}</div>
    </div>
  )
}

export default Tabs
