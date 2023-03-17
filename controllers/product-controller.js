import { ProductModel } from '../models/product-model.js';

export async function createProduct(req, res) {
  try {
    const doc = ProductModel({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      desc: req.body.desc,
    });

    await doc.save();

    res.status(200).send('Товар добавлен');
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось добавить товар');
  }
}

export async function getLastProducts(req, res) {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить товары');
  }
}

export async function getProducts(req, res) {
  try {
    const { category } = req.params;
    let products;
    
    if (category === 'all') {
      products = await ProductModel.find();
    } else {
      products = await ProductModel.find({ category });
    }

    res.status(200).json(products);
  } catch (error) {}
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (error) {}
}
