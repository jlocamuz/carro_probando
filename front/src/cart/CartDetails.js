import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";


const CartDetails = ({client}) => {
    const [cart_d, setCart_d] = useState('')
    const [sc, setSc] = useState('')
    const [cart_item, setCart_item] = useState('')

    const restar_stock = (cart_d) => {
        cart_d.map(
            product => {
                axios.get('http://127.0.0.1:9000/products/'+product.product+'/')
                .then(resp => {
                    axios.patch('http://127.0.0.1:9000/products/'+product.product+'/',
                        {
                            product_qt: (resp.data.product_qt - product.product_quantity)
                        })                            
                    
                    })

            }
        )
    };


    useEffect(() => {
        console.log('useeffect!!')
        axios.get('http://127.0.0.1:8000/cart_detail/').then(resp => {
            setCart_d(resp.data)
    })
        axios.get('http://0.0.0.0:8000/shopping_cart/'+client.id+"/").then(resp => {
            setSc(resp.data)
        
    })
    } , [cart_item]);

    

    return (
        <div>
        { sc && cart_d &&
        (cart_d.filter((cd) => cd.sc === sc.id)).map(cart_d_item => (
                <CartItem 
                    setCart_item={setCart_item}
                    cart_d_item={cart_d_item} 
                    key={cart_d_item.id}
                ></CartItem>
            ))
        }

        <div className="blog-preview"> 
            <h2> $ { sc && sc.sc_total_price} </h2>
            <p> {cart_d.length} items en tu carrito </p>
            {
            cart_d.length > 0 && 
            <Link to={'/sale/'}>
                <button onClick={() => restar_stock(cart_d) }> 
                    Comprar 
                </button>
            </Link>
            }            
        </div>
      </div>
        
        );
}
 
export default CartDetails;