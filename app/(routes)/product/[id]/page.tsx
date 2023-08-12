"use client";
import { useState, useEffect } from "react";
import { ProductProperties } from "@/models/product";
import axios from "axios";
import Gallery from "@/components/gallery";

export interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  properties: ProductProperties;
  images: string[];
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductData | undefined>(undefined);
  // const [formatted, setFormatted] = useState<string>("");

  //fetch the product
  useEffect(() => {
    const getProduct = async (id: string) => {
      const res = await axios.get(`/api/${id}`);
      const data: ProductData = res.data;
      data._id = data._id.toString();
      data.category = data.category.toString();
      setProduct(data);
    };
    getProduct(params.id);
  }, [params]);

  const handleCart = () => {
    // create user with email,cart,profile
    // let profile have name and email and address too
    // address not required intially but later on it will be
    // cart will be an array of objects with product id and quantity
  };

  // if (product) {
  //   const price = new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "INR",
  //   }).format(product.price);
  //   setFormatted(price);
  // }

  return (
    product && (
      <div className="p-4 flex flex-col space-y-4 md:flex-row md:gap-2">
        <div className="h-[500px] w-[500px]">
          <Gallery images={product.images} />
        </div>
        <div className="flex flex-col space-y-4"></div>
      </div>
    )
  );
};

export default ProductPage;

//  <div className="flex  flex-col md:flex-row justify-between">
//   <div className="flex h-[600px] flex-col space-y-4 md:flex-row md:gap-4">
//     <CloudinaryImage product={product} />
//     <Card className="w-[300px] h-min p-2 flex flex-col">
//       <CardHeader className="text-md border">{product?.name}</CardHeader>
//       <CardContent>
//         <CardDescription className="text-md">{formatted}</CardDescription>
//       </CardContent>
//       <CardFooter>
//         <CardDescription className="text-md flex space-y-4 flex-col">
//           {product?.description}
//           <div>
//             {Object.entries(product?.properties).map(([key, value]) => (
//               <div className="flex gap-2" key={key}>
//                 <h1>{key}:</h1> <h2>{value}</h2>
//               </div>
//             ))}
//           </div>
//         </CardDescription>
//       </CardFooter>
//     </Card>
//   </div>
//   <Card className="my-auto mr-4">
//     <CardContent>
//       <div className="pt-6 flex space-y-4 flex-col">
//         <Button>Buy Now</Button>
//         <div className="flex gap-2">
//           <h1>Quantity:</h1>
//           <Input type="number" min="1" max="10" />
//         </div>
//         <Button>Add To Cart</Button>
//       </div>
//     </CardContent>
//   </Card>
// </div>
