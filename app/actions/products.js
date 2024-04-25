"use server"

import { createClient } from '@/utils/supabase/client'
const supabase = createClient();

const sendData = async (formData) => {
    const { name, description, precio, sku, tamanno } = Object.fromEntries(formData.entries());

    if (name === null  || description === null || precio === null  || sku === null || tamanno === null ) {
        return {
            status: false,
            message:"Los Datos son obligatorios",
            errors: null,
            params: { name, description, precio, sku, tamanno}
        };
    }

    try {
        await supabase.from("products").insert({ name, description, precio, sku, tamanno}).select()

        return {
            status: true,
            message: "Los Datos se Guardaron correctamente",
            errors: null,
            params: { name, description, precio, sku, tamanno}
        };
    } catch (error) {
        return {
            status: false,
            message:"Ups.. Hubo un problema con los datos",
            errors: null,
            params: { name, description, precio, sku, tamanno}
        };
    }
};




export { sendData }