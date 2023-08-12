import Category from "@/models/category";
import { mongooseConnect } from "@/lib/mongoose";
import FeaturedProducts from "@/components/ProductList/FeaturedProducts";
import CategoryProductsList from "@/components/ProductList/CategoryProductsList";

export interface CategoryDocument {
  _id: string;
  name: string;
}

const getCategory = async (): Promise<CategoryDocument[]> => {
  await mongooseConnect();
  try {
    const res = await Category.find({}).select("name  _id");
    const data: CategoryDocument[] = res.map((category) => {
      return {
        _id: category._id.toString(),
        name: category.name,
      };
    });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const Home = async () => {
  const categories = await getCategory();

  return (
    <div className="space-y-8">
      {/* featured products */}
      <div>
        <h1 className="text-2xl font-bold">Featured Products</h1>
        <FeaturedProducts />
      </div>
      {/* all products */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category._id}>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <CategoryProductsList category_id={category._id} />
            {/* List products with category */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
