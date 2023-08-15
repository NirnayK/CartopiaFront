"use client";
import axios from "axios";
import Gallery from "@/components/gallery";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductJSON } from "@/models/product";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/components/HelperLocalStore";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductJSON | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);

  //fetch the product
  useEffect(() => {
    const getProduct = async (id: string) => {
      const res = await axios.get(`/api/${id}`);
      const data: ProductJSON = res.data;
      data._id = data._id.toString();
      data.category = data.category.toString();
      setProduct(data);
    };
    getProduct(params.id);
  }, [params]);

  // create user with email,cart,profile
  // let profile have name and email and address too
  // address not required intially but later on it will be
  // cart will be an array of objects with product id and quantity

  return (
    product && (
      <div className="p-4 flex flex-col space-y-2 md:flex-row md:gap-2">
        <div className="h-[500px] w-[500px]">
          <Gallery images={product.images} />
        </div>
        <div className="p-4 flex flex-col text-center space-y-2">
          {/* name */}
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {/* price */}
          <h1 className="text-2xl font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
            }).format(product.price)}
          </h1>
          <h1 className="text-xl font-medium">{product.description}</h1>
          <hr />
          <div className="flex-col space-y-2">
            {Object.entries(product.properties).map(([key, value], index) => (
              <div key={index} className="flex gap-1">
                <h2 className="text-lg font-medium">{key}:</h2>
                <h3 className="text-lg font-light">{value}</h3>
              </div>
            ))}
          </div>
          <div className="flex-col space-y-3">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium">Quantity:</h1>
              <Input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <Button
              onClick={() => addToCart(product._id, quantity)}
              className="flex gap-2"
            >
              Add To Cart
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
