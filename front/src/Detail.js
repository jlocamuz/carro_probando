import { useEffect, useState } from "react";
import axios from "axios";


const Detail = ({ detail }) => {

    const [product, setProduct] = useState('');

    useEffect(()=>{
        axios.get('http://127.0.0.1:9000/products/'+detail.product+'/').then(resp => {
            setProduct(resp.data)
    })}, []);

    return(
        <div>
            {
                product && 

            <div className="blog-detail" >
               <h2>cart detail id: {detail.id}</h2> 
               <h2>product: {product.product_name}</h2>
               <p>quantity: {detail.product_quantity}</p>
               <p>${product.product_price} </p>
            </div>
            }
            
        </div>
    );
}
 
export default Detail;