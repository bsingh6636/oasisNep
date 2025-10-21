
// export const BackendPort = developmentmode === 'DEVELOPMENT' 
//   ? 'http://localhost:8080/api' 
//   : 'https://oasis-nep.vercel.app/api';

 export const BackendPort =  process.env == 'development' ? 'http://localhost:8080/api' : 'https://www.subsnepal.com/api' ;


export const whatsappImageUrl = 'https://res.cloudinary.com/bsingh6636/image/upload/v1722901156/page/ott%20icons/WhatsApp_d7blgr.svg'
export const telegramImageUrl = 'https://res.cloudinary.com/bsingh6636/image/upload/v1722901883/page/ott%20icons/TelegramLogo_vtb0fz.svg'
