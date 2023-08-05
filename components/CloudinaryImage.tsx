"use client";
import { ProductData } from "@/app/(routes)/product/[id]/page";
import { CldImage } from "next-cloudinary";

interface ProductCardProps {
  product: ProductData;
}

const CloudinaryImage: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex">
      {product.images.map((image) => (
        <CldImage
          key={image}
          src={image}
          alt={image}
          width={100}
          height={100}
          crop="fill"
          gravity="auto"
          className="object-cover rounded-lg"
        />
      ))}
    </div>
  );
};

export default CloudinaryImage;
