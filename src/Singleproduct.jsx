import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const Singleproduct = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {id} = useParams()

    const getProductById = async ()=>{
        setLoading(true);
        try{
            const res = await fetch(`https://api.restful-api.dev/objects/${id}`);
            if(res.status === 200){
                const data = await res.json()
                console.log(data, 'data from single product');
                setProduct(data);
                setLoading(false); 
            }else{
                setError('Failed to fetch product');
                setLoading(false);
            }
        }catch(err){
            console.log('Error fetching product:', err);
            setError('An error occurred while fetching the product');
            setLoading(false);
    }
    console.log(id,'product id ');
    
}

 useEffect(()=>{
        getProductById();           
    },[id])
  return (
    <div>
         <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-6">
                <Link to="/">Back</Link>
        </button>
        <h1 className="text-2xl font-bold text-center mt-8">Single Product Page</h1>
        <div className="flex flex-col items-center justify-center mt-[100px]">
        {loading &&  <div className="loader"></div> }

        </div>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {
            !loading && !error&&
            (
                 <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
                <h2 className="text-xl font-semibold mb-4">{product?.name}</h2>
                <p className="text-gray-700 mb-4">{product?.capacity || product?.Capacity}</p>
                <p className="text-lg font-bold text-green-600">{product?.price}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
                </button>
            </div>
            )
        }
       
    </div>
  )
}

export default Singleproduct