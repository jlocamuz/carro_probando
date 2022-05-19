import ProductList from "./ProductList";
import useFetch from "./useFetch";

const Home = ({user, client}) => {
  const { error, isPending, data: products } = useFetch('http://0.0.0.0:9000/products/')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { products && <ProductList  user={user} client={client} products={products.filter(product => product.product_qt > 0)} /> }
    </div>
  );
}
 
export default Home;
