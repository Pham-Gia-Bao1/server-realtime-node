const mongoose = require("mongoose");

// Định nghĩa schema cho dữ liệu quần áo
const clothesSchema = new mongoose.Schema({
  name: { type: String, default: "" },      // Tên sản phẩm
  price: { type: String, default: "" },     // Giá sản phẩm
  description: { type: String, required: true },  // Mô tả sản phẩm
  images: [{ type: String, required: true }]      // URL hình ảnh sản phẩm
});

// Tạo model từ schema và chỉ định tên collection là 'products'
const Clothes = mongoose.model("test", clothesSchema, "products");

module.exports = Clothes;
