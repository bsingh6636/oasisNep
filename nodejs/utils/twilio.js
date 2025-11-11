import twilio from 'twilio';
import { TWILIO_SID, TWILIO_TOKEN, TWILIO_PHONE_NUMBER } from '../import.js';

export const twilioWhatsApp = (userIpDetails, next) => {
  const data = JSON.stringify(userIpDetails);
  const client = twilio(TWILIO_SID, TWILIO_TOKEN);
  client.messages
    .create({
      body: data,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+9779804805541',
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error('Error sending message:', error));
  next;
};

export const getLatestMessage = async () => {
  try {
    const client = twilio(TWILIO_SID, TWILIO_TOKEN);
    const messages = await client.messages.list({
      to: TWILIO_PHONE_NUMBER,
      limit: 10,
    });

    console.log(messages);
    if (messages.length > 0) {
      return messages[0].body;
    }
    return 'No messages found.';
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};
