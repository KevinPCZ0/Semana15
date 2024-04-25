import { createClient } from "@/utils/supabase/client"


const getProductById = async(id) => {
    const supabase = createClient();

    const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', `${id}`)

    return data
}

 const updateProduct = async (id,updatedData) =>{
    const supabase = createClient()
    const { data, error } = await supabase
        .from('products')
        .update({
            name: updatedData.name,
            description: updatedData.description,
            precio: updatedData.precio,
            sku: updatedData.sku,
            tamanno: updatedData.tamanno,
        }) .eq('id', id)
    return { status: 200, product: data }
}


export { getProductById, updateProduct }