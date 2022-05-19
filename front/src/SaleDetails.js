import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const SaleDetails = ({user, client}) => {
    const { data: sales, error, isPending } = useFetch('http://0.0.0.0:8000/sale/')
    return ( 
        <div className="blog-preview">
            {
                sales &&  !user.is_admin &&
                (sales.filter((sale) => sale.client_detail === client.id)).map(
                    ((client_sale) => 
                    <div  className="blog-preview" key={client_sale.id}>
                        <Link to={`/sale_items/${client_sale.id}`}>
                            <h2> 
                                sale id: {client_sale.id} 
                            </h2>
                            <p> 
                                sale date: {client_sale.sale_date}
                            </p>                   
                        </Link>
                    

                    </div>

                    )
                )
                
            }        
            {
                sales &&  user.is_admin &&
                sales.map(
                    ((client_sale) => 
                    <div
                        className="blog-preview"
                        key={client_sale.id}
                    >
                    <Link to={`/sale_items/${client_sale.id}`}>

                        <h2> 
                            sale id: {client_sale.id} 
                        </h2>
                        <p> 
                            sale date: {client_sale.sale_date}
                        </p>          
                        <p> client: {client_sale.client_detail}</p>         
                    </Link>                        
                    </div>

                    )
                )
                
            }     
        </div>
        )
    }

 
export default SaleDetails;