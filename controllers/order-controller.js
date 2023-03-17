import { OrderModel } from '../models/order-model.js';

export async function createOrder(req, res) {
  try {
    const doc = new OrderModel({
      products: req.body.products,
      buyer: req.userId,
      address: req.body.address,
      price: req.body.price,
    });

    await doc.save();

    res.status(200).send('Заказ создан');
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось создать заказ');
  }
}

export async function getBuyerOrders(req, res) {
  try {
    const orders = await OrderModel.find({ buyer: req.userId });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить заказы');
  }
}
