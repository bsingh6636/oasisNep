import  twilio  from 'twilio';
import { TWILIO_SID, TWILIO_TOKEN } from '../import.js';
export const twilioWhatsApp =  ( userIpDetails , next  ) =>{
  let data = JSON.stringify(userIpDetails);
  const client = twilio(TWILIO_SID, TWILIO_TOKEN);
  client.messages
    .create({
      body: data,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+9779804805541'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error('Error sending message:', error));
  next;
};
