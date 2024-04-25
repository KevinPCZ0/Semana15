"use client"
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react'
import { getProductById, updateProduct } from '@/app/actions/edit'
import router from 'next/router';
import ImageGalleryPage from '../../id/[id]/page'

 const editar = ( {params}:any ) => {

    const [ products, setProducts ] = useState<any>([]);
    const [ productId, setProductId ] = useState(params.id);
    const supabase = createClient();
    const [ productData, setProductData ] = useState({
        name: '',
        description:'',
        precio: 0,
        sku: 0,
        tamanno:''
    })

    const updateElementInDb = async () => {
        try {
          const { data: {session}} = await supabase.auth.getSession();
          console.log(session)
            if (!session) {
               router.push('/login');
            }
          const response = await updateProduct(params.id, productData);
         alert("El producto se actualizado correctamente:");
          setProductData({
              name: "",
              description: "",
              precio: 0,
              sku: 0,
              tamanno: ""
          });
          
        } catch (error) {
          
          console.error("Error al actualizar el producto:", Response);
        }
      };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name , value } = e.target;
        setProductData((prevData) => ({...prevData, [name]: value }));
     };

     useEffect(() => {
        const getData = async () => {
          setProductId(params.id)
          const dataResult = await getProductById(params.id);
          setProducts(dataResult || []);
    
          if (dataResult && dataResult.length > 0) {
            const { name, description, precio,  sku, tamanno } = dataResult[0];
            setProductData({ name, description, precio, sku, tamanno });
          }
        };
        getData();
      }, [params.id]);



  return (
    <div className="flex justify-center content-center items-center flex-col min-h-screen ">
        {products.map((item:any, index:any) => (
          <div
            className="bg-slate-300 rounded-lg text-black p-8 flex content-center justify-center  "
            key={index}
          >
            <form
              className="flex flex-col gap-2 p-1  "
              onSubmit={(e) => {
                e.preventDefault();
                updateElementInDb();
              }}
            >
              
              <h1 className='text-lg content-center font-bold'>Actualizar Producto</h1>

              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                  className={`rounded-md p-2 border text-black `}
              />
              <label htmlFor="description"> Descripcion</label>
                <input 
                type="text" 
                name="description" 
                value={productData.description} 
                onChange={handleInputChange}
                placeholder='$'
                  className={`rounded-md p-2 border text-black `}
                />
             
              <label htmlFor="precio">Precio</label>
                <input
                  type="text"
                  name="precio"
                  value={productData.precio}
                  onChange={handleInputChange}
                    className={`rounded-md p-2 border text-black `}
                />
              <label htmlFor="sku">Cantidad de Stock</label>
                <input
                  type="text"
                  name="sku"
                  value={productData.sku}
                  onChange={handleInputChange}
                   className={`rounded-md p-2 border text-black `}
                />
                <label htmlFor="tamanno">Tamaño</label>
                <input
                  type="text"
                  name="tamanno"
                  value={productData.tamanno}
                  onChange={handleInputChange}
                   className={`rounded-md p-2 border text-black `}
                />
              <button
                type="submit"
                className="bg-blue-600 p-2 rounded-md hover:bg-blue-800 hover:text-white transition"
              >
                Actualizar
              </button>
             
            </form>
             
          </div>
        ))}
      </div>
  )

}

export default editar;