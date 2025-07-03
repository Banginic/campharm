import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";

// (method, endpoint, body=null, id=null )

interface Props{
    method:string,
    endpoint:string,
    body: null | string,
    id: string 
}

const myFetch = async <T>(props: Props, ): Promise< T > => {

    
    const { method, endpoint, body = "", id = ""} = props
 // const baseUrl = 'http://localhost:8080'
  const baseUrl = ''
  try {

    // create an item
    if (method === "post" && body) {
        
      const { data } = await axios.post<T>(
        baseUrl + endpoint , body, { headers: { authorization: `Bearer ${localStorage.getItem("token")}`} });
      return data;
    }
    // Get single item
   else if (method === "get" && id.length > 1 ) {
      const { data } = await axios.get<T>(
        endpoint,  { headers: { authorization: `Bearer ${localStorage.getItem("token")}`} });
      return data;
    }

    // Delete single item
   else if (method === "delete" && id ) {
      const { data } = await axios.delete<T>(
        baseUrl + endpoint + `/${id}` ,  { headers: { authorization: `Bearer ${localStorage.getItem("token")}`} });
      return data;
    }

    // Get all items
  
      const { data } = await axios.get<T>(
        endpoint,  { headers: { authorization: `Bearer ${localStorage.getItem("token")}`} });
        
      return data ;
    

    
  } catch (ex: unknown) {
    if(ex instanceof Error){
    // toast.warning(ex.message)
    console.log(ex);
    
       throw ex; // rethrow non-Axios errors
       
    }
    if( ex instanceof AxiosError){
        // toast.error(ex.response?.data.message)
        throw new Error(ex.response?.data?.message || 'Unknown Axios error');
        console.log(ex);
        
    }
    throw ex
}
}

export default myFetch;
 