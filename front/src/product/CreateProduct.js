import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import useFetch from '../useFetch';
import axios from 'axios';

const CreateProduct = () => {
  const { data: distributors, error, isPending } = useFetch('http://0.0.0.0:9000/distributors/');
  const [message, setMessage] = useState('');
  
  return(
  <div>
    { distributors && 
    <div className='login-form'>
    <h1>CreateProduct</h1>
    <Formik
      initialValues={{
        product_name: '',
        product_description: '',
        product_price: 0,
        product_qt: 0,
        distributor: ''
      }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
            axios.post('http://127.0.0.1:9000/products/', {
              distributor: values.distributor,
              product_name: values.product_name,
              product_description: values.product_description,
              product_price: values.product_price,
              product_qt: values.product_qt,
              
                    

              }).then( resp => {
                console.log(resp)
                setMessage('se creo tu producto')}
              )
              .catch(function (error) {
                if(error.response.status == 404){
                  setMessage('No existe ese distribuidor')
                }
                else if(error.response.status == 400){
                  setMessage('ya existe ese producto')
                }
            });              
              }}
    >
      {({ values }) => (
        <Form className='form'>
            <label htmlFor="product_name">product_name</label>
            <Field
              className='input-container'
              id="product_name" 
              name="product_name" 
              placeholder="product_name" />
            
            <label htmlFor="product_description">product_description</label>
            <Field
              className='input-container' 
              id="product_description"
              name="product_description"
              placeholder="product_description"
            />
            <label htmlFor="product_price">product_price</label>
            <Field 
             className='input-container'
              id="product_price" 
              name="product_price" 
              placeholder="product_price"
              type="number"
            />
            <label htmlFor="product_qt">product_qt</label>
            <Field 
              className='input-container'
              id="product_qt" 
              name="product_qt" 
              placeholder="product_qt"
              type="number"
               />
            <label htmlFor="distributor">distributor name</label>

          <div >
            {
              distributors.map(distributor =>
            <div key={distributor.distributor_name}>
              <Field type="radio" name="distributor" value={distributor.id} />
              {distributor.distributor_name}
            </div>              
              )
            }
            <div>Picked: {values.distributor}</div>
          </div>
          <p className='error'>{message}</p>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>

    </div>}
  </div>)
};
 
export default CreateProduct;