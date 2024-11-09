// src/components/Tab.tsx

import React from 'react'

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

export default Tab
