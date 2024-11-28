require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const connectDB = require("./infrastructure/db");

const authRoutes = require("./adapters/routes/authRoutes");
const messageRoutes = require("./adapters/routes/messageRoutes");

const socketHandler = require("./infrastructure/sockets/chatSocket");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Middleware de Express para parsear JSON

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

// Ruta base para pruebas
app.get("/", (req, res) => {
  res.render("index", { message: "Bienvenido al API Stream! 🟢" }); 
});

// Rutas HTTP
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// Inicializamos el WebSocket
socketHandler(server); // Usamos el manejador de WebSocket

// Manejo de errores genéricos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Ocurrió un error en el servidor" });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
