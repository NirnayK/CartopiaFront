import Product from "@/models/product";
import ProductCard from "@/components/ProdCard/ProductCard";
import { mongooseConnect } from "@/lib/mongoose";
import { ProductProperties } from "@/models/product";

interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  properties: ProductProperties;
  images: string[];
}

const getProduct = async (
  category: string,
  search: string
): Promise<ProductData[]> => {
  if (category != "All" && search != "All") {
    return await Product.find({
      category: category,
      name: { $regex: search, $options: "i" },
    });
  } else if (category == "All" && search != "All") {
    return await Product.find({
      name: { $regex: search, $options: "i" },
    });
  } else {
    return await Product.find({
      category: category,
    });
  }
};

const page = async ({
  params,
}: {
  params: { category: string; search: string };
}) => {
  await mongooseConnect();
  const products = await getProduct(params.category, params.search);

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:gap-4 flex-wrap md:items-baseline">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default page;
