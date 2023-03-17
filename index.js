import mongoose from 'mongoose';
import express from 'express';

import cors from 'cors';
import multer from 'multer';
import {
  checkToken,
  getUser,
  login,
  register,
} from './controllers/user-controller.js';
import {
  createProduct,
  getLastProducts,
  getProduct,
  getProducts,
} from './controllers/product-controller.js';
import { createOrder, getBuyerOrders } from './controllers/order-controller.js';
const port = process.env.PORT || 3002;
const dbUrl = process.env.DB_URI;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => console.log('DB error', err));
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  try {
    res.send('Hello');
  } catch (err) {
    res.send(err);
  }
});

app.post('/uploads', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/user', checkToken, getUser);
app.post('/register', register);
app.post('/login', login);

app.post('/products', createProduct);
app.get('/products/last', getLastProducts);
app.get('/products/:category', getProducts);
app.get('/product/:id', getProduct);

app.post('/orders', checkToken, createOrder);
app.get('/orders', checkToken, getBuyerOrders);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
