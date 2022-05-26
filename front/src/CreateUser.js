import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import useFetch from './useFetch';

const CreateUser = () => {
  const { data: users, error, isPending } = useFetch('http://0.0.0.0:8000/user/');
  const [message, setMessage] = useState('');
  const [id, setId] = useState(100);


  function createClient(id){
    console.log('creating client')
    axios.post('http://127.0.0.1:8000/client/', {
        client_address: 'address',
        client_phone: 0,
        client: id
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }




  return(
  <div>
    { users && 
    <div className='login-form'>
    <h1>CreateUser</h1>
    <Formik
      initialValues={{
    id: id,
		password: "",
		name: "",
		email: "",
		is_admin: false
      }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
            axios.post('http://127.0.0.1:8000/user/', {
                id:id,
                password: values.password,
                name: values.name,
                email: values.email,
                is_admin: values.is_admin
              
                    

              }).then( resp => {
                console.log(resp)
                setMessage('se creo tu usuario')
                setId(id+1)
                if(!resp.data.is_admin){
                  createClient(resp.data.id)
                }
                
                }
              )
              .catch(function (error) {
                if(error.response.status == 400){
                  setMessage('ya existe ese usuario')
                }
            });              
              }}
    >
      {({ values }) => (
        <Form className='form'>
            <label htmlFor="name">username</label>
            <Field
              className='input-container'
              id="name" 
              name="name" 
              placeholder="name" />
            
            <label htmlFor="email">email</label>
            <Field
              className='input-container' 
              id="email"
              name="email"
              placeholder="email"
              type="email"
            />
            <label htmlFor="password">password</label>
            <Field 
             className='input-container'
              id="password" 
              name="password" 
              placeholder="password"
            />
            <Field as="select" name="is_admin">
                <option value={true}>is admin</option>
                <option value={false}>is not admin</option>
            </Field>

          <p className='error'>{message}</p>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>

    </div>}
  </div>)
};
 
export default CreateUser;