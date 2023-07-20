import { mongooseConnect } from "@/lib/mongoose";
import Category, { CategoryDocument } from "@/models/category";
import Searchbar from "./SearchBar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Pfp from "./Pfp";
import { GetLocalStoreCartCount } from "../HelperLocalStore";

const Navbar = async () => {
  await mongooseConnect();

  const fetchCategories = async (): Promise<CategoryDocument[]> => {
    try {
      return await Category.find({}, "_id name").lean();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const categories = await fetchCategories();

  const transformCategories = categories.map((category: CategoryDocument) => ({
    ...category,
    _id: category._id.toString(),
  }));

  // Rest of the code remains the same...

  return (
    <nav className="p-4 flex items-center justify-between border-2 w-full">
      {/* logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>

      {/* select and input bar */}
      <Searchbar categories={transformCategories} />

      {/* profile picture and login/logout */}
      <div className="flex gap-4 items-center">
        {/* Theme button */}
        <ThemeToggle />
        {/* profile picture */}
        <Pfp />
        {/* cart  */}
        <div className="flex gap-1">
          {/* cart icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {/* local storage count*/}
          <GetLocalStoreCartCount />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
