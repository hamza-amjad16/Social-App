import React, { useEffect, useState } from 'react'
import {useNavigate , useParams} from "react-router-dom"
import {toast} from "react-toastify"

import { useAuth } from '../store/Auth'

function AdminUpdate() {
  const [data , setData] = useState({
    username: "",
    email: "",
    phone: "",
  })


  const {  authorizationToken} = useAuth()

  

  const params = useParams()
  console.log("Params single user" , params);
  

  const navigate = useNavigate()



const handleInput = (e) => {
  let name = e.target.name
  let value = e.target.value

  setData({
    ...data,
    [name] : value
  })
}

const getSingleUserData = async () => {
 
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            })
    
            const data = await response.json()
            console.log("Users" , data);
            setData(data)
    
        } catch (error) {
            console.log("Error from update data" , error);
            
        }
}

useEffect(() => {
    getSingleUserData()
} , [])

const handleSubmit = async (e) => {
    e.preventDefault()

   try {
     const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}` , {
       method : "PATCH",
       headers : {
        "Content-Type" : "application/json",
         Authorization: authorizationToken
       },
       body: JSON.stringify(data)
      })

      if(response.ok){
        toast.success("Updated User Successfully" , {
          style: {
            fontSize: "30px",
            width: "500px",       
            padding: "20px 30px",
            fontFamily: "'Poppins', sans-serif", 
          },
        })
        navigate("/admin/users")
      } else {
        toast.error("Not Updated" , {
          style: {
            fontSize: "30px",
            width: "500px",       
            padding: "20px 30px",
            fontFamily: "'Poppins', sans-serif", 
          },
        })
      }

   } catch (error) {
      console.log("update error" , error);
      
   }
}

  return (
    <>
    <section>
      <main>
        <div className="section-registration">           
            {/* Registration form */}
            <div className="registration-form">
              <h1 className='main-heading mb-3'>Update form</h1>
              <br />

              <form onSubmit={handleSubmit} >
                <div>
                  <label htmlFor="username">username</label>
                  <input type="text" 
                  name='username' 
                  placeholder='enter your username'
                  id='username'
                  required
                  autoComplete='off'
                  value={data.username}
                  onChange={handleInput}
                   />
                </div>

                <div>
                  <label htmlFor="email">email</label>
                  <input type="text" 
                  name='email' 
                  placeholder=' enter your email'
                  id='email'
                  required
                  autoComplete='off'
                  value={data.email}
                  onChange={handleInput}
                   />
                </div>

                <div>
                  <label htmlFor="phone">phone</label>
                  <input type="number" 
                  name='phone' 
                  placeholder='enter your phone number'
                  id='phone'
                  required
                  autoComplete='off'
                  value={data.phone}
                  onChange={handleInput}
                   />
                </div>

                <br />
                <button type='submit' className='btn btn-submit'>Update</button>
              </form>
            </div>
          </div>
      </main>
    </section>
    </>
  )
}

export default AdminUpdate