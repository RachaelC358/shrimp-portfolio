import React from 'react';

interface ImageGalleryProps {
  title: string;
  images: { src: string; caption: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ title, images }) => {
  return (
    <div className="image-gallery">
      <h2>{title}</h2>
      <p>App displays beautifully on both mobile and desktop screen sizes.</p>
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.src} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
