import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const SaleItems = () => {
    const { sale } = useParams();

    const { data: sale_details, error, isPending } = useFetch('http://0.0.0.0:8000/sale_detail/');

    return ( 
        <div className="blog-list">
            {
                sale_details && 
                <div>
                    <h1> sale {sale} </h1>
                    {(sale_details.filter(sd => sd.sale == sale)).map(
                        item => 
                        <div className="blog-preview"
                            key={item.id}
                        >
                            <p> product id: {item.product} </p>
                            <p> product quantity: {item.product_quantity}  </p>
                        </div>
                    )}
                </div>
            }
        </div>

    );
}
 
export default SaleItems;