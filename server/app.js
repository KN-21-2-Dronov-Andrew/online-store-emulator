import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import multer from 'multer';

import * as categoryController from './controllers/category.js';
import * as goodController from './controllers/good.js';
import * as imageController from './controllers/image.js';

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get('/', (req, res) => {
    res.status(200).json({msg: "Root route"});
});


app.get('/categories', categoryController.getAll);
app.post('/categories', categoryController.postCategory);
app.put('/categories/:partitionKey/:rowKey', categoryController.putCategory);
app.delete('/categories/:partitionKey/:rowKey', categoryController.deleteCategory);


app.get('/goods', goodController.getAll);
app.get('/goods/:partitionKey', goodController.getAllInOneCategory);
app.post('/goods', goodController.postGood);
app.put('/goods/:partitionKey/:rowKey', goodController.putGood);
app.delete('/goods/:partitionKey/:rowKey', goodController.deleteGood);


app.post('/upload', upload.any(), imageController.postImage);


app.listen(process.env.PORT || PORT, () => {
    console.log("Server listens on port", process.env.PORT || PORT);
});