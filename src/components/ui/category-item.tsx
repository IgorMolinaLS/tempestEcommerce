import { Category } from "@prisma/client";
import { Badge } from "./badge";
import {
  HeadphonesIcon,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  SpeakerIcon,
  SquareIcon,
} from "lucide-react";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const categoryIcon = {
    keyboards: <KeyboardIcon size={20} />,
    monitors: <MonitorIcon size={20} />,
    headphones: <HeadphonesIcon size={20} />,
    mousepads: <SquareIcon size={20} />,
    speakers: <SpeakerIcon size={20} />,
    mouses: <MouseIcon size={20} />,
  };
  return (
    <Badge
      variant="outline"
      className=" flex items-center justify-center gap-2 rounded-xl py-3 "
    >
      {categoryIcon[category.slug as keyof typeof categoryIcon]}
      <span className="text-xs font-bold">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;
