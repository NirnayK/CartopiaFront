import Product from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    try {
      const product = await Product.findById(params.id);
      return new Response(JSON.stringify(product));
    } catch (error) {
      console.log("Error in finding product");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
