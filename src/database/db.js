import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erro na conexão: ', err.message);
        return;
    }
    console.log('Conectado ao MySQL!');
});

export default db;