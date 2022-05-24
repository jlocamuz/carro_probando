import { useEffect, useState } from "react";
import axios from "axios";


const Detail = ({ detail }) => {

    const [product, setProduct] = useState('');

    useEffect(()=>{
        axios.get('http://127.0.0.1:9000/products/'+detail.product+'/').then(resp => {
            setProduct(resp.data)
    }).catch(function (error) {
        console.log(error)
            });              
    }, []);

    return(
        <div className="blog-detail">
            <h2>cart detail id: {detail.id}</h2> 


               {
                product && 
                <div>
                    <h2>product: {product.product_name}</h2>
                    <p>${product.product_price} </p>                  
                </div>

                }
                {!product &&
                    <p>se elimino el producto de la base de datos</p>
                }
             <p>quantity: {detail.product_quantity}</p>
        </div>
    );
}
 
export default Detail;