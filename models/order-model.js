import mongoose from 'mongoose';

const OrderProductSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  count: {
    type: Number,
    require: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    products: {
      type: [OrderProductSchema],
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'Новый',
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model('Order', OrderSchema);
