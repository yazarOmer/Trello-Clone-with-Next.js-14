"use client";

import { CiCirclePlus } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationSchema } from "@/schemas";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { createOrganization } from "@/actions/create-organization";
import { toast } from "sonner";
import { useState } from "react";

export const CreateOrganizationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createOrganizationMutaiton, isPending } = useMutation({
    mutationFn: createOrganization,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Organization "${data.name}" is created`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
    createOrganizationMutaiton(values);
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          size="square"
          variant="outline"
          className="flex flex-col items-center justify-center text-zinc-700 text-wrap"
        >
          <CiCirclePlus
            size={40}
            color="hsl(240 5.2% 33.9%)"
            className="mb-2"
          />
          Create an organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[375px]">
        <DialogHeader>
          <DialogTitle>Create an organization</DialogTitle>
          <DialogDescription>
            Create an organization to manage them
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={false}
                        placeholder="My organization"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              Create an organization
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
