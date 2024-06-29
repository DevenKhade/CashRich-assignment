const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8800;

// const apiKey='27ab17d1-215f-49e5-9ca4-afd48810c149';

// Middleware
app.use(cors());
app.use(express.json());


// app.get('/api/crypto', async (req, res) => {
//     const symbol = req.query.symbol;
//     const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;

//     try {
//         const response = await axios.get(apiUrl, {
//             headers: {
//                 'X-CMC_PRO_API_KEY':apiKey ,
//             },
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// Example API endpoint using axios
app.get('/api/example', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
