const pool = require("../config/db");
const bcrypt = require('bcryptjs')

const obtenerUsuarios = async () => {
  const { rows: usuarios } = await pool.query("SELECT * FROM usuarios")
  return usuarios
}

const registrarUsuario = async (usuario) => {
  let { email, password, rol, lenguage } = usuario
  const passwordEncriptada = bcrypt.hashSync(password)
  password = passwordEncriptada
  const values = [email, passwordEncriptada, rol, lenguage]
  const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)"
  await pool.query(consulta, values)
}

const autenticarUsuario = async (email, password) => {
  const values = [email]
  const consulta = "SELECT * FROM usuarios WHERE email = $1"
  const { rows: [usuario], rowCount } = await pool.query(consulta, values)
  const { password: passwordEncriptada } = usuario
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
  if (!passwordEsCorrecta || !rowCount)
  throw { code: 404, message: "Email o contraseña incorrecta" }
}

const modificarUsuario = async (rol, id) => {
  const consulta = "UPDATE usuarios SET rol= $1 WHERE id = $2"
  const values = [rol, id]
  const { rowCount } = await pool.query(consulta, values)
  if (!rowCount) throw { code: 404, message: "No se pudo modificar el usuario porque el id no existe" }
}

const eliminarUsuario = async (id) => {
  const consulta = "DELETE FROM usuarios WHERE id = $1"
  const values = [id]
  const { rowCount } = await pool.query(consulta, values)
  if (!rowCount) throw { code: 404, message: "No se pudo eliminar el usuario porque el id no existe" }
}

module.exports = { obtenerUsuarios, registrarUsuario, autenticarUsuario, modificarUsuario, eliminarUsuario };
