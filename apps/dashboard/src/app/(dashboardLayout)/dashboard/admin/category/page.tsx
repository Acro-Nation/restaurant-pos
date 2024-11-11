'use client'

import { useState } from 'react'
import Tabs from '@/components/molecules/Tabs/Tabs'
import { Button } from '@/components/atoms/button'
import CategorySelector from '@/app/features/category/CategorySelector'
import CategoryCard from '@/app/features/category/categoryCard'


const CategoryPage = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string[]
  }>({})

  const [isCategorySelectorVisible, setIsCategorySelectorVisible] =
    useState(false)

  const categoryOptions = [
    {
      label: 'Burger',
      variants: [
        { value: 'chicken_burger', label: 'Chicken Burger' },
        { value: 'beef_burger', label: 'Beef Burger' },
        { value: 'veggie_burger', label: 'Veggie Burger' },
      ],
    },
    {
      label: 'Sandwich',
      variants: [
        { value: 'club_sandwich', label: 'Club Sandwich' },
        { value: 'grilled_sandwich', label: 'Grilled Sandwich' },
        { value: 'veggie_sandwich', label: 'Veggie Sandwich' },
      ],
    },
  ]

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  const handleVariantChange = (category: string, variantValue: string) => {
    setSelectedVariants((prevSelected) => {
      const currentVariants = prevSelected[category] || []
      const newVariants = currentVariants.includes(variantValue)
        ? currentVariants.filter((value) => value !== variantValue)
        : [...currentVariants, variantValue]

      return { ...prevSelected, [category]: newVariants }
    })
  }

  return (
    <div>
      <Tabs
        title={!isCategorySelectorVisible?'Category':'Add Category'}
        extraItems={[
          <Button
            key="addCategoryButton"
            className="btn bg-black my-6"
            onClick={() => setIsCategorySelectorVisible((prev) => !prev)}
          >
            Add category
          </Button>,
        ]}
      />

      <div className="flex p-4">
        {isCategorySelectorVisible && (
          <div className="w-[257px] flex-none">
            <CategorySelector
              categoryOptions={categoryOptions}
              selectedVariants={selectedVariants}
              onVariantChange={handleVariantChange}
              openCategory={openCategory}
              toggleCategory={toggleCategory}
            />
          </div>
        )}

        <div className="flex-1">
          <div className="lg:col-span-5 grid lg:grid-cols-3 md:grid-cols-2 gap-11 px-4">
            <CategoryCard amount="2000" title="Falafel Wrap" />
            <CategoryCard amount="1500" title="Veggie Burger" />
            <CategoryCard amount="1800" title="Chicken Shawarma" />
            <CategoryCard amount="2200" title="Lamb Kebab" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
