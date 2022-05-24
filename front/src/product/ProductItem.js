import axios from "axios";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "../useFetch";

const ProductItem = ({user}) => {
  const { id } = useParams();
  const { data: product, error, isPending } = useFetch('http://0.0.0.0:9000/products/' + id + '/');
  const history = useHistory()

  function eliminarProducto(){
    axios.delete('http://0.0.0.0:9000/products/' + id + '/').then(resp => console.log(resp.data))
    setTimeout(() => {history.push('/')}, 0)
  }



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
          {user.is_admin && 
          <button onClick={() => {eliminarProducto()}} > Eliminar producto</button>
          }
        </div>
        
      )}
    </div>
  );
}
 
export default ProductItem;