'use client'
import { createClient } from '@/utils/supabase/client';
import React from 'react'
import { useEffect, useState } from 'react'
import ImageGalleryPage from './id/[id]/page'
import Carousel from '../../components/Carousel';

export default function page() {

    const [product, setProduct] = useState([]);
    const [ search, setSearch ] = useState('');
    const supabase = createClient();   

    
    useEffect(() =>{

        const getData = async () => {
            const { data } = await supabase.from('products').select()
            setProduct(data)
        }
        getData()
    }, [] )
   
    function handleSubmit(e){
      e.preventDefault();
      const getData = async () =>{
        const { data } = await supabase
        .from('products')
        .select('*')
        .ilike('name',  `%${search}%`);
        setProduct(data)
      }
      getData();
    }
   

  return (
      <>
      <meta name="description" content="Sebastian Amigon Pedraza app"></meta>
        <div className='w-full'> 
          <ImageGalleryPage> </ImageGalleryPage>
        </div>

        <div className='w-screen'>
        <Carousel></Carousel>
        </div>
        <form className='text-center mt-3 py-4'  onSubmit={handleSubmit}>
        <input type="text"  className='border rounded px-2 text-black' placeholder='Filtro por palabra...' defaultValue={search} onChange={(e) =>{
              setSearch(e.target.value);
            }}/>
            <button type='submit' className='rounded-md bg-orange-400 px-3 ml-3'> Filtrar </button>
        </form>
            

        <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-flow-col-4 gap-4 pt-8'>
          {
             product.map((prd, id) =>(
                <div key={id} className='max-w-sm rounded overflow-hidden shadow-lg' >
                  <div className='px-6 py-4 bg-orange-500'>                    
                      <div className='font-bold text-xl mb-2'>{prd.name} </div>
                      <p className='text-white-400 text-base'> { prd.precio } </p>
                      <p className='text-white-400 text-base'> { prd.description } </p>
                      <p className='text-white-400 text-base'> { prd.sku } </p>
                      <p className='text-white-400 text-base'> { prd.tamanno } </p>                   
                  </div>
                </div>
             ))
          }
         
        </div>
      </>
  )
  
}
