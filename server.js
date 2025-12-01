const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',          // αν έχεις password άλλαξε το
    database: 'footballersbyposition'
});

db.connect(err => {
    if(err) throw err;
    console.log('Connected to MySQL');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static(__dirname));

app.get('/player/:position', (req, res) => {
    // === Η ΔΙΟΡΘΩΣΗ ΕΙΝΑΙ ΕΔΩ ===
    const position = parseInt(req.params.position); 
    // Χρησιμοποιούμε parseInt() για να μετατρέψουμε το string σε ακέραιο αριθμό.

    db.query('SELECT name FROM players WHERE position = ?', [position], (err, results) => {
        if(err) return res.status(500).send(err);
        
        // Αν δεν βρει παίκτες (το οποίο είναι απίθανο αν έχεις φορτώσει τη βάση σωστά)
        if(results.length === 0) return res.send('No players found for this position'); 

        const randomIndex = Math.floor(Math.random() * results.length);
        res.send(results[randomIndex].name);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});