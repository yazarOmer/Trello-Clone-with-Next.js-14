import { List } from "@prisma/client";
import { ListWrapper } from "./list-wrapper";
import { CardForm } from "./card-form";
import { ListHeader } from "./list-header";
import { ListWithCards } from "@/types";
import { CardItem } from "./card-item";

interface ListItemProps {
  data: ListWithCards;
}

export const ListItem = ({ data }: ListItemProps) => {
  return (
    <ListWrapper>
      <div className="w-full bg-[#f1f2f4] shadow-md rounded-md p-2">
        <ListHeader data={data} />
        {data?.cards.map((card) => (
          <CardItem key={card.id} data={card} />
        ))}
        <CardForm listId={data.id} />
      </div>
    </ListWrapper>
  );
};
