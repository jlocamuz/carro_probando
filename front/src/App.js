import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetails from './ProductItem';
import Login from './Login';
import { useState} from 'react';
import CartDetails from './cart/CartDetails';
import MakeSale from './MakeSale';
import SaleDetails from './SaleDetails';
import SaleItems from './SaleItems';
import { useHistory } from "react-router-dom"

function App() {
  const [user, setUser] = useState('');
  const [client, setClient] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(isSubmitted)
  if(isSubmitted){
    return (
      <Router>
        <div>
          <Navbar user={user} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <h2 className='blog-preview'> bienvenido usuario {user.name} </h2>
                <p> tu id es: {user.id} </p>
                <p> tu email es: {user.email}</p>
                {user.is_admin &&  <div> usted es admin</div>} 

                <Home user={user} client={client}/>
              </Route>
              <Route exact path="/products/:id">
                <ProductDetails />
              </Route>
              <Route exact path="/carro/">
                <CartDetails client={client}/>
              </Route>
              <Route exact path="/sale/">
                <MakeSale client={client}></MakeSale>
              </Route>
              <Route exact path='/sale_details/'>
                <SaleDetails user={user} client={client}></SaleDetails>
              </Route>
              <Route exact path='/sale_items/:sale'>
                <SaleItems ></SaleItems>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>);
  } else {
    return(<Login setClient={setClient} 
                  setUser={setUser} 
                  isSubmitted={isSubmitted} 
                  setIsSubmitted={setIsSubmitted} >
           </Login>)
  }

}

export default App;