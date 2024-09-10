const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db"); // Import kết nối MongoDB
const Message = require("./models/Message"); // Import model Message
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins; specify your origin here if needed
  },
});

// Use CORS middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Configure multer to store files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name will be current time + file extension
  },
});

const upload = multer({ storage: storage });

// Middleware to serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files via this route

// Socket.IO handling
io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  // Handle sending text messages from the client
  socket.on("sendDataClient", async (msg) => {
    const { content, senderId, recipientId } = msg;
    const timestamp = new Date().toISOString(); // Add a timestamp

    // Tạo tin nhắn mới và lưu vào cơ sở dữ liệu
    const newMessage = new Message({
      content,
      senderId,
      recipientId,
      timestamp,
    });

    try {
      await newMessage.save();
      console.log(`Message saved successfully. Content: ${content}, Sender: ${senderId}, Recipient: ${recipientId}`);
      io.emit("sendDataServer", { data: { content, timestamp }, senderId, recipientId });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle image upload and sending URL to clients
  socket.on("sendImageClient", async (formData) => {
    const { senderId, recipientId, imageUrl } = formData;
    const timestamp = new Date().toISOString(); // Add a timestamp

    // Tạo tin nhắn mới và lưu vào cơ sở dữ liệu
    const newMessage = new Message({
      content: "", // Nội dung trống nếu có hình ảnh
      image: imageUrl,
      senderId,
      recipientId,
      timestamp,
    });

    try {
      await newMessage.save();
      io.emit("sendDataServer", {
        data: { content: "", image: imageUrl, timestamp },
        senderId,
        recipientId,
      });
    } catch (error) {
      console.error("Error saving image message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Endpoint to handle image upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const timestamp = new Date().toISOString(); // Add a timestamp
    res.status(200).json({ imageUrl, timestamp }); // Return the URL and timestamp of the uploaded image
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

app.use('/api/messages', require('./routes/messageRoutes'));

// Start server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
