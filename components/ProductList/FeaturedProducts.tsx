import { mongooseConnect } from "@/lib/mongoose";
import FeatureProduct from "@/models/feature-product";
import ProductCard from "@/components/ProductList/ProductCard";

export interface ProductViewDocument {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

const getProducts = async (): Promise<ProductViewDocument[]> => {
  await mongooseConnect();
  try {
    const res: ProductViewDocument[] = await FeatureProduct.find({})
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

const FeaturedProducts = async () => {
  const data = await getProducts();

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:gap-4 flex-wrap md:items-baseline">
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
