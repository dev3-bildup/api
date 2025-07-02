import { useEffect, useState } from "react";
import { createItem, deleteItem, fetchItems } from "./api";
import { Link } from "react-router-dom";

const Home = () => {
    const[allItems, setAllItems] = useState([]);
    const [itemname, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [loading,setLoading] = useState(false);
    const [postLoading,setPostLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputError, setInputError] = useState('');
     const [deleteLoading,setDeleteLoading] = useState(false);

  const storedItems = localStorage.getItem("items");
    useEffect(()=>{
      const getData = async () => { 
        // Check if items are already in localStorage
        if(storedItems) {
          setAllItems(JSON.parse(storedItems)) 
          return;
        }
       
        // If not, fetch from API
        console.log('fetching items from API');
        setLoading(true); 
        console.log('running 2');
        const res = await fetchItems();  
        if (res.data){
            // setAllItems(res.data);
            localStorage.setItem("items",JSON.stringify(res.data));
            setLoading(false);
            const items= JSON.parse(localStorage.getItem("items"));
            setAllItems(items);
        }
        else{
           console.log('running 3');
            // console.log(res,'res homepage ');
            setError(res.error);
            setLoading(false);
        }
       
        
  };
       getData();
    },[])

   
    const itemObject = {
  name: itemname,
  data: {
    year: 2019,
    price: itemPrice,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB",
  },
};
 const handleCreate = async ()=>{
    if(!itemname || !itemPrice){
    setInputError('Please fill in all fields');
    return;
}
// console.log(storedItems, 'stored items from homepage');
//    assign the response returned to postdata varible and then set the state of allItems to include the new item 
    setPostLoading(true);
    setInputError('');
    const postdata = await createItem(itemObject);
    if(postdata.data){
      const currentItems = JSON.parse(localStorage.getItem("items")) || [];
      console.log(currentItems, 'current items from homepage');

      const updatedItem = [...currentItems, postdata.data];
      console.log(updatedItem, 'updated items from homepage');
      
      localStorage.setItem("items", JSON.stringify(updatedItem))
      setAllItems(updatedItem)
        // setAllItems((prevItems) => [...prevItems, postdata.data]);
        setItemName('');
        setItemPrice('');
        setPostLoading(false);
        alert('Item created successfully');
        // console.log(postdata.data, 'post data from homepage');
    }
   else{
    setError(postdata.error);
    setItemName('');
    setItemPrice('');
    // change later to posterror 
    setPostLoading(false);
   }
   
    

 }
  const handleUpdate = async (id)=>{
    // setPostLoading(true); change later 
    const postdata = await createItem(itemObject);
    if(postdata.data){
        // setAllItems((prevItems) => [...prevItems, postdata.data]);
        setItemName('');
        setItemPrice('');
        setPostLoading(false);
        alert('Item created successfully');
        console.log(postdata.data, 'post data from homepage');
    }
   else{
    setError(postdata.error);
    setItemName('');
    setItemPrice('');
    // change later to posterror 
    setPostLoading(false);
   }
   
 }
 

  const handleDelete = async (id) =>{
    setDeleteLoading(true);
  const res = await deleteItem(id)  
  if (res?.data?.message){
    const updatedItems = allItems.filter(item => item.id !== id);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setAllItems(updatedItems);
    setDeleteLoading(false);
    alert('Item deleted successfully');
 }
 else{
  setDeleteLoading(false);
    setError(res.error);
    // alert(res.error)
   
}
}
// console.log(allItems, 'all items from homepage before delete ');


//  ff8081819782e69e0197caedd84c4a23
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-8 px-20 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-[#005AAC] mb-10">
        Simple CRUD UI
      </h1>
      <div className="flex items-start w-full gap-20">
          <div className="bg-white w-full max-w-lg shadow-md h-[400px] rounded-lg p-6  mx-auto mb-8">
            
            <h2 className="text-lg font-semibold mb-4 text-[#005AAC]">Create Item</h2>
            <input value={itemname} onChange={(e)=>setItemName(e.target.value)}
              type="text" required
              placeholder="Enter item name"
              className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none "
            />
            <input required value={itemPrice}
              type="text" 
              onChange={(e)=>setItemPrice(e.target.value)}
              placeholder="Enter item price"
              className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none "
            />
          {
            inputError &&  <p className="text-red-500 text-sm mb-4">{inputError}</p>
          }
            <button disabled={postLoading} onClick={handleCreate} className={`bg-[#0071E3] flex flex-col items-center justify-center hover:bg-blue-700 text-white py-2 px-4 rounded w-full`}>
              {
                postLoading?<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :  "Create"
              }
            </button>
            
          </div>
           <div className="bg-white shadow-md w-full rounded-lg p-6 mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-[#005AAC]">Items</h2>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && allItems.length === 0 && <p className="text-red-500 text-center">{error}</p>}
        <ul className="space-y-4 max-h-[600px] overflow-y-auto">
          {allItems.map((item,idx) => (
            <li
              key={idx} className="cursor-pointer  flex justify-between items-center bg-gray-100 px-4 py-2 rounded" >
            <div className="flex flex-col gap-1">
                  <span className="text-gray-700">{ item?.id && item?.id.slice(0,2)}</span>
              <p className="font-medium">{item?.name}</p>
              <p className="font-medium">{item?.data?.color}</p>
              <p>{item?.data?.capacity || item?.data?.Capacity}</p>
              <p className="font-medium">
                {
                  item?.data?.price && (
                    Number(item?.data?.price).toLocaleString('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                      minimumFractionDigits: 0,
                    })
                  )
                }
                 
              </p>
                <p className="font-medium">{item?.data?.year}</p>
            </div>
              <div className="space-x-2">
                  <Link  to={`/singleproduct/${item?.id}`} className=" bg-blue-500 text-white px-4 pt-1 pb-2 rounded hover:bg-blue-600">
                       view 
                </Link>
                <button className="text-blue-600 hover:underline text-sm">
                  Edit
                </button>
                <button onClick={()=>handleDelete(item.id)} className="text-red-500 hover:underline text-sm">
                 { deleteLoading? 'deleting....':" Delete"}
                </button>
               
              </div>
              
            </li>
          ))}
        </ul>
      </div>
      </div>
    

     
    </div>
  );
};

export default Home;
