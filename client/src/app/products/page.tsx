"use client";

import { useState } from "react";
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from "@/state/api";
import { Button, CircularProgress } from "@mui/material";
import Header from "@/app/(components)/Header";
import PopupMessage from "@/app/(components)/PopUpMessage";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateProductModal from "./CreateProductModal";
import { PlusCircleIcon, SearchIcon } from "lucide-react";

type Product = {
  productId?: string;
  kodeProduk: string;
  name: string;
  stock: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .unwrap()
        .then(() => {
          setPopupMessage("Product deleted successfully");
          setPopupType("success");
        })
        .catch(() => {
          setPopupMessage("Failed to delete product");
          setPopupType("error");
        });
    }
  };

  const handleUpdate = async (data: Product) => {
    if (selectedProduct?.productId) {
      try {
        await updateProduct({
          id: selectedProduct.productId,
          updatedProduct: data,
        }).unwrap();
        setPopupMessage("Product updated successfully.");
        setPopupType("success");
      } catch {
        setPopupMessage("Failed to update product.");
        setPopupType("error");
      } finally {
        setSelectedProduct(null);
        setIsModalOpen(false);
      }
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  const columns: GridColDef[] = [
    { field: "kodeProduk", headerName: "Product Code", width: 180 },
    { field: "name", headerName: "Product Name", width: 220 },
    { field: "stock", headerName: "Stock", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.productId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="flex items-center justify-center py-10"><CircularProgress /></div>;
  if (isError || !products) return <div className="py-4 text-center text-red-500">Failed to load products. Please try again.</div>;

  return (
    <div className="w-full pb-5 mx-auto">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 m-2 text-gray-500" />
          <input
            className="w-full px-4 py-2 bg-white rounded"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex items-center justify-between mb-6">
        <Header name="Products" />
        <Button
          variant="contained"
          color="primary"
          className="flex items-center px-4 py-2"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create Product
        </Button>
      </div>

      {/* DATA TABLE */}
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="mt-5 bg-white border border-gray-200 rounded-lg shadow"
      />

      {/* Create/Update Product Modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={async (data: Product) => {
          try {
            await createProduct(data).unwrap();
            setPopupMessage("Product created successfully.");
            setPopupType("success");
          } catch {
            setPopupMessage("Failed to create product.");
            setPopupType("error");
          } finally {
            setIsModalOpen(false);
          }
        }}
        onUpdate={handleUpdate}
        initialData={selectedProduct || undefined}
      />

      {/* Popup Message */}
      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          type={popupType}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Products;
