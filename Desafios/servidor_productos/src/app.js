import express from "express";
import ContenedorProductos from "./services/contenedor-productos.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productoService = new ContenedorProductos();

app.get("/api/productos/listar", (req, res) => {
    try {
        const productos = productoService.getAll();
        if (productos.length == 0) res.send({ error: "No hay productos cargados" });
        res.send(productos);
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/productos/listar/:id", (req, res) => {
    try {
        const id = req.params.id;
        if (!id) res.send({ error: "No se ha especificado el id" });
        const producto = productoService.get(id);
        if (!producto) res.send({ error: "Producto no encontrado" });
        res.send(producto);
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/productos/guardar", (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;
        if (!title) res.send({ error: "No se ha especificado el title" });
        if (isNaN(price)) res.send({ error: "No se ha especificado el price" });
        if (!thumbnail) res.send({ error: "No se ha especificado el thumbnail" });
        let newProducto = productoService.add({ title, price, thumbnail });
        res.send(newProducto);
    } catch (error) {
        console.log(error);
    }
});