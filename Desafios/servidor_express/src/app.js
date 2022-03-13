import express from "express";
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 8080;
const DATA = "./productos.txt";
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

let visitasItem = 0;
let visitasItems = 0;

app.get("/items", async(req, res) => {
    try {
        visitasItems++;
        const productos = JSON.parse(await fs.promises.readFile(DATA, "utf-8"));
        return res.send({
            items: productos,
            cantidad: productos.length,
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/item-random", async(req, res) => {
    try {
        visitasItem++;
        const productos = JSON.parse(await fs.promises.readFile(DATA, "utf-8"));
        const producto = productos[Math.floor(Math.random() * productos.length)];
        return res.send({
            item: producto,
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/visitas", (req, res) => {
    res.send({
        visitas: {
            items: visitasItems,
            item: visitasItem
        }
    });
});