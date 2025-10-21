import React, { useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className }) => {
    const imgRef = useRef();

    useEffect(() => {
        const img = imgRef.current;

        const onLoad = () => {
            img.classList.add('loaded');
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.src = src; // Load the actual image source
                    img.onload = onLoad;
                    observer.unobserve(img);
                }
            });
        });

        if (img) observer.observe(img);

        return () => observer.disconnect();
    }, [src]);

    return <img loading="lazy" ref={imgRef} alt={alt} className={className} data-src={src} />;
};

export default LazyImage;
