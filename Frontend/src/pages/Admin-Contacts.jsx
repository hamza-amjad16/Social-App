import { useEffect, useState } from "react"
import { useAuth } from "../store/Auth"
import { toast } from "react-toastify"






export const AdminContacts = () => {

    const [contacts , setContacts] = useState([])
    const {authorizationToken} = useAuth()

    const getAllUsersData = async() => {

        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            })
    
            const data = await response.json()
            console.log("Contacts" , data);
            setContacts(data)

            if (Array.isArray(data)) {
              setContacts(data);
            } else {
              // If it's not array (maybe {}), set empty array
              setContacts([]);
            }
    
        } catch (error) {
            console.log("Error from admin users" , error);
            
        }
    }

 // delete user
 const deleteContact = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: authorizationToken,
        }
    })
        const data = await response.json()
        console.log("Contacts After delete" , data);
        setContacts(data)
        
        if(response.ok){
          getAllUsersData()
          toast.success("Delete Contacts Successfully" , {
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
      {
         contacts.length === 0 ? (
          <section className="admin-users-section">
            <div className="admin-users-container">
              <h1 className="admin-heading"> Contact Data</h1>
              <h3 className="admin-heading" >No contact data found.</h3>
            </div>
          </section>
      ) : (
        <section className="admin-users-section">
        <div className="admin-users-container">
          <h1 className="admin-heading"> Contact Data</h1>
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              { Array.isArray(contacts) &&  contacts?.map((currUser, index) => (
                <tr key={index}>
                  <td>{currUser.username}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.message}</td>
                  <td><button onClick={() => deleteContact(currUser._id)} className="delete-btn">Delete</button></td>
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