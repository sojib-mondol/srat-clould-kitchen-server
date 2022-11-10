const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

//middle ware 
app.use(cors());
app.use(express.json())


// mongo bd
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zmcxwrx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

        //database 1
        const serviceCollection = client.db('starCloudKitchen').collection('services');
        // database 2
        const orderCollection = client.db('starCloudKitchen').collection('orders');


        app.get('/main-dishes', async(req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/main-dishes/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        // orders api
        app.get('/orders', async(req, res) => {

            let query = {};
            if(req.query.email){
                query = {
                    email: req.query.email;
                }
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });

        app.post('/orders', async(req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })
    }
    finally{
        
    }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Star Cloud Kitchen server is runnign')
})

app.listen(port, () => {
    console.log(`Star Cloud Kitchen server is runnign on ${port}`);
})