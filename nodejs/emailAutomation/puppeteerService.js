const puppeteer = require('puppeteer');

// Function to automate email link click and extract message from webpage
const openEmailAndExtractMessage = async (emailUrl) => {
  try {
    const browser = await puppeteer.launch({ headless: true }); // Use headless: false if you want to see the browser actions
    const page = await browser.newPage();

    await page.goto(emailUrl, { waitUntil: 'networkidle2' });

    // Wait for the element containing the message
    await page.waitForSelector('.message-class');  // Adjust selector as needed for your website
    const message = await page.$eval('.message-class', el => el.textContent);

    console.log('Extracted message:', message);

    await browser.close();
    return message;
  } catch (error) {
    console.error('Error with Puppeteer:', error);
    throw new Error('Failed to extract message from the webpage');
  }
};

module.exports = { openEmailAndExtractMessage };
