'use client'

import React, { useState } from 'react'

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    className={`px-4 py-2 mx-2 border-b-2 ${isActive ? 'bg-primary text-white rounded-md' : 'border-transparent bg-[#F5F5F5] rounded-md'}`}
    onClick={onClick}
  >
    {label}
  </button>
)

export const TabContent: React.FC<TabContentProps> = ({ children }) => (
  <div>{children}</div>
)

const Tabs: React.FC<TabsProps> = ({ children, extraItems = [], title }) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const childrenArray = React.Children.toArray(children)

  return (
    <div>
      <div className="flex justify-between bg-white items-center">
        <div className="py-3">
          <span className="text-[20px] font-semibold border-gray-300 border-r-2 pr-2 mr-2">
            {title}
          </span>
          {childrenArray.map((tab, index) => (
            <Tab
              key={index}
              label={(tab as React.ReactElement).props.label}
              isActive={index === activeTab}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-2 justify-center">
            {extraItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">{childrenArray[activeTab]}</div>
    </div>
  )
}

export default Tabs
