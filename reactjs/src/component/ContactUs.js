import React from "react";

export const ContactUs = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png')" }}
    >
      <div className="bg-gray-900 bg-opacity-20 backdrop-blur-md rounded-lg shadow-2xl p-10 max-w-lg w-full">
        <h2 className="text-4xl font-bold text-center text-white mb-4">Get in Touch</h2>
        <p className="text-center text-white mb-6">We’d love to hear from you!</p>
        <div className="contact-details space-y-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 shadow-md transition transform hover:scale-105 flex items-center">
            <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp" className="w-6 h-6 mr-2" />
            <p className="text-lg text-white flex items-center">
              <strong className="mr-2">WhatsApp:</strong>{" "}
              <a
                className="text-teal-300 hover:text-teal-500 transition duration-300"
                href="https://wa.me/+9779804805541"
                target="_blank"
                rel="noreferrer"
              >
                +977 980-4805541
              </a>
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 shadow-md transition transform hover:scale-105 flex items-center">
            <img src="https://img.icons8.com/color/48/000000/gmail-new.png" alt="Email" className="w-6 h-6 mr-2" />
            <p className="text-lg text-white flex items-center">
              <strong className="mr-2">Email:</strong>{" "}
              <a
                className="text-teal-300 hover:text-teal-500 transition duration-300"
                href="mailto:ottnepal4474@gmail.com"
              >
                ottnepal4474@gmail.com
              </a>
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 shadow-md transition transform hover:scale-105 flex items-center">
            <img src="https://img.icons8.com/color/48/000000/telegram-app.png" alt="Telegram" className="w-6 h-6 mr-2" />
            <p className="text-lg text-white flex items-center">
              <strong className="mr-2">Telegram:</strong>{" "}
              <a
                className="text-teal-300 hover:text-teal-500 transition duration-300"
                href="https://t.me/bsingh4474"
              >
                bsingh4474
              </a>
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-center text-white mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com/onlinepurchasenepal6636" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/?size=100&id=kREWnrP8lFKg&format=png&color=000000" alt="Facebook" className="transition-transform hover:scale-125" />
            </a>
            <a href="https://whatsapp.com/channel/0029VaFZsmD2Jl89TAqCbl1j" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/?size=100&id=A1JUR9NRH7sC&format=png&color=000000" alt="WhatsApp" className="transition-transform hover:scale-125" />
            </a>
            <a href="https://t.me/purchase6636" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/?size=100&id=5mIvDYZUWDCF&format=png&color=000000" alt="Telegram" className="transition-transform hover:scale-125" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
