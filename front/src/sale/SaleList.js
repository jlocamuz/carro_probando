import axios from "axios";
import { useEffect, useState } from "react";
import SaleItem from "./SaleItem";

const SaleList = ({user, client}) => {

    const [sales, setSales] = useState(null);
    useEffect(() => {
        axios.get('http://0.0.0.0:8000/sale/').then(resp => {
            if(user.is_admin){
                setSales(resp.data);  
                console.log(resp.data)
            }else{
                setSales(resp.data.filter(sale => sale.client_detail === client.id));  
                console.log(resp.data)
            }
            
        });
    },[]);
    
    return ( 
        <div>
        {
            sales && (                
                sales.map(sale => 
                    <div className="blog-preview" key={sale.id}>
                        <SaleItem sale={sale}/>
                    </div>
                )
            )
        }            
        </div>

        )
    }

 
export default SaleList;