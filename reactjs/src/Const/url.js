const developmentmode = process.env.REACT_APP_DEVELOPED_MODE;
export const BackendPort = developmentmode === 'PRODUCTION' ? 'https://oasis-nep.vercel.app/api' : 'http://localhost:8080/api';


export const whatsappImageUrl = 'https://res.cloudinary.com/bsingh6636/image/upload/v1722901156/page/ott%20icons/WhatsApp_d7blgr.svg';
export const telegramImageUrl = 'https://res.cloudinary.com/bsingh6636/image/upload/v1722901883/page/ott%20icons/TelegramLogo_vtb0fz.svg';
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
