const express = require('express');
const crudRoutes = require('./routes/crudRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/crud', crudRoutes);

const port = process.env.APP_PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
