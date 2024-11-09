import CategoryCard from '@/app/features/category/categoryCard'
import Tabs, { TabContent } from '@/components/molecules/Tabs/Tabs'

import React from 'react'

const CategoryPage: React.FC = () => {
  return (
    <Tabs>
      <TabContent label="Tab 1">
        <div className="grid lg:grid-cols-4 gap-2 p-6">
          <CategoryCard title="own" amount="20000000" />
          <CategoryCard title="own" amount="20000000" />
          <CategoryCard title="own" amount="20000000" />
          <CategoryCard title="own" amount="20000000" />
          <CategoryCard title="own" amount="20000000" />
          <CategoryCard title="own" amount="20000000" />
          <CategoryCard title="own" amount="20000000" />
        </div>
      </TabContent>
    </Tabs>
  )
}

export default CategoryPage
