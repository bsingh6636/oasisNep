import React, { useState, useEffect } from "react";

const FAQ = ({ choosedMonth, details }) => {
  const [questionsFAQ, setQuestionsFAQ] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsFAQShared = [
    { question: "Will it be my private account?", answer: "No, it’s a Shared Account. You'll get a private profile." },
    { question: "Will my Profile be PIN Protected?", answer: "Yes" },
    { question: "Can I share my account with my friends?", answer: "No. Use it for personal purposes only." },
    { question: "Can I use this Account on my Smart TV?", answer: "No" },
    { question: "How can I renew this Account after expiry?", answer: "You just need to contact us." },
  ];

  const questionsFAQPrivate = [
    { question: "Will it be my private account?", answer: "Yes, it'll be a private account." },
    { question: "Can I share my account with my friends?", answer: "It's up to you." },
    { question: "Can I use this Account on my Smart TV?", answer: "Yes" },
    { question: "How can I renew this Account after expiry?", answer: "You just need to contact us." },
    { question: "Can I change user settings?", answer: "Contact me for more info." },
  ];

  useEffect(() => {
    if (details.status?.toLowerCase() === "shared") {
      setQuestionsFAQ(questionsFAQShared);
    } else if (details.status?.toLowerCase() === "private") {
      setQuestionsFAQ(questionsFAQPrivate);
    }
     
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const month = parseInt(choosedMonth, 10);
  if (!month) return null;

  return !questionsFAQ ? null : (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-700">Frequently Asked Questions</h1>
      {questionsFAQ.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-300 py-3 sm:py-4 cursor-pointer"
          onClick={() => toggleFAQ(index)}
          role="button"
          aria-expanded={activeIndex === index}
          aria-controls={`faq-answer-${index}`}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {item.question}
          </h2>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <p className="mt-2 text-gray-700">{item.answer}</p>
          </div>
        </div>
      ))}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Validity Information</h2>
        <p className="text-gray-800">
          Customers may not join on the same day, so the validity may differ between
          {month === 6 || month === 12 ? (
            <span className="font-semibold text-blue-600"> 5-10 days</span>
          ) : (
            <span className="font-semibold text-blue-600"> {27 * month}-{33 * month} days</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default FAQ;
