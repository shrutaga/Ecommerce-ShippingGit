const express = require('express');
const mongoose = require('mongoose');

const app = express();
var cors = require('cors');
app.use(cors());

mongoose.connect(
  'mongodb+srv://shrutia2011:JhvfihDZWRV28S6I@clusterecommerce.2lwqhsx.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// // Define a schema for  data
// const myDataSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// Define a schema for the product collection
const myDataSchema = new mongoose.Schema({
  productId: Number,
  productName: String,
  inventoryQuantity: Number,
  shipOnWeekends: Boolean,
  maxBusinessDaysToShip: Number,
});

// Define a model for your data using the schema
const MyDataModel = mongoose.model('products', myDataSchema);

// Define a route that queries the database and returns the data
app.get('/mydata', async (req, res) => {
  try {
    const data = await MyDataModel.find().exec();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// // route for hellow world
// app.get('/hello', (req, res) => {
//   console.log('Received request for /hello');
//   res.send('Hello, world!');
// });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
