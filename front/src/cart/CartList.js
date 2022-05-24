import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Detail from "../Detail";

const CartList = ({client}) => {

    const [cartDetails, setCartDetails] = useState('');
    const [sc, setSc] = useState('');

    const restar_stock = (cartDetails) => {
        cartDetails.map(
            cartDetail => {
                axios.get('http://127.0.0.1:9000/products/'+cartDetail.product+'/')
                .then(resp => {
                    console.log(resp)
                    console.log('restando stock... ', resp.data.product_name)
                    axios.patch('http://127.0.0.1:9000/products/'+cartDetail.product+'/',
                        {
                            product_qt: (resp.data.product_qt - cartDetail.product_quantity)
                        }).then(resp => console.log(resp))                            

                    })

            }
        )
    };




    function cargarDatos(){
        console.log('cargando datos')
        axios.get('http://127.0.0.1:8000/cart_detail/').then(resp => {
            setCartDetails((resp.data))


        }).then(
            axios.get('http://127.0.0.1:8000/shopping_cart/'+client.id+'/').then(resp => {
                setSc(resp.data)
                })   
        )
    }

    function eliminarCartDetail(cartDetail){
        axios.get('http://127.0.0.1:9000/products/'+ cartDetail.product+'/').then(resp => {
            axios.delete('http://127.0.0.1:8000/cart_detail/'+cartDetail.id+'/',
                    {
                    params:
                    {
                        sc:cartDetail.sc,
                        product_price: resp.data.product_price,
                        product_qt: cartDetail.product_quantity
                    }
                    }).then( resp => console.log(resp)).then(() => {cargarDatos()})
            }
         )
         
         }

    useEffect(() => {
        cargarDatos()
}, [])
    
    return(
        <div >
            {cartDetails && sc &&
                cartDetails.filter(cartDetail => cartDetail.sc === sc.id).map(
                    cartDetail => (
                        <div className="blog-preview" key={cartDetail.id}>
                            <Detail eliminarCartDetail={eliminarCartDetail} detail={cartDetail} />
                            <button 
                                onClick={() => 
                                {eliminarCartDetail(cartDetail)}}>
                                eliminar 
                            </button>                        
                        </div>

                    )
                )
            }
            <div className="blog-preview">
                <h2> shopping cart: {sc.id} </h2>
                <h2> cantidad de items: {cartDetails.length}</h2>
                <h2> total price ${sc.sc_total_price} </h2>
                {cartDetails.length > 0 && 

                    <Link to='/make_sale/'>
                        <button onClick={() => restar_stock(cartDetails)}> 
                            Realizar compra
                        </button>            
                    </Link>
                }                
            </div>

            

        </div>
        
    )
}
 
export default CartList;