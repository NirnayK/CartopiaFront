import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/product";
import ProductCard from "./ProductCard";

interface CategoryID {
  category_id: string;
}

export interface ProductViewDocument {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

const getProducts = async (
  category_id: string
): Promise<ProductViewDocument[]> => {
  await mongooseConnect();
  try {
    const res: ProductViewDocument[] = await Product.find({
      category: category_id,
    })
      .select("name images price _id")
      .lean();

    const data: ProductViewDocument[] = res.map((product) => {
      return {
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        images: product.images,
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const CategoryProductsList: React.FC<CategoryID> = async ({ category_id }) => {
  const products = await getProducts(category_id);

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:gap-4 flex-wrap md:items-baseline">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CategoryProductsList;
