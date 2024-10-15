const Clothes = require("../models/Clothes");

module.exports = {
  // Tạo (Create) một sản phẩm mới
  async createClothes(req, res) {
    try {
      const { name, price, description, images } = req.body;
      const newClothes = new Clothes({
        name,
        price,
        description,
        images,
      });
      await newClothes.save();
      return res.status(201).json({ message: "Clothes created successfully", data: newClothes });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create clothes", details: error.message });
    }
  },

  // Lấy tất cả (Read) sản phẩm
  async getAllClothes(req, res) {
    try {
      const clothes = await Clothes.find();
      return res.status(200).json({ message: "Clothes fetched successfully", data: clothes });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch clothes", details: error.message });
    }
  },

  // Lấy một sản phẩm (Read) theo ID
  async getClothesById(req, res) {
    try {
      const { id } = req.params;
      const clothes = await Clothes.findById(id);
      if (!clothes) {
        return res.status(404).json({ message: "Clothes not found" });
      }
      return res.status(200).json({ message: "Clothes fetched successfully", data: clothes });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch clothes", details: error.message });
    }
  },

  // Cập nhật (Update) sản phẩm theo ID
  async updateClothes(req, res) {
    try {
      const { id } = req.params;
      const { name, price, description, images } = req.body;

      const updatedClothes = await Clothes.findByIdAndUpdate(
        id,
        { name, price, description, images },
        { new: true, runValidators: true }
      );

      if (!updatedClothes) {
        return res.status(404).json({ message: "Clothes not found" });
      }

      return res.status(200).json({ message: "Clothes updated successfully", data: updatedClothes });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update clothes", details: error.message });
    }
  },

  // Xóa (Delete) sản phẩm theo ID
  async deleteClothes(req, res) {
    try {
      const { id } = req.params;
      const deletedClothes = await Clothes.findByIdAndDelete(id);

      if (!deletedClothes) {
        return res.status(404).json({ message: "Clothes not found" });
      }

      return res.status(200).json({ message: "Clothes deleted successfully", data: deletedClothes });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete clothes", details: error.message });
    }
  },
};
