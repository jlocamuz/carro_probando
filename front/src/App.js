import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductItem from './product/ProductItem';
import Login from './Login';
import { useState} from 'react';
import MakeSale from './MakeSale';
import SaleList from './sale/SaleList';
import CartList from './cart/CartList';
import UserList from './UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProduct from './product/CreateProduct';

function App() {
  const [user, setUser] = useState('');
  const [client, setClient] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(isSubmitted)
  if(isSubmitted){
    console.log(user)
    console.log(user.is_admin)
    console.log(client)
    return (
      <Router>
        <div>
          <Navbar user={user} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
          <div className='content'>
            <Switch>
              <Route exact path="/">
                <h2> bienvenido usuario {user.name} </h2>
                {user.is_admin &&  <div> usted es admin</div>} 
                <Home user={user} client={client}/>
              </Route>
              <Route exact path="/products/:id">
                <ProductItem user={user}/>
              </Route>
              <Route exact path="/carro/">
                <CartList client={client}/>
              </Route>
              <Route exact path="/make_sale/">
                <MakeSale client={client}></MakeSale>
              </Route>
              <Route exact path='/sales/'>
                <SaleList user={user} client={client}/>
              </Route>
              <Route exact path='/users/'>
                <UserList/>
              </Route>
              <Route exact path='/create_product/'>
                <CreateProduct/>
              </Route>

            </Switch>
          </div>
        </div>
      </Router>);
  } else {
    return(<Login setClient={setClient} 
                  setUser={setUser} 
                  user={user}
                  isSubmitted={isSubmitted} 
                  setIsSubmitted={setIsSubmitted} >
           </Login>)
  }

}

export default App;