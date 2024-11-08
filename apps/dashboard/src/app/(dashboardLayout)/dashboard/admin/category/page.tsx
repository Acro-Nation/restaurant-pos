import CategoryCard from '@/app/features/category/categoryCard'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <CategoryCard title={'Bruschetta'} amount={'200'} />
    </div>
  )
}

export default CategoryPage
