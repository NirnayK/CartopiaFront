import { Button } from "@/components/ui/button";
import { mongooseConnect } from "@/lib/mongoose";
import CloudinaryImage from "@/components/CloudinaryImage";
import Product, { ProductProperties, ProductDocument } from "@/models/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  properties: ProductProperties;
  images: string[];
}

const getProduct = async (id: string): Promise<ProductData | undefined> => {
  await mongooseConnect();
  const res: ProductDocument | null = await Product.findById(id).lean();
  if (res === null) {
    return undefined;
  }
  return {
    _id: res._id.toString(),
    name: res.name,
    price: res.price,
    description: res.description,
    properties: res.properties,
    images: res.images,
  };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);
  console.log(product);
  if (!product) {
    return null;
  }

  const handleCart = () => {
    // create user with email,cart,profile
    // let profile have name and email and address too
    // address not required intially but later on it will be
    // cart will be an array of objects with product id and quantity
  };

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(product.price);

  return (
    <div className="flex  flex-col md:flex-row justify-between">
      <div className="flex h-[600px] flex-col space-y-4 md:flex-row md:gap-4">
        <CloudinaryImage product={product} />
        <Card className="w-[300px] h-min p-2 flex flex-col">
          <CardHeader className="text-md border">{product?.name}</CardHeader>
          <CardContent>
            <CardDescription className="text-md">{formatted}</CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription className="text-md flex space-y-4 flex-col">
              {product?.description}
              <div>
                {Object.entries(product?.properties).map(([key, value]) => (
                  <div className="flex gap-2" key={key}>
                    <h1>{key}:</h1> <h2>{value}</h2>
                  </div>
                ))}
              </div>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
      <Card className="my-auto mr-4">
        <CardContent>
          <div className="pt-6 flex space-y-4 flex-col">
            <Button>Buy Now</Button>
            <div className="flex gap-2">
              <h1>Quantity:</h1>
              <Input type="number" min="1" max="10" />
            </div>
            <Button>Add To Cart</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
