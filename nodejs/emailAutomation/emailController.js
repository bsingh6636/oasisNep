const imap = require('imap-simple');
const { simpleParser } = require('mailparser');
const puppeteerService = require('./puppeteerService');

// IMAP configuration
const config = {
  imap: {
    user: 'your-email@gmail.com',
    password: 'your-password',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 3000,
  },
};

// Function to search for recent emails and automate message extraction
const fetchAndExtractMessage = async (req, res) => {
  try {
    const connection = await imap.connect(config);
    await connection.openBox('INBOX');

    const delay = 20 * 60 * 1000; // 20 minutes
    const since = new Date(Date.now() - delay).toISOString();

    const searchCriteria = [['SINCE', since]];
    const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'], markSeen: false };

    const emails = await connection.search(searchCriteria, fetchOptions);
    let messageResponse = '';

    for (let email of emails) {
      const parsed = await simpleParser(email.parts[1].body);
      const body = parsed.text;

      // Extract the URL from the email body
      const urlMatch = body.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        const emailUrl = urlMatch[0];
        console.log('Found URL:', emailUrl);

        // Automate browser actions using Puppeteer
        messageResponse = await puppeteerService.openEmailAndExtractMessage(emailUrl);
        break; // Stop after the first matching email
      }
    }

    connection.end();

    if (messageResponse) {
      return res.json({ success: true, message: messageResponse });
    } else {
      return res.status(404).json({ success: false, message: 'No recent emails found with a valid link' });
    }
  } catch (error) {
    console.error('Error fetching emails:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { fetchAndExtractMessage };
