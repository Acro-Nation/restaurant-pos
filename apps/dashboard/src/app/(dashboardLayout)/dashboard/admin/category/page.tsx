import CategoryCard from '@/app/features/category/categoryCard'
import Tabs, { TabContent } from '@/components/molecules/Tabs/Tabs'

import React from 'react'

const CategoryPage: React.FC = () => {
  return (
    <div>
      <Tabs>
        <TabContent label="Category">
          <div className="grid lg:grid-cols-2 gap-2">
            <CategoryCard title="Own" amount="20000000" />
            <CategoryCard title="Investment" amount="10000000" />
          </div>
        </TabContent>
        <TabContent label="Category">p</TabContent>
      </Tabs>
    </div>
  )
}

export default CategoryPage
