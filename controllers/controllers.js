const { obtenerUsuarios, registrarUsuario, autenticarUsuario, modificarUsuario, eliminarUsuario } = require("../model/model")
const jwt = require("jsonwebtoken")

const obtener_usuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios()
    res.json(usuarios)
  } catch (error) {
    res.status(error.code || 500).send(error)
  }
}

const registrar_usuario = async (req, res) => {
  try {
    const usuario = req.body
    await registrarUsuario(usuario)
    res.send("El usuario ha sido creado correctamente")
  } catch (error) {
    res.status(500).send(error)
  }
}

const autenticar_usuario = async (req, res) => {
  try {
    const { email, password } = req.body
    await autenticarUsuario(email, password)
    const token = jwt.sign({ email }, "az_AZ")
    res.send("Usuario autenticado con el token: " + token)
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
}

const modificar_usuario = async (req, res) => {
  try {
      const { id } = req.params
      const Authorization = req.header("Authorization")
      const token = Authorization.split("Bearer ")[1]
      console.log(token)
      jwt.verify(token, "az_AZ")
      const { email } = jwt.decode(token)
      await modificarUsuario(email, id)
      res.send(`Se han modificado los datos del usuario ${email}`)
  } catch (error) {
      res.status(error.code || 500).send(error)
  }
}

const eliminar_usuario = async (req, res) => {
  try {
      const { id } = req.params
      const Authorization = req.header("Authorization")
      const token = Authorization.split("Bearer ")[1]
      console.log(token)
      jwt.verify(token, "az_AZ")
      const { email } = jwt.decode(token)
      await eliminarUsuario(id)
      res.send(`Se ha eliminado al usuario ${email} ne la base de datos`)
  } catch (error) {
      res.status(error.code || 500).send(error)
  }
}

module.exports = { obtener_usuarios, registrar_usuario, autenticar_usuario, modificar_usuario, eliminar_usuario };