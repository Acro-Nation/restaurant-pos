import { CategorySelectorProps } from "@/types/componentType";


const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoryOptions,
  selectedVariants,
  onVariantChange,
  openCategory,
  toggleCategory,
}) => {
  return (
    <div>
      {categoryOptions.map((category) => (
        <div key={category.label}>
          <button
            onClick={() => toggleCategory(category.label)}
            className="p-2 bg-white rounded-md mb-2 flex items-center h-[48px] w-full"
          >
            <span>{category.label}</span>
           
          </button>

          {openCategory === category.label && (
            <div className="bg-white p-3 mb-3 -mt-5">
              {category.variants.map((variant) => (
                <label key={variant.value} className="block">
                  <input
                    type="checkbox"
                    value={variant.value}
                    checked={selectedVariants[category.label]?.includes(variant.value) || false}
                    onChange={() => onVariantChange(category.label, variant.value)}
                    className="mr-2 checkbox-custom"
                  />
                  {variant.label}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
