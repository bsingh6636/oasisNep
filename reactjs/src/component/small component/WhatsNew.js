import React, { useEffect, useState } from 'react'
import { whatsNew as whatsNewFixedData } from '../../Const/whatsNew'
import { BackendPort } from '../../Const/url'
import { Link } from 'react-router-dom'
const WhatsNew = () => {
const [whatsNew , setwhatsNew] = useState(whatsNewFixedData)
useEffect(()=>{
  const fetchAllVideos = async () => {
    try {
        const response = await fetch(`${BackendPort}/admin/viewWhatsNewVideo`);
        const data = await response.json();
        if (data.success) {
          setwhatsNew(data.items);
        } else {
            console.log(data.message || 'Failed to fetch videos');
        }
    } catch (err) {
      console.log( 'Failed to fetch videos');
    }
};
fetchAllVideos()
},[])
  return (
    <div className="m-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        New to Watch
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {whatsNew.slice(0, 4).map((item, index) => {
          return (
            <div key={index} className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <iframe
                width="100%"
                height="200"
                src={item.TrailerLink.replace('youtube.com','youtube-nocookie.com')}
                // src={item.TrailerLink.replace("youtube.com", "youtube-nocookie.com")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
              <Link to={`/prices/${item.Platform}`}>
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {item.Name}
              </div>
              <div className="text-center mt-2">
                <span className="inline-block px-3 py-1  text-sm font-medium bg-gray-300 rounded-lg text-black">
                  {item.Platform}
                </span>
              </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>


  );
}

export default WhatsNew

