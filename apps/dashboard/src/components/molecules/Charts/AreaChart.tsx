'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 40, left: 20, bottom: 5 }}
      >
        <CartesianGrid stroke="#ddd" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f1f1f', borderColor: '#333' }}
          labelStyle={{ color: '#8884d8' }}
          formatter={(value) => `${((value as number) / 1000).toFixed(2)}k`}
          cursor={{ stroke: '#8884d8', strokeWidth: 2 }}
        />
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
  )
}

export default LineChartComponent
