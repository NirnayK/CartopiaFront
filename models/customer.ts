import { Document, models, model, Model, Schema } from "mongoose";

// Define the category schema
export interface CategoryDocument extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  created_at: Date;
  orders: string[];
}

const CustomerSchema: Schema<CategoryDocument> = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const Customer: Model<CategoryDocument> =
  models.Customer || model<CategoryDocument>("Customer", CustomerSchema);

export default Customer;
