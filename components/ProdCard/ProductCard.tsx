"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { ProductViewDocument } from "@/components/ProdCard/FeaturedProducts";
// import { Heart } from "lucide-react";

interface ProductCardProps {
  product: ProductViewDocument;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(product.price);

  return (
    <Card className="w-[300px] p-2 flex flex-col">
      <CardContent>
        <Link
          href={"/product/" + product._id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative h-[200px] rounded-md overflow-hidden p-1">
            {/* <div className="z-10 absolute top-2 w-6 h-6 right-3">
                <Heart color="red" className="p-1 cursor-pointer" size={30} />
              </div> */}
            <CldImage
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={300}
              crop="fill"
              gravity="auto"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex-col space-y-1">
        <Link
          href={"/product/" + product._id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardDescription className="text-md">{formatted}</CardDescription>
        </Link>
        <Link
          href={"/product/" + product._id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
