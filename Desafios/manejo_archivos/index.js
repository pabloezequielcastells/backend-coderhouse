import fs from 'fs';
class Archivo {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.productos = null;
    }

    async leer() {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                const texto = await fs.promises.readFile(this.nombreArchivo, "utf-8");
                this.productos = await JSON.parse(texto);
            } else {
                this.productos = [];
            }

            console.log(this.productos);
            return this.productos;
        } catch (error) {
            console.log("No se pudo leer: " + error);
        }
    }

    async guardar(producto) {
        try {
            if (!this.productos) await this.leer();
            producto.id = this.productos.length + 1;
            this.productos.push(producto);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos, null, "\t"));
        } catch (error) {
            console.log("Error al guardar " + error);
        }
    }

    async borrar() {
        try {
            await fs.promises.unlink(this.nombreArchivo);
            console.log("Archivo borrado exitosamente");
        } catch (error) {
            console.log("Error al borrar " + error);
        }
    }

}

const escuadra = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}

const calculadora = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
}

const globo = {
    title: "Globo Terraqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}

const archivo = new Archivo("productos.txt");


const agregarProductos = async() => {
    await archivo.guardar(escuadra);
    await archivo.guardar(calculadora);
    await archivo.guardar(globo);
    await leerArchivo();
}

const leerArchivo = async() => {
    const productos = await archivo.leer();
    console.log(productos);
}

const borrarArchivo = async() => {
    await archivo.borrar();
}

// leerArchivo();

agregarProductos();

// borrarArchivo();