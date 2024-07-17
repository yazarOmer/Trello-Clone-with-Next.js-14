import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
}

export const CardItem = ({ data }: CardItemProps) => {
  return (
    <div className="bg-white my-2 p-2 rounded-md px-3 text-sm font-medium border-2 border-transparent hover:border-black cursor-pointer shadow-sm">
      {data.title}
    </div>
  );
};
