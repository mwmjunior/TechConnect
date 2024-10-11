const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Habilita o CORS para permitir requisições de outras origens

// Configura o armazenamento para salvar os arquivos na pasta "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Pasta "uploads" para armazenar os arquivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Adiciona um timestamp no nome do arquivo
    }
});

const upload = multer({ storage: storage });

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    // Retorna o caminho do arquivo
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Servir arquivos da pasta "uploads"
app.use('/uploads', express.static('uploads'));

// Iniciar o servidor na porta 4000 para não conflitar com o JSON Server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor de upload rodando na porta ${PORT}`);
});
