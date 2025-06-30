import {  useEffect, useState } from "react"
import { useAuth } from "../store/Auth"
import {Link} from "react-router-dom"
import { toast } from "react-toastify"



export const AdminUsers = () => {



    const [users , setUsers] = useState([])
    const {authorizationToken} = useAuth()

const getAllUsersData = async() => {

    try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            }
        })

        const data = await response.json()
        console.log("Users" , data);
        setUsers(data)

    } catch (error) {
        console.log("Error from admin users" , error);
        
    }
}
  // delete user
  const deleteUser = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: authorizationToken,
        }
    })
        const data = await response.json()
        console.log("User After delete" , data);
        // setUsers(data)
        
        if(response.ok){
          getAllUsersData()
          toast.success("User Deleted Successfully" , {
            style: {
              fontSize: "30px",
              width: "500px",       
              padding: "20px 30px",
              fontFamily: "'Poppins', sans-serif", 
            },
          })
        }
    } catch (error) {
      console.log("Delete error" , error);
      
    }
  }

    useEffect(() => {
        getAllUsersData()
    },[])


    return (
      <>
      { users.length === 0 ? (
         <section className="admin-users-section">
         <div className="admin-users-container">
           <h1 className="admin-heading"> Users Data</h1>
           <h3 className="admin-heading" >No users data found.</h3>
         </div>
       </section>
      ) : (
        <section className="admin-users-section">
        <div className="admin-users-container">
          <h1 className="admin-heading">Admin Users Data</h1>
      
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              { Array.isArray(users) &&  users?.map((currUser, index) => (
                <tr key={index}>
                  <td>{currUser.username}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.phone}</td>
                  <td><Link to={`${currUser._id}/edit`} className="edit-btn">Edit</Link></td>
  
  
                  <td><button onClick={() => deleteUser(currUser._id)} className="delete-btn">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      )

      }
      
      </>

    )
}