"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { ProductViewDocument } from "@/components/ProductList/FeaturedProducts";

interface ProductCardProps {
  product: ProductViewDocument;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(product.price);

  return (
    <Link
      href={"/product/" + product._id}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border p-3 space-y-4"
    >
      <CldImage
        src={product.images[0]}
        alt={product.name}
        width={1000}
        height={1000}
        crop="thumb"
        gravity="auto"
        className="object-cover aspect-square h-1/3 md:h-[200px] w-auto  rounded-xl"
      />
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
      </div>
      <div className="flex items-center justify-between">{price}</div>
    </Link>
  );
};

export default ProductCard;
