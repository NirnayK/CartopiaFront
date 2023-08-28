import { Document, models, model, Model, Schema } from "mongoose";

// Define the category schema
export interface CategoryDocument extends Document {
  product_ids: string[];
  quantity: number[];
  date: Date;
}

const OrderSchema: Schema<CategoryDocument> = new Schema({
  product_ids: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  quantity: [{ type: Number, required: true }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order: Model<CategoryDocument> =
  models.Order || model<CategoryDocument>("Order", OrderSchema);

export default Order;
