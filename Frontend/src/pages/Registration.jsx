import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useAuth } from '../store/Auth'
import { toast } from 'react-toastify'

function Registration() {
  const [user , setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  const navigate = useNavigate()
  const {storetokenInLS} = useAuth()

const handleInput = (e) => {
  let name = e.target.name
  let value = e.target.value

  setUser({
    ...user,
    [name] : value
  })
}

const handleSubmit = async (e) => {
    e.preventDefault()

   try {
     const response = await fetch(`http://localhost:5000/api/auth/register` , {
       method : "POST",
       headers : {
         "Content-type" : "application/json",
       },
       body: JSON.stringify(user)
      })
      const res_data = await response.json()
      console.log("res from server" , res_data);
      
      if(response.ok){

        // stored token in local storage
        storetokenInLS(res_data.token)

        setUser({
      username: "",
      email: "",
      phone: "",
      password: "",
        })
        toast.success("Registration Successfully" , {
          style: {
            fontSize: "30px",
            width: "500px",       
            padding: "20px 30px",
            fontFamily: "'Poppins', sans-serif", 
          },
        })
        navigate("/login")
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message , {
          style: {
            fontSize: "30px",
            width: "500px",       
            padding: "20px 30px",
            lineHeight: 1,
            fontFamily: "'Poppins', sans-serif", 
          },
        })
      }

     console.log(response);

   } catch (error) {
      console.log("register" , error);
      
   }


}

  return (
    <>
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img src="/images/register.png" width="500" height="500" alt="" />
            </div>

            {/* Registration form */}
            <div className="registration-form">
              <h1 className='main-heading mb-3'>Registration form</h1>
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
                  value={user.username}
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
                  value={user.email}
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
                  value={user.phone}
                  onChange={handleInput}
                   />
                </div>

                <div>
                  <label htmlFor="password">password</label>
                  <input type="password" 
                  name='password' 
                  placeholder='password'
                  id='password'
                  required
                  autoComplete='off'
                  value={user.password}
                  onChange={handleInput}
                   />
                </div>

                <br />
                <button type='submit' className='btn btn-submit'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
    </>
  )
}

export default Registration