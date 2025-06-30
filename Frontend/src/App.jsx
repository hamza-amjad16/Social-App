import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Service from "./pages/Service"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Navbar from "./Components/Navbar"
import Error from "./pages/Error"
import { Logout } from "./pages/Logout"

import './App.css'
import Footer from "./Components/Footer"
import { AdminLayout } from "./Components/layouts/Admin-Layout"
import { AdminUsers } from "./pages/Admin-Users"
import { AdminContacts } from "./pages/Admin-Contacts"
import AdminUpdate from "./pages/Admin-Update"

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
              <Route path="users" element={<AdminUsers/>}  />
              <Route path="contacts" element={<AdminContacts />}  />
              <Route path="users/:id/edit" element={<AdminUpdate />}  />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
