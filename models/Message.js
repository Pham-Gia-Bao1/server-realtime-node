// models/Message.js

const mongoose = require("mongoose");

// Định nghĩa schema cho tin nhắn
const messageSchema = new mongoose.Schema({
  content: { type: String, default: "" }, // Nội dung tin nhắn
  image: { type: String, default: "" }, // URL hình ảnh nếu có
  senderId: { type: String, required: true }, // ID của người gửi
  recipientId: { type: String, required: true }, // ID của người nhận
  timestamp: { type: Date, default: Date.now }, // Thời gian gửi tin nhắn
});

// Tạo model từ schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
