import { deleteList } from "@/actions/delete.list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  orgId: string;
}

export const ListOptions = ({ data, orgId }: ListOptionsProps) => {
  const { mutate: deleteListMutation } = useMutation({
    mutationFn: deleteList,
    onSuccess: (data) => {
      toast.success(`List '${data.title}' deleted`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    deleteListMutation({
      id,
      boardId,
      orgId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 hover:bg-white/75" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3 w-64" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-2">
          List Actions
        </div>
        <PopoverClose>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <input hidden name="orgId" id="orgId" value={orgId} />
          <Button
            type="submit"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete list
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
