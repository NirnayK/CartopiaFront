import { model, models, Schema, Document } from "mongoose";

// Define the category values schema
interface CategoryValue {
  name: string;
  values: string[];
}

// Define the category schema
export interface CategoryDocument extends Document {
  name: string;
  values: CategoryValue[];
}

const CategorySchema: Schema<CategoryDocument> = new Schema({
  name: { type: String, required: true },
  values: [{ type: Object, required: true }],
});

// Check if the Category model has already been defined
// If yes, use the existing model; if not, create a new one
const Category =
  models.Category || model<CategoryDocument>("Category", CategorySchema);

export default Category;
