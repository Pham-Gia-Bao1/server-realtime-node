const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Import CORS

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins, you can specify your origin here
  },
});

// Use CORS middleware
app.use(cors());

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

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  // Handle sending text messages from the client
  socket.on("sendDataClient", (msg) => {
    const { content, senderId, recipientId } = msg;
    const timestamp = new Date().toISOString(); // Add a timestamp
    io.emit("sendDataServer", { data: { content, timestamp }, senderId, recipientId });
  });

  // Handle image upload and sending URL to clients
  socket.on("sendImageClient", (formData) => {
    const { senderId, recipientId, imageUrl } = formData;
    const timestamp = new Date().toISOString(); // Add a timestamp
    io.emit("sendDataServer", {
      data: { content: "", image: imageUrl, timestamp },
      senderId,
      recipientId,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


// Endpoint to handle image upload
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


server.listen(3000, () => {
  console.log("Server running on port 3000");
});
