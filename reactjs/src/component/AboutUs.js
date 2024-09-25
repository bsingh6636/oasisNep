import React from 'react';

export const AboutUs = () => {
  return (
    <section className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Welcome to Our Platform
        </h1>
        <p className="mb-6 text-black">
          At our platform, we proudly offer subscription services for various platforms at unbeatable rates. Elevate your digital experience with us as we provide not only cost-effective subscriptions but also a range of enticing digital products and convenient gift cards.
        </p>
        <p className="mb-6 text-black">
          With over five years of dedicated service, we have established ourselves as a reliable and trustworthy destination for all your digital needs. Our commitment to customer satisfaction is unwavering, ensuring you a hassle-free experience with every purchase.
        </p>
        <p className="mb-6 text-black">
          Despite our small but dedicated team, we prioritize your needs. While we aim to respond promptly, there might be occasional delays due to our limited staff. Your patience is appreciated, and rest assured, your inquiry will be attended to with the utmost care.
        </p>
        <p className="mb-8 text-black">
          Explore our platform, embrace affordability, and indulge in a seamless digital shopping experience. Join the community that has trusted us for over five years, and let us enhance your digital lifestyle today!
        </p>
        <ul className="list-disc pl-8 space-y-4">
          <li className="text-lg">
            <strong className="font-semibold">Unbeatable Rates:</strong> We provide subscription services for various platforms at unbeatable rates.
          </li>
          <li className="text-lg">
            <strong className="font-semibold">Trustworthy:</strong> With over five years of dedicated service, we've established ourselves as a reliable destination for all your digital needs.
          </li>
          <li className="text-lg">
            <strong className="font-semibold">Customer Satisfaction:</strong> Our commitment to customer satisfaction is unwavering, ensuring a hassle-free experience with every purchase.
          </li>
          <li className="text-lg">
            <strong className="font-semibold">Community Trust:</strong> With over 7,000 satisfied customers and a 4.8-star rating on Facebook, our community trusts us for their digital needs.
          </li>
          <li className="text-lg">
            <strong className="font-semibold">Global Reach:</strong> We offer OTT services not only in Nepal but also in other countries, providing affordable rates to enhance your digital lifestyle.
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutUs;
