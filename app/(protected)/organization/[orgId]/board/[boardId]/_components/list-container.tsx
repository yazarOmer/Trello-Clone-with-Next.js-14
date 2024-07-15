import { Button } from "@/components/ui/button";
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";

interface ListContanierProps {
  data: List[] | undefined;
}

export const ListContanier = ({ data }: ListContanierProps) => {
  return (
    <div className="flex gap-x-3 h-full">
      {data?.map((list) => {
        return <p key={list.id}>{list.title}</p>;
      })}
      <Button>list form</Button>
    </div>
  );
};
