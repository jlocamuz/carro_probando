import axios from "axios";
import { useEffect, useState } from "react";
import Detail from "../Detail";


const SaleDetails = ({sale}) => {
    const [saleDetails, setSaleDetail] = useState(null);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/sale_detail/').then(resp => {    
            setSaleDetail(resp.data.filter(saleDetail => saleDetail.sale === sale.id))
            })
        }, [])
    return ( 
        <div>
            {saleDetails && 
                saleDetails.map(
                    saleDetail => 
                    <Detail key={saleDetail.id} detail={saleDetail}></Detail>
                )
                
            }  
        </div>
        
     );
}
 
const SaleItem = ({sale}) => {

    const [saleUser, setSaleUser] = useState(null)
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/client/'+sale.client_detail+'/').then(resp => {
            axios.get('http://127.0.0.1:8000/user/'+resp.data.client+'/').then(resp => {    
                setSaleUser(resp.data)
            })
        });

    },[]);


    return ( 
        <div>
            {
                saleUser && 
                <div>
                    <h1>sale id: {sale.id}</h1>
                    <h2>sale date: {sale.sale_date}</h2>     
                    <h2>user: {saleUser.email} </h2>             
                    <SaleDetails sale={sale} />  
                </div>

            }
            
        </div>
     );
}

export default SaleItem;