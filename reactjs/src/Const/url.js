
// export const BackendPort = developmentmode === 'DEVELOPMENT' 
//   ? 'http://localhost:8080/api' 
//   : 'https://oasis-nep.vercel.app/api';

//  export const BackendPort =  process.env.REACT_APP_NODE_ENV == 'development' ? 'http://localhost:8080/api' : 'https://www.subsnepal.com/api' ;
 // Change REACT_APP_NODE_ENV to NODE_ENV
export const BackendPort = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/api'
  : 'https://www.subsnepal.com/api';

  console.log(process.env.NODE_ENV)

export const whatsappImageUrl = 'https://res.cloudinary.com/bsingh6636/image/upload/v1722901156/page/ott%20icons/WhatsApp_d7blgr.svg'
export const telegramImageUrl = 'https://res.cloudinary.com/bsingh6636/image/upload/v1722901883/page/ott%20icons/TelegramLogo_vtb0fz.svg'
