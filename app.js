const express = require('express');
const wifi = require('node-wifi');

// Inicializa el módulo wifi
wifi.init({
  iface: null, // Usa la interfaz de red predeterminada
});

const app = express();
const os = require('os');
const dns = require('dns');
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


app.get('/info', (req, res) => {
    const hostname = os.hostname();
    const networkInterfaces = os.networkInterfaces();
    let ipAddress;
    let macAddress;
  
    // Encuentra la dirección IP y la dirección MAC de la interfaz de red activa
    for (const key in networkInterfaces) {
      const iface = networkInterfaces[key];
      for (const item of iface) {
        if (!item.internal && item.family === 'IPv4') {
          ipAddress = item.address;
          macAddress = item.mac;
          break;
        }
      }
      if (ipAddress && macAddress) break;
    }
  
    res.send({
      hostname,
      ipAddress,
      macAddress,
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

