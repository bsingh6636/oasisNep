import React from "react";
import "../css/Contact.css";
export const ContactUs = () =>{
    return(
        <div className="contact-card">
        <h2>Contact Information</h2>
        <p>Feel free to reach out:</p>
        <div className="contact-details ">
            <p><strong>WhatsApp:</strong> <a className="text-blue-700" href="https://wa.me/+9779804805541" target="_blank" rel="noreferrer">+977 980-4805541</a></p>
            <p><strong>Email:</strong> <a className="text-blue-700" href="mailto:ottnepal4474@gmail.com">ottnepal4474@gmail.com</a></p>
            <p><strong>Telegram:</strong><a className="text-blue-700" href="https://t.me/bsingh4474">bsingh4474</a></p>
        </div>
    </div>
    )
}