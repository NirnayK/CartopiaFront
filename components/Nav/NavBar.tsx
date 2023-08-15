import Pfp from "./Pfp";
import Link from "next/link";
import Searchbar from "./SearchBar";
import { mongooseConnect } from "@/lib/mongoose";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GetLocalStoreCartCount } from "../HelperLocalStore";
import Category, { CategoryDocument } from "@/models/category";
import { Home, ShoppingCart } from "lucide-react";

const fetchCategories = async (): Promise<CategoryDocument[]> => {
  try {
    return await Category.find({}, "_id name").lean();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const Navbar = async () => {
  await mongooseConnect();

  const categories = await fetchCategories();

  const transformCategories = categories.map((category: CategoryDocument) => ({
    ...category,
    _id: category._id.toString(),
  }));

  return (
    <nav className="w-full flex flex-1 border-b-2 justify-between items-center gap-2 md:gap-5 p-2">
      {/* logo */}
      <Link href="/" className="flex gap-2 items-center h-8">
        <Home className="w-6 h-8" />
        <h1 className="hidden md:block md:text-2xl font-bold">Cartopia</h1>
      </Link>

      {/* select and input bar */}
      <div>
        <Searchbar categories={transformCategories} />
      </div>

      {/* profile picture and login/logout */}
      <div className="flex gap-1 md:gap-4 items-center">
        {/* Theme button */}
        <ThemeToggle />
        {/* profile picture */}
        <Link href="/profile">
          <Pfp />
        </Link>
        {/* cart  */}
        <Link href="/cart" className="flex gap-1 mr-4">
          {/* cart icon */}
          <ShoppingCart className="w-7 h-7" />
          {/* local storage count*/}
          <GetLocalStoreCartCount />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
