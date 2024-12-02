import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, stock, kodeProduk } = req.body;

  if (!name || stock == null) {
    res.status(400).json({ message: "Name and stock are required." });
    return;
  }

  try {
    const product = await prisma.products.create({
      data: { kodeProduk, name, stock  },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product." });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { kodeProduk, name, stock } = req.body;

    if (!name || stock == null) {
      res.status(400).json({ message: "Name and stock are required." });
      return;
    }

    const updatedProduct = await prisma.products.update({
      where: { productId: id },
      data: { kodeProduk, name, stock },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.products.delete({
      where: { productId: id },
    });
    res.status(204).send(); // Mengembalikan status 204 (No Content) jika berhasil menghapus
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
