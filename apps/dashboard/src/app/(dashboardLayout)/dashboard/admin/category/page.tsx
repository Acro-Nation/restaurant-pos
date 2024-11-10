import CategoryCard from '@/app/features/category/categoryCard'
import Tabs from '@/components/molecules/Tabs/Tabs'

import React from 'react'

const CategoryPage: React.FC = () => {
  return (
    <div>
      <Tabs title="Categories" />

      <div className="grid lg:grid-cols-6 gap-2 grid-cols-2 p-4">
       <CategoryCard amount='2000' title='Falafel Wrap'/>
      </div>
    </div>
  )
}

export default CategoryPage
