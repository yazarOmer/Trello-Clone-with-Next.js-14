import { List } from "@prisma/client";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { ListWithCards } from "@/types";

interface ListContanierProps {
  data: ListWithCards[] | undefined;
}

export const ListContanier = ({ data }: ListContanierProps) => {
  return (
    <div className="flex gap-x-3 h-full">
      {data?.map((list) => {
        return <ListItem key={list.id} data={list} />;
      })}
      <ListForm />
    </div>
  );
};
