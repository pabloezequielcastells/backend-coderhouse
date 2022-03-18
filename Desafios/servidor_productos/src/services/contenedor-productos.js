export default class ContenedorProductos {

    constructor() {
        this.productos = [];
    }

    getAll() {
        return this.productos;
    }

    get(id) {
        console.log(this.productos);
        let index = this.productos.findIndex(producto => producto.id == id);
        if (index >= 0) {
            return this.productos[index];
        } else {
            return null;
        }
    }

    add(product) {
        product.id = new Date().getTime();
        this.productos.push(product);
        return product;
    }
}