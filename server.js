import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.port || 6789;

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile('www.html', {root: __dirname}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Διάβασμα των συνδέσμων και των εκθέσεων
let total_links = JSON.parse(fs.readFileSync(__dirname + '/links.json'));
let total_exhibitions = JSON.parse(fs.readFileSync(__dirname + '/exhibitions.json'));

// Αποστολή των συνδέσμων και εκθέσεων σε μορφή json
app.get('/api/links', (req, res) => res.json(total_links));
app.get('/api/exhibitions', (req, res) => res.json(total_exhibitions));






