import { Link } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import useFetch from "./useFetch";
const ProductList = ({user, client, products}) => {
  console.log(client)
  const { data: sc } = useFetch('http://0.0.0.0:8000/shopping_cart/'+client.id+"/")
  console.log(sc)
  return (    
    <div className="blog-list">
      {products.map(product => (
        <div className="blog-preview" key={product.id} >
          <Link to={`/products/${product.id}`}>
            <h2 >{ product.product_name }</h2>
          </Link>
          { !user.is_admin &&
          <Formik
            initialValues={{
              cantidad: '',
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 0));
              alert(product.product_name + `(${values.cantidad})` + " se agrego al carrito");
              axios.post('http://127.0.0.1:8000/cart_detail/', {
                product:product.id,
                product_quantity:values.cantidad,
                sc:sc.id
              },{
              params: {
                product_price: product.product_price,
               }}
              )
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
                });



            }}
          >
            <Form>
              <label htmlFor="cantidad">cantidad</label>
              <Field id="cantidad" name="cantidad" type="number"/>
              <button type="submit" >Agregar al carrito</button>
            </Form>
          </Formik>            
          }

        </div>
      ))}
    </div>
  );
}
 
export default ProductList;