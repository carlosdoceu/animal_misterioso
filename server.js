const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4200;


app.use(express.static('public'));

// Rota para obter dados dos animais
app.get('/api/animals', async (req, res) => {
  const animalName = req.query.name;
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/animals`, {
      headers: { 'X-Api-Key': process.env.API_ANIMAL },
      params: { name: animalName }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
