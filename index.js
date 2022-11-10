const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

//middle ware 
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Star Cloud Kitchen server is runnign')
})

app.listen(port, () => {
    console.log(`Star Cloud Kitchen server is runnign on ${port}`);
})