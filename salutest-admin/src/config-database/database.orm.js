const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");

const dbName = process.env.DB_SCHEMAS || "database_salutest";

mysql
  .createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  })
  .then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
      console.info("Base de datos creada o comprobada correctamente");
    });
  });

const persona_Modelo = require("../models/persona");
const empleado_Modelo = require("../models/empleado");
const paciente_Modelo = require("../models/paciente");
const usuarioEmpleado_Modelo = require("../models/usuario_empleado");
const usuarioPaciente_Modelo = require("../models/usuario_paciente");
const enfermedad_Modelo = require("../models/enfermedad");
const cita_medica_Modelo = require("../models/cita_medica");
const receta_medica_Modelo = require("../models/receta_medica");

const sequelize = new Sequelize("database_salutest", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado");
  })
  .catch((err) => {
    console.log("No se conecto");
  });

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

const persona = persona_Modelo(sequelize, Sequelize);
const empleado = empleado_Modelo(sequelize, Sequelize);
const paciente = paciente_Modelo(sequelize, Sequelize);
const usuario_empleado = usuarioEmpleado_Modelo(sequelize, Sequelize);
const usuario_paciente = usuarioPaciente_Modelo(sequelize, Sequelize);
const enfermedad = enfermedad_Modelo(sequelize, Sequelize);
const cita_medica = cita_medica_Modelo(sequelize, Sequelize);
const receta_medica = receta_medica_Modelo(sequelize, Sequelize);

//relaciones

persona.hasMany(empleado);
empleado.belongsTo(persona);

persona.hasMany(paciente);
paciente.belongsTo(persona);

empleado.hasMany(usuario_empleado);
usuario_empleado.belongsTo(empleado);

paciente.hasMany(usuario_paciente);
usuario_paciente.belongsTo(paciente);

module.exports = {
  persona,
  empleado,
  paciente,
  usuario_empleado,
  usuario_paciente,
  enfermedad,
  cita_medica,
  receta_medica,
};
