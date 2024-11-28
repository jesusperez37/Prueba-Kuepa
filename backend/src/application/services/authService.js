const UserRepository = require("../../infrastructure/repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  const { nombre, usuario, contraseña, tipo_usuario } = data;

  // Validar campos obligatorios
  if (!nombre || !usuario || !contraseña || !tipo_usuario) {
    throw new Error("Todos los campos son obligatorios");
  }

  // Verificar si el usuario ya existe
  const existingUser = await UserRepository.findUserByUsername(usuario);
  if (existingUser) {
    throw new Error("El nombre de usuario ya está en uso");
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(contraseña, 10);

  // Crear y guardar el usuario
  return UserRepository.createUser({
    nombre,
    usuario,
    contraseña: hashedPassword,
    tipo_usuario,
  });
};

const login = async (data) => {
  const { usuario, contraseña } = data;

  // Validar campos obligatorios
  if (!usuario || !contraseña) {
    throw new Error("Usuario y contraseña son obligatorios");
  }

  // Verificar si el usuario existe
  const user = await UserRepository.findUserByUsername(usuario);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  // Generar el token JWT
  const token = jwt.sign(
    { id: user._id, tipo_usuario: user.tipo_usuario },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Devolver el usuario y el token
  return {
    user: {
      id: user._id,
      nombre: user.nombre,
      usuario: user.usuario,
      tipo_usuario: user.tipo_usuario,
    },
    token,
  };
};



module.exports = { register, login };
