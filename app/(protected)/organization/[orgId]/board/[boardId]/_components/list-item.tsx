import { List } from "@prisma/client";
import { ListWrapper } from "./list-wrapper";
import { CardForm } from "./card-form";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: List;
}

export const ListItem = ({ data }: ListItemProps) => {
  return (
    <ListWrapper>
      <div className="w-full bg-[#f1f2f4] shadow-md rounded-md p-2">
        <ListHeader data={data} />
        <CardForm />
      </div>
    </ListWrapper>
  );
};
