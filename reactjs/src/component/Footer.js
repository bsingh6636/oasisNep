import React from "react";
import "../css/footer.css"; // If you have any additional custom styles
import { whatsappImageUrl } from "../Const/url";

export const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-6 bg-slate-900 bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg text-white">
      <div className="footer-section">
        <h3 className="text-lg font-semibold">Contact Us</h3>
        <a href="https://wa.me/+9779804805541" target="_blank" className="block mt-2 hover:underline" rel="noreferrer">
          <p>Phone: +977 980-4805541</p>
        </a>
        <a href="mailto:ottnepal4474@gmail.com" className="block mt-2 hover:underline">
          <p>ottnepal4474@gmail.com</p>
        </a>
      </div>

      <div className="footer-section">
        <h3 className="text-lg font-semibold">Follow Us</h3>
        <div className="flex space-x-4 mt-2">
          <a href="https://www.facebook.com/onlinepurchasenepal6636">
            <img
              className="w-8 h-8 transition-transform transform hover:scale-110"
              src="https://i.pinimg.com/474x/f7/99/20/f79920f4cb34986684e29df42ec0cebe.jpg"
              alt="Facebook"
            />
          </a>
          <a href="https://t.me/bsingh4474">
            <img
              className="w-8 h-8 transition-transform transform hover:scale-110"
              src="https://img.icons8.com/?size=100&id=5mIvDYZUWDCF&format=png&color=000000"
              alt="Telegram"
            />
          </a>
          <a href="https://wa.me/+9779804805541">
            <img
              className="w-8 h-8 transition-transform transform hover:scale-110"
              src={whatsappImageUrl}
              alt="WhatsApp"
            />
          </a>
        </div>
      </div>

      <div className="footer-section">
        <p className="text-sm mt-2">&copy; 2024 Oasis Nepal. All rights reserved.</p>
      </div>
    </footer>
  );
};
