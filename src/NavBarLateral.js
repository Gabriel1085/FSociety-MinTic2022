import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import usuario from "./usuarios.png"
import venta from "./venta.png"
import producto from "./producto.png"
function NavBarLateral() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading){
      return;
    } 
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user, loading,history]);
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
         <div className="position-sticky pt-3">
         <ul className="nav flex-column">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                <div class="boton_seccion">
                    <img src={venta} alt="" width="25em" height="25em"/>
                    <h5>Ventas</h5>
                </div>
                </a>
            </li>
            <li class="nav-item">
            <div class="boton_seccion">
                    <img src={producto} alt="" width="25em" height="25em"/>
                    <h5>Productos</h5>
                </div>
            </li>
            <li class="nav-item">
            <div class="boton_seccion">
                    <img src={usuario} alt="" width="25em" height="25em"/>
                    <h5>Usuarios</h5>
                </div>
            </li>

         </ul>
             
             
             </div>
         


    </nav>
    
  );
}
export default NavBarLateral;