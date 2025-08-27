import { Carousel } from '../models/Carousel.Schema.js';

// Get all carousel items
const getAllCarousel = async (req, res) => {
  try {
    const carouselData = await Carousel.find();
    res.status(200).json(carouselData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carousel data', error });
  }
};

// Add a new carousel item
const addCarousel = async (req, res) => {
  try {
    const newCarousel = new Carousel(req.body);
    const saved = await newCarousel.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error adding carousel item', error });
  }
};

// Delete a carousel item by ID
const deleteCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    await Carousel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Carousel item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting carousel item', error });
  }
};

// (Optional) Get a carousel item by ID
const getCarouselById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Carousel.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carousel item', error });
  }
};

// Export as object
export const CarouselController = {
  getAllCarousel,
  addCarousel,
  deleteCarousel,
  getCarouselById
};
