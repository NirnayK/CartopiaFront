"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface Category {
  _id: string;
  name: string;
}

interface SearchbarProps {
  categories: Category[];
}

const Searchbar: React.FC<SearchbarProps> = ({ categories }) => {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(category, search);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <form className="flex items-center" onSubmit={handleSumbit}>
      <select
        className="h-10 w-1/6 text-slate-600 rounded-l-md border-2 border-r-0 border-gray-200"
        id="category"
        name="category"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="all">All</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="relative">
        <input
          className="h-10 rounded-r-full text-slate-600 border-2 border-l-0 border-gray-200 p-2 pr-9"
          type="text"
          id="name"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-none outline-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
