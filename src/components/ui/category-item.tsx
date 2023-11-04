import { Category } from "@prisma/client";
import { Badge } from "./badge";
import { CATEGORY_ITEM } from "@/constants/category-item";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Badge
      variant="outline"
      className=" flex items-center justify-center gap-2 rounded-xl py-3 "
    >
      {CATEGORY_ITEM[category.slug as keyof typeof CATEGORY_ITEM]}
      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;
