import { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get('http://0.0.0.0:8000/user/').then(resp => {
            console.log(resp.data)
            setUsers(resp.data)
        });
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
                       </div>
                   )
               )    
            }

        </div>
    );
}
 
export default UserList;