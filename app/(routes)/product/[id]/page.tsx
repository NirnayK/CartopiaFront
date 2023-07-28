"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { mongooseConnect } from "@/lib/mongoose";
import Product, { ProductProperties } from "@/models/product";
import { CldImage } from "next-cloudinary";

interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  properties: ProductProperties;
  images: string[];
}

const getProduct = async (id: string): Promise<ProductData> => {
  await mongooseConnect();
  try {
    const res = await Product.findById(id).lean();
    return res as ProductData;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      _id: "",
      name: "",
      price: 0,
      description: "",
      category: "",
      properties: {},
      images: [],
    };
  }
};

const Page = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const rawProduct = await getProduct(params.id);
      if (rawProduct && Object.keys(rawProduct).length > 0) {
        const formattedProduct: ProductData = {
          _id: rawProduct._id.toString(),
          name: rawProduct.name,
          price: rawProduct.price,
          description: rawProduct.description,
          category: rawProduct.category.toString(),
          properties: rawProduct.properties,
          images: rawProduct.images,
        };
        setProduct(formattedProduct);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return null;
  }

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(product.price);

  return (
    <div className="flex min-h-screen flex-col md:flex-row justify-between">
      <div className="flex h-[600px] flex-col space-y-4 md:flex-row md:gap-4">
        <CldImage
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          crop="fill"
          gravity="auto"
          className="object-cover w-full h-full rounded-lg"
        />
        <Card className="w-[300px] p-2 flex flex-col">
          <CardHeader className="text-md">{product?.name}</CardHeader>
          <CardContent>
            <CardDescription className="text-md">
              {product?.description}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription className="text-md">{formatted}</CardDescription>
          </CardFooter>
        </Card>
      </div>
      <Card className="my-auto">
        <CardContent className="pt-2 flex space-y-4 flex-col">
          <Button>Buy Now</Button>
          <Button>Add To Wishlist</Button>
          <Button>Add To Cart</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
