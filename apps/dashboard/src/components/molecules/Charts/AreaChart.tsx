'use client'

import GrowIcon from '@/assets/icons/salesIcon/GrowIcon'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 4000 },
  { name: 'Mar', value: 6000 },
  { name: 'Apr', value: 2000 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 3000 },
  { name: 'Mar', value: 6000 },
  { name: 'Apr', value: 2000 },
  { name: 'May', value: 5000 },
  { name: 'Jun', value: 19700 },
]

const LineChartComponent: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
       <div className="flex items-center text-[14px] leading-[22px] font-medium text-primary h-[64px] gap-2 ">
        <GrowIcon />
        <div className="">+2.25% from last weekly</div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#ddd" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3F8CFF"
            strokeWidth={5}
            dot={{ r: 0 }}
            activeDot={{ r: 4, stroke: '#00c3ff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartComponent
