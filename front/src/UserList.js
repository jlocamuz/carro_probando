import { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {

    const [users, setUsers] = useState(null);

    function cargarDatos(){
       axios.get('http://0.0.0.0:8000/user/').then(resp => {
            console.log(resp.data)
            setUsers(resp.data)
        });   
    }

    function eliminarUser(user){
        axios.delete('http://127.0.0.1:8000/user/'+user.id+'/')
            .then( resp => console.log(resp)).then(() => {cargarDatos()})
         
        }



    useEffect(() => {
      cargarDatos();
    },[]);
    
    return(
        <div>
            {users &&
               users.map(
                   user => (
                       <div className='blog-preview 'key={user.id}>
                           <h1>id: {user.id}</h1>
                           <h2>username: {user.name}</h2>
                           <h2>email: {user.email}</h2>
                           <h2>password: {user.password}</h2>
                            {user.is_admin &&
                                <div>

                                 <h2 className="blog-detail">is admin</h2>
                 
                                </div>
                            }
                            <button 
                                onClick={() => 
                                {eliminarUser(user)}}>
                                eliminar 
                            </button>     
                       </div>
                   )
               )    
            }

        </div>
    );
}

export default UserList;