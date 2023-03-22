const express = require('express');
const wifi = require('node-wifi');

// Inicializa el módulo wifi
wifi.init({
  iface: null, // Usa la interfaz de red predeterminada
});

const app = express();
const port = 3000;

// Ruta para obtener la información de las redes Wi-Fi
app.get('/wifi', (req, res) => {
  wifi.scan((error, networks) => {
    if (error) {
        console.log(error);

      res.status(500).send({ error: 'Error al obtener la información de las redes Wi-Fi' });
    } else {
        console.log(networks);
      res.send(networks);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// const express = require('express');
// const { exec } = require('child_process');

// const app = express();
// const port = 3000;

// app.get('/wifi', (req, res) => {
//   exec('iwlist wlan0 scan', (error, stdout, stderr) => {
//     if (error) {
//       res.status(500).send({ error: 'Error al obtener la información de las redes Wi-Fi', details: error });
//       return;
//     }
//     res.send(stdout);
//   });
// });

// app.listen(port, () => {
//   console.log(`Servidor ejecutándose en http://localhost:${port}`);
// });

