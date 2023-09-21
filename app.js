//Importar librerías o paquetes
const express = require("express");
const path = require("path");
const hbs = require("hbs");

//Especificar la función a emplear
const app = express();

//Definir el puerto
const port = 8080;

//Directorio de páginas estáticas
app.use(express.static("public"));

//Configuración del directorio de las vistas hbs
app.set("views", path.join(__dirname + "/public"));

hbs.registerPartials(__dirname + "/public/partials");

//Interpretar hbs por el servidor
app.set("view engine", "hbs");

app.get("/abo", (req, res) => {
  res.render("abonos", {
    vimo: "VM XXI Store",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    titulo: "Página no encontrada",
  });
});

app.listen(port, () => {
  console.log(`Escuchando por el puerto ${port}`);
});
