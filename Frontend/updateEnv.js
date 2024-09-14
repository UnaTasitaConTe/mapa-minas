const fs = require("fs");
const path = require("path");

// Define las variables de entorno del Dockerfile
const dockerEnv = {
  urlConnection: process.env.URL_CONNECTION || "http://localhost:3000/api",
  mapBoxToken: process.env.MAPBOX || "token",
};

// Lee el archivo .env.example.js
const exampleFilePath = path.join(__dirname, "./Infrastructure/env.example.js");
const envFilePath = path.join(__dirname, "./Infrastructure/env.js");

// Lee el contenido del archivo .env.example.js
fs.readFile(exampleFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error al leer el archivo ${exampleFilePath}: ${err}`);
    return;
  }

  // Reemplaza los valores en el contenido del archivo
  let updatedData = data
    .replace(/token/g, dockerEnv.mapBoxToken)
    .replace(/http:\/\/localhost:3000\/api/g, dockerEnv.urlConnection);

  // Escribe el contenido actualizado en env.js
  fs.writeFile(envFilePath, updatedData, "utf8", (err) => {
    if (err) {
      console.error(`Error al escribir el archivo ${envFilePath}: ${err}`);
      return;
    }

    console.log(`Archivo ${envFilePath} actualizado exitosamente.`);

    // Elimina el archivo .env.example.js
    fs.unlink(exampleFilePath, (err) => {
      if (err) {
        console.error(
          `Error al eliminar el archivo ${exampleFilePath}: ${err}`
        );
        return;
      }

      console.log(`Archivo ${exampleFilePath} eliminado exitosamente.`);
    });
  });
});
