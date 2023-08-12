"use client";

import { CldImage } from "next-cloudinary";
import { ProductViewDocument } from "@/components/ProductList/FeaturedProducts";
import Link from "next/link";

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
      <div className="aspect-square rounded-xl">
        <CldImage
          src={product.images[0]}
          alt={product.name}
          width={200}
          height={200}
          crop="fill"
          gravity="auto"
          className="object-cover rounded-lg"
        />
      </div>
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
      </div>

      <div className="flex items-center justify-between">{price}</div>
    </Link>
  );
};

export default ProductCard;
