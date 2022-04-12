const express = require('express');
const rutas = express.Router();

const {mostrar} = require('../controllers/perfil.controller');
const {check_login} = require('../lib/auth');

rutas.get('/perfil',check_login, mostrar);

module.exports = rutas;