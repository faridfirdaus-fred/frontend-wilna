import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "@/app/(components)/Header";

// Types
type ProductFormData = {
  productId?: string;
  kodeProduk: string;
  name: string;
  stock: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
  initialData?: ProductFormData;
  onUpdate?: (updatedData: ProductFormData) => void;
};

// Modal Component
const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
  initialData,
  onUpdate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || { kodeProduk: "", name: "", stock: 1 }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Product name is required.");
      return;
    }
    if (formData.stock < 0) {
      alert("Stock must be a positive number.");
      return;
    }
    initialData && onUpdate ? onUpdate(formData) : onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Product" : "Create New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-5">
          <label className="block text-sm font-medium">Product Code</label>
          <input
            type="text"
            name="kodeProduk"
            placeholder="kode produk"
            value={formData.kodeProduk}
            onChange={handleChange}
            className="block w-full p-2 border rounded-md"
            required
          />

          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 border rounded-md"
            required
          />

          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="block w-full p-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
          >
            {initialData ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full bg-gray-500 text-white py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
