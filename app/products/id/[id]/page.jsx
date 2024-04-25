"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGalleryPage = () => {
  const [images, setImages] = useState([]);
  const supabase = createClient()
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          throw error;
        }
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    fetchImages();
  }, [supabase]);
  const allImages = images.reduce((acc, item) => acc.concat(item.gallery), []);

  return (
    <div alt="Imagen" style={{width:"400px", margin: "400px"}} >
      <ImageGallery 
      showFullscreenButton={false}
      showPlayButton={false}
      autoPlay={true}
      items={allImages} 
      />
    </div>
  );
};


export default ImageGalleryPage;