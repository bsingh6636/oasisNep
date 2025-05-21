import express from 'express';
import { CarouselController } from "../controller/Carousel.Controlller.js";

let router = express.Router();

router.get('/carousel', CarouselController.getAllCarousel);

export default router;