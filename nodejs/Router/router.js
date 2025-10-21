import express from 'express';
import { CarouselController } from '../controller/Carousel.Controlller.js';
import { getwhatToWatchFromTMDB } from '../controller/Services/tmdb.js';

const router = express.Router();

router.get('/carousel', CarouselController.getAllCarousel);
router.get('/whatToWatch', async (req, res) => {
  try {
    const data = await getwhatToWatchFromTMDB();

    res.set('Cache-Control', 'public, max-age=86400, immutable');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carousel data', error });
  }
});

export default router;
