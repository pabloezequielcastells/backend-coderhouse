import fs from 'fs';

export class Archivo {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.productos = null;
    }

    async leer() {
        try {
            if (fs.existsSync(`./files/${this.nombreArchivo}`)) {
                const texto = await fs.promises.readFile(`./files/${this.nombreArchivo}`, "utf-8");
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
            await fs.promises.writeFile(`./files/${this.nombreArchivo}`, JSON.stringify(this.productos, null, "\t"));
        } catch (error) {
            console.log("Error al guardar " + error);
        }
    }

    async borrar() {
        try {
            await fs.promises.unlink(`./files/${this.nombreArchivo}`);
            console.log("Archivo borrado exitosamente");
        } catch (error) {
            console.log("Error al borrar " + error);
        }
    }

}