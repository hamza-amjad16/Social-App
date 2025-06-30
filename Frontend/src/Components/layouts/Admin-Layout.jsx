import { Navigate, NavLink, Outlet } from "react-router-dom"
import { FaUser, FaEnvelope,FaHouse  , FaServicestack  } from "react-icons/fa6";
import { useAuth } from "../../store/Auth";




export const AdminLayout = () => {
    const {user , isloading} = useAuth()
    console.log("Admin layout",user);

    if(isloading) {
        return <h1>Loading ...</h1>
    }
    
    if(!user.isAdmin) {
        return <Navigate to="/" />
    }
    return (
        <>
        <header>
            <h1 style={{textAlign: "center"}}>Admin Panel</h1>
            <div className="container">
                <nav>
                    <ul>
                        <li><NavLink to="/admin/users"> <FaUser /> users </NavLink> </li>
                        <li><NavLink to="/admin/contacts"><FaEnvelope /> contacts </NavLink> </li>
                        <li><NavLink to="/service"><FaServicestack /> services </NavLink> </li>
                        <li><NavLink to="/"><FaHouse /> Home </NavLink> </li>
                    </ul>
                </nav>
            </div>
        </header>
        {/* show the content of nested routes */}
        <Outlet /> 
        
        </>
    )
}