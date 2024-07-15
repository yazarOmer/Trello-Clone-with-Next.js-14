import { List } from "@prisma/client";
import { ListForm } from "./list-form";

interface ListContanierProps {
  data: List[] | undefined;
}

export const ListContanier = ({ data }: ListContanierProps) => {
  return (
    <div className="flex gap-x-3 h-full">
      {data?.map((list) => {
        return <p key={list.id}>{list.title}</p>;
      })}
      <ListForm />
    </div>
  );
};
