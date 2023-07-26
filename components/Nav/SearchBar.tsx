"use client";

import axios from "axios";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/products`, {
        params: {
          categoryId: categoryId,
          name: name,
        },
      });

      // Handle the response data here (response.data)
      console.log(response.data);

      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 items-center w-min">
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
