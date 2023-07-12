import { Router } from "express";
import Product from "../model/product.model.js";
import { faker } from "@faker-js/faker";

const Products = Product;

const router = Router();

router.get("/products", async (req, res) => {
    await Products.sync();
    const products = await Products.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: products,
    });
});

router.get("/products/:product_id", async (req, res) => {
    await Products.sync();
    const product = await Products.findOne({
        where: { product_id: req.params.product_id },
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: product,
    });
});

router.post("/products", async (req, res) => {
    const { product_name, product_price, is_stock } = req.body;
    await Products.sync();
    await Products.create({
        // product_name: faker.commerce.productName(),
        // product_price: faker.commerce.price(),
        // is_stock: faker.datatype.boolean(),
        product_name,
        product_price,
        is_stock,
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Product created",
    });
});

router.put("/products/:product_id", async (req, res) => {
    const { product_name, product_price, is_stock } = req.body;

    await Products.update(
        {
            product_name,
            product_price,
            is_stock,
        },
        {
            where: {
                product_id: req.params.product_id,
            },
        }
    );
});

router.delete("/products", (req, res) => {
    res.send("Hello products!");
});

export default router;
