export const fetchItems = async ()=>{
    try{
        const response = await fetch('https://api.restful-api.dev/objects')
        // console.log(response);
        if(response.status == 200){
            const data = await response.json();
             console.log(data);
            return {data};
        }else{
            return {error: 'Failed to fetch items'};
        }
       
    }
    catch(error){
        console.log('Error fetching items:', error);
    }
}

export const createItem = async (itemObject)=>{
    try {
        const response = await fetch(`https://api.restful-api.dev/objects`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemObject),
           
            
        })  
        if(response.status === 200 ){
            const data = await response.json();
            console.log(data, 'data from post item');
            return {data};
        }else{
            return { error: 'Failed to create item' }
        }
    }catch(error){
        console.log('Error creating item:', error);
       
    }
}
export const updateItem = async (itemObject,id)=>{
    try {
        const response = await fetch(`https://api.restful-api.dev/objects/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemObject), 
        })  
        if(response.status === 200 ){
            const data = await response.json();
            console.log(data, 'data from update item');
            return {data};
        }else{
            return { error: 'Failed to update item' }
        }
    }catch(error){
        console.log('Error creating item:', error);
       
    }
}

export const deleteItem = async (id)=>{
    try{
        const res = await fetch(`https://api.restful-api.dev/objects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(res,'response from delete item');
        console.log(id,'id from delete item');
        
        if (res.status === 200){
            const data = await res.json();
            // setItems(prevItems => prevItems.filter(item => item.id !== idToDelete));
            console.log(data, 'data from delete item');
            return {data}
          
        }else{
            return { error: 'Failed to delete item' }
        }
    }catch(error){
        return { error: 'An error occurred while deleting the item'}
    }
}