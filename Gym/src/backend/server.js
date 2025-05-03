const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// CONEXIÓN
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nutri'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// INSERTAR PACIENTE (POST)
app.post('/PACIENTES', (req, res) => {
    const {
        NOMBRE,
        NOMBRE2,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        SEXO,
        EDAD,
        CORREO,
        DIRECCION,
        TELEFONO,
        usuario_id
    } = req.body;

    const sql = `INSERT INTO PACIENTES
  (NOMBRE, NOMBRE2, APELLIDO_PATERNO, APELLIDO_MATERNO, SEXO, EDAD, CORREO, DIRECCION, TELEFONO, usuario_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        NOMBRE, NOMBRE2, APELLIDO_PATERNO, APELLIDO_MATERNO,
        SEXO, EDAD, CORREO, DIRECCION, TELEFONO, usuario_id
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar:', err);
            return res.status(500).json({ error: 'Error al registrar paciente' });
        }
        res.status(201).json({ message: 'Paciente registrado con éxito' });
    });
});

// INICIAR SERVIDOR
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});