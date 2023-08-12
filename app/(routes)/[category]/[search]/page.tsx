import { mongooseConnect } from "@/lib/mongoose";
import ProductCard from "@/components/ProductList/ProductCard";
import Category, { CategoryValue } from "@/models/category";
import Product, { ProductProperties } from "@/models/product";
import SearchForm from "@/components/search-form";

interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  properties: ProductProperties;
  images: string[];
}

interface CategoryData {
  values: CategoryValue[];
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
  } else {
    return await Product.find({
      category: category,
    });
  }
};

const refinedProductData = async (
  category: string,
  search: string
): Promise<ProductData[]> => {
  const data = await getProduct(category, search);
  return data.map((product) => {
    return {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category.toString(),
      properties: product.properties,
      images: product.images,
    };
  });
};

const getCategory = async (
  category: string
): Promise<CategoryData | undefined> => {
  const data = await Category.findById(category);
  if (data === null) return undefined;
  return {
    values: data.values,
  };
};
// Still need to add the sort functionality
const page = async ({
  params,
}: {
  params: { category: string; search: string };
}) => {
  await mongooseConnect();
  const products = await refinedProductData(params.category, params.search);
  const category = await getCategory(params.category);

  if (!products || !category) {
    return {
      notFound: true,
    };
  }

  return (
    <div className="flex gap-2">
      <div className="h-full p-2 w-1/6">
        <SearchForm values={category.values} />
      </div>
      <div className="flex p-4 flex-col space-y-4 md:flex-row md:gap-4 md:justify-between flex-wrap md:items-baseline">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default page;
