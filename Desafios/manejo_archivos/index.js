import { Archivo } from './archivo.js';

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