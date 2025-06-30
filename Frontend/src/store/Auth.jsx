import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [token , setToken] = useState(localStorage.getItem("token"))
    const [LoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
    const [user , setUser] = useState("")
    const [isloading , setIsloading] = useState(true)
    const [services , setService] = useState([])
    const authorizationToken = `Bearer ${token}`

    const storetokenInLS = (newToken) => {
        return localStorage.setItem("token", newToken)
    }

        
    const userAuthentication = async () => {
        setIsloading(true)
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization : authorizationToken
                }
            })

            if(response.ok){
                const data = await response.json()
                console.log("user data" ,data.userData);
                setUser(data.userData)
                setIsloading(false)
            } else {
                console.log("Error fetching user data");
                setIsloading(false)
            }

        } catch (error) {
            console.log("Error fetching data");
            
        }
    }

    // fetch data from backend service
    const getServices = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/data/service` , {
                method: "GET",
            })

            if(response.ok){
                const data = await response.json()
                console.log(data.msg);
                setService(data.msg)
            }

        } catch (error) {
            console.log("Error from service" , error);
            
        }
    }
    
   

    const LogoutUser = () => {
        setToken(null)
        setLoggedIn(false);
        return localStorage.removeItem("token")
    }

    const LoginUser = (newToken) => {
        setToken(newToken);
        setLoggedIn(true);
        return localStorage.setItem("token", newToken);
      };

    //   get currently user data

    useEffect(() => {
        if (token) {
            getServices()
            userAuthentication();
        } else {
            setUser(""); // clear user data on logout
        }
    }, [token]); 
    
      

    return <AuthContext.Provider  value={ {LoggedIn ,  LoginUser , LogoutUser , user , services , storetokenInLS ,
        authorizationToken , isloading
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

