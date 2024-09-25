import React from "react";
import "../css/footer.css"
import { whatsappImageUrl } from "../Const/url";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Contact Us</h3>
        <a href="https://wa.me/+9779804805541" target="_blank" className="linkheaderftcnt" rel="noreferrer">
          <p>Phone: +977 980-4805541</p>
        </a>
         <a href="mailto:ottnepal4474@gmail.com" className="linkheaderftcnt">   <p>ottnepal4474@gmail.com</p></a>
     
      </div>


      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com/onlinepurchasenepal6636">
            <img
              src="https://i.pinimg.com/474x/f7/99/20/f79920f4cb34986684e29df42ec0cebe.jpg"
              alt="https://w7.pngwing.com/pngs/637/497/png-transparent-facebook-fb-social-media-logo-social-media-logo-socialmedia-3d-icon-thumbnail.png"
            />
          </a>
          <a href="https://t.me/bsingh4474">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png"
              alt="Telegram"
            />
          </a>
          <a href="https://wa.me/+9779804805541">
            <img src={whatsappImageUrl} alt="whatsapp-image"></img>
          </a>
        </div>
      </div>



      <div className="footer-section">
        <p>&copy; 2024 Oasis Nepal. All rights reserved.</p>
      </div>
    </footer>
  );
};
