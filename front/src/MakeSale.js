import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

const MakeSale = ({client}) => {
    // se crea obj sale
    // todos los cart_details --> sale_details
    // se elimina  carro 
    // se crea uno nuevo 
    const history = useHistory()

    const [sc, setSc] = useState('')
    const [sale, setSale] = useState('');
    useEffect(() => {
        axios.get('http://0.0.0.0:8000/shopping_cart/'+client.id+"/").then(resp => {
            setSc(resp.data)
    })
        axios.post('http://127.0.0.1:8000/sale/',{client_detail:client.id}).then(resp => {
            setSale(resp.data)
        })

    }, [])
    setTimeout(() => {history.push('/')}, 5000)
    return (
        <div>
        { sale  && 
            <div>
                <h2> Se realizo la compra con exito! </h2>  
                <p> en unos segundos sera redirigido a Home</p>    
            </div>        
        }            
        </div>


    
        );
}
export default MakeSale;