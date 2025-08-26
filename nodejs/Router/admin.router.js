import express from 'express';
import { login, logOutUser, register, testFunction} from '../controller/Admin.controller.js';
import { Auth } from '../middleware/Auth.middleare.js';
import { AddNewUpdates, deleteVideoByName, viewAllUpdates, viewAllWhatsNewVideo, whatsNewVideo } from '../controller/whatsNew.controller.js';
import { CarouselController } from '../controller/Carousel.Controlller.js';

let router = express.Router();
router.post('/login',login);
router.post('/register',Auth ,register);
router.get('/auth', Auth);
router.get('/logout',logOutUser);
router.get('/check',Auth , testFunction);
router.post('/addWhatsNewVideo', whatsNewVideo);
router.post('/deleteWhatsNewVideo',  deleteVideoByName);
router.get('/viewWhatsNewVideo', viewAllWhatsNewVideo);
router.get('/update', viewAllUpdates);
router.post('/addNewUpdates',Auth ,AddNewUpdates);
router.get('/carousel', CarouselController.getAllCarousel);
router.post('/carousel', CarouselController.addCarousel);
router.delete('/carousel/:id', CarouselController.deleteCarousel);
router.get('/carousel/:id', CarouselController.getCarouselById); // Optional
export default router ;
