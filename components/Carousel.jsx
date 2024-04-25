'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const supabase = createClient();

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

  const renderCards = () => {
    // Crear un arreglo con todas las imágenes de la galería de todos los productos
    const allImages = images.reduce((acc, item) => acc.concat(item.gallery), []);
  
    return images.map((product, index) => (
      <div key={index} className="card p-4 bg-teal-500">
        {product.gallery.length > 0 && (
        <img src={product.gallery} alt={product.gallery[0].alt} className="rounded-lg mb-4" />

        )}
  
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-800">Precio: ${product.precio}</p>
          <p className="text-sm text-gray-800">SKU: {product.sku}</p>
        </div>
      </div>
    ));
  };
  
  

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '50px',
  };

  return (
    <div className="image-gallery px-8">
    
          <Slider {...settings}>
            {renderCards()}
          </Slider> 
    
    </div>
  );
};

export default ImageGallery;