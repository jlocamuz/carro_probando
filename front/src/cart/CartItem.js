import { useEffect, useState } from "react";
import axios from "axios";


const CartItem = ({ setCart_item, cart_d_item }) => {
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:9000/products/'+ cart_d_item.product+'/').then(resp => {
            setProducto(resp.data)

    })
    }, [])


    return ( 
        <div className="blog-preview">
        {
        producto && (
            <div>
                <h2>item: {producto.product_name}  </h2>
                <p>product quantity: {cart_d_item.product_quantity} </p>
                <p>total: ${parseInt(producto.product_price) * (parseInt(cart_d_item.product_quantity))} </p>
                <button onClick={() => {
                    alert(producto.product_name +  `(${cart_d_item.product_quantity})`  + ' se elimino del carrito')
                    axios.delete('http://127.0.0.1:8000/cart_detail/'+cart_d_item.id+'/',
                                {
                                    params:{
                                    sc:cart_d_item.sc,
                                    product_price: producto.product_price,
                                    product_qt: cart_d_item.product_quantity,                   }
                                }
                            ).then(resp => console.log(resp))
                            console.log(' estas tocando ', producto.product_name)

                
                }
                }> eliminar del carro </button>
            </div>
            

        )}
        </div>
    );
}
 
export default CartItem;