"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(3),
  categoryId: z.string().nonempty(),
});

interface Category {
  _id: string;
  name: string;
}

interface SearchbarProps {
  categories: Category[];
}

const Searchbar: React.FC<SearchbarProps> = ({ categories }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-min flex flex-row items-center"
      >
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px] rounded-r-none">
                    <SelectValue defaultValue="All" placeholder="All" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-auto rounded-none "
                  placeholder="Enter product Name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="rounded-l-none rounded-r-full"
          variant="outline"
          size="icon"
          type="submit"
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
};

export default Searchbar;
