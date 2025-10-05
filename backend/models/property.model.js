// backend/models/property.model.js
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    cep: { type: String, required: true, trim: true },
    sqls: { type: String, trim: true },
    street: { type: String, required: true, trim: true },   // rua
    number: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },  // bairro
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Under Maintenance"],
      default: "Available",
    },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

PropertySchema.index({ cep: 1 });
PropertySchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Property", PropertySchema);
