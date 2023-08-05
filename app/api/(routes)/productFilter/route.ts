import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/product";
import { ObjectId } from "mongodb";

export const POST = async (req: Request) => {
  console.log("POST request to /api/productFilter");
  try {
    const data = await req.json();
    const { categoryOG, search, parameters } = data;
    const category = new ObjectId(categoryOG);
    const filteredParameters = parameters.filter(
      (param: { name: string; values: string[] }) => param.values.length > 0
    );
    await mongooseConnect();
    try {
      console.log("Retriving products");
      console.log(category, search);
      const products = await Product.find({
        category: category,
        name: { $regex: search, $options: "i" },
      });
      // await Product.aggregate([
      //   { $match: { category, name: { $regex: search, $options: "i" } } },
      // {
      //   $match: {
      //     $or: filteredParameters.map(
      //       (param: { name: string; values: string[] }) => {
      //         return {
      //           [`properties.${param.name}`]: { $in: param.values },
      //         };
      //       }
      //     ),
      //   },
      // },
      // ]);
      console.log(products);
      console.log("Products retrived");
      return new Response();
      // return new Response(null, {
      //   status: 301,
      //   headers: {
      //     Location: `/${category}/${search}?products=${JSON.stringify(
      //       products
      //     )}`,
      //   },
      // });
    } catch (error) {
      console.log("Error in creating a new product");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
