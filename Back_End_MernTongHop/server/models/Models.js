const mongoose = require('mongoose');

// Admin Schema
const AdminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
}, { versionKey: false });

// Category Schema
const CategorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
}, { versionKey: false });

// Customer Schema
const CustomerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Number, default: 0 },
  token: { type: String, default: '' }
}, { versionKey: false });

// Product Schema
const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  cdate: { type: Number, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, { versionKey: false });

// Item Schema
const ItemSchema = new mongoose.Schema({
  product: ProductSchema,
  quantity: { type: Number, required: true }
}, { _id: false, versionKey: false });

// Order Schema
const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cdate: { type: Number, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  items: [ItemSchema],
  status: { type: String, default: 'PENDING' },
  total: { type: Number, required: true }
}, { versionKey: false });

// Create Models
const Admin = mongoose.model('Admin', AdminSchema, 'admins');
const Category = mongoose.model('Category', CategorySchema, 'categories');
const Customer = mongoose.model('Customer', CustomerSchema, 'customers');
const Product = mongoose.model('Product', ProductSchema, 'products');
const Order = mongoose.model('Order', OrderSchema, 'orders');

module.exports = {
  Admin,
  Category,
  Customer,
  Product,
  Order
};
