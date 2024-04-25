'use client'

import React, { useState} from "react";
import { sendData } from '../../actions/products'

const  createProduct = () => {
    const [errors, setErrors ] = useState({})
    const [isValid, setIsValid ] = useState(true)
    const [productData, setProductData ] = useState({
        name: '',
        description:'',
        precio: 0,
        sku: 0,
        tamanno:''
    })

    const validateData = (form) =>{
        form.preventDefault()
        let errorList = {}

        if (!productData.name) {
            errorList.name = "Se requiere un nombre";
        }
        
        if (!productData.description) {
            errorList.description = "Se requiere una descripción";
        }
        
        if (!productData.precio) {
            errorList.precio = "Se requiere un precio";
        }
        
        if (!productData.sku) {
            errorList.sku = "Se requiere una cantidad";
        }
        
        if (!productData.tamanno) {
            errorList.tamanno = "Se requiere un Tamaño";
        }

        
        if (Object.keys(errorList).length > 0 ) {
            setErrors(errorList);
            return;
        }
        sendProductData()
}


const checkValue = (value) => {
    return (value.trim() != '' || /^[a-z0-9]+$/i.test(value));
}


const sendProductData = async () => {
    try {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('precio', productData.precio);
        formData.append('sku', productData.sku);
        formData.append('tamanno', productData.tamanno);
        const response = await sendData(formData);
        if (response.status) {
            alert("El articulo se agrego exitosamente");
        }else{
            console.error('Error al procesar los datos', response.massage);
            setErrors(response.errors || {});
        }

    } catch (error) {
        console.error('Error al enviar los datos del articulo:', error.message);
    }
};

const setValueToState = (event) => {
    const { name, value } = event.target;
    let valueToCheck = checkValue(value); 
    if (valueToCheck) {
        setIsValid(true);
    setProductData(data => ({
        ...data,
        [name]: value,
    }));
    } else{
        setIsValid(false);
    }
}
    return(
    <>
        <div className="flex justify-center content-center items-center flex-col min-h-screen ">
            <h2 className='pt-5 pb-4 text-xl'> Agrega un Articulo Nuevo</h2>
            <form 
                onSubmit={validateData} 
                className="bg-slate-300 rounded-lg text-black p-8 flex content-center justify-center  " >
                <div  className='flex flex-col gap-2 p-1  '>
                    <label htmlFor="name" > Nombre</label>
                    <input 
                    type="text" 
                    value={productData.name} 
                    onChange={setValueToState}  
                    name='name'  
                    className={`rounded-md p-2 border text-black `} />
                    <p className='text-rose-600'>{errors.name}</p>

                    <label htmlFor=""> Descripcion </label>
                    <input  
                    type="text" 
                    value={productData.description} 
                    onChange={setValueToState} 
                    name='description'  
                    className='rounded-md p-2 border text-black' />
                    <p className='text-rose-600'>{errors.description}</p>

                    <label htmlFor="">  Precio </label>
                    <input 
                    type="text" 
                    onChange={setValueToState}  
                    name='precio' placeholder='$00.0' 
                    className='rounded-md p-2 border text-black' />
                    <p className='text-rose-600'>{errors.precio}</p>

                    <label htmlFor=""> Cantidad de Stock </label>
                    <input 
                    type="text"
                    onChange={setValueToState}  
                    name='sku'  
                    className='rounded-md p-2 border text-black' />
                    <p className='text-rose-600'>{errors.sku}</p>

                    <label htmlFor=""> Tamaño </label>
                    <input 
                    type="text"
                    value={productData.tamanno} 
                    onChange={setValueToState}  
                    name='tamanno'  
                    className='rounded-md p-2 border text-black' />
                    <p className='text-rose-600'>{errors.tamanno}</p>
                    
                    <button type="submit" className='p-2 bg-slate-500 text-white rounded-lg hover:bg-bl-800'>Añadir producto</button>
                </div>


            </form>
        </div>
    </>
    );
    
}

export default createProduct;