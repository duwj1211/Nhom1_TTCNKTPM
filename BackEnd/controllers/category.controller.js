const Category = require('../models/category.model');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json({categories});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findOne({_id: id});
    if (category) {
        res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const category = await Category.findOne({slug: slug});
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
};