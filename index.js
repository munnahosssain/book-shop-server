const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 3001;
const ObjectId = require('mongodb').ObjectId;
// const mongodb, {ObjectId} = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dxhff5w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const booksCollection = client.db('bookShop').collection('books');

        app.get('/books', async (req, res) => {
            const query = {};
            const cursor = booksCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/books/:id', async(req, res) => {
            const bookId = req.params.id;
            booksCollection.findOne(({ _id: ObjectId(bookId) }), function (err, book) {
                res.send(book);
            })
            // const result = await booksCollection.findOne({_id:ObjectId(bookId)});
            // res.send(result);
        });
    }
    finally { }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Practice maximum perfect!')
});

app.listen(port, () => {
    console.log(`BookShop app listening on port ${port}`)
});