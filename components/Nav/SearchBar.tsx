"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
}

interface SearchbarProps {
  categories: Category[];
}

const Searchbar: React.FC<SearchbarProps> = ({ categories }) => {
  const [categoryId, setCategoryId] = useState<string>("All");
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (categoryId === "All") {
      router.push("/");
    } else if (name === "") {
      router.push(`/${categoryId}/All`);
    } else {
      router.push(`/${categoryId}/${name}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 items-center w-auto">
      <Select
        value={categoryId}
        onValueChange={(value) => setCategoryId(value)}
      >
        <SelectTrigger className="w-10 md:w-min rounded-r-none">
          <SelectValue defaultValue="All" placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="w-[6rem] md:w-auto rounded-none"
        placeholder="Search"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        className="hidden md:block rounded-l-none p-1 rounded-r-full"
        variant="outline"
        size="icon"
        type="submit"
      >
        <Search />
      </Button>
    </form>
  );
};

export default Searchbar;
