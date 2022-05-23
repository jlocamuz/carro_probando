import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const ProductItem = () => {
  const { id } = useParams();
  const { data: product, error, isPending } = useFetch('http://0.0.0.0:9000/products/' + id + '/');

  return (
    <div className="blog-detail">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { product && (
        <div>
          <h2>{ product.product_name }</h2>
          <p>Price ${ product.product_price }</p>
          <p>Description {product.product_description} </p>
          <p>Stock {product.product_qt} unidades</p>
        </div>
      )}
    </div>
  );
}
 
export default ProductItem;