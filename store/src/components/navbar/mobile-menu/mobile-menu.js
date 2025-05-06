import { Link ,useLocation} from "react-router-dom";
import { isCartSelected,isStoreSelected ,isAddProduct} from "utils/checkRoutes";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "utils/firebaseFunctions";
import { MainContext } from "utils/context";
import { TailSpin } from "react-loader-spinner";
export default function  MobileMenu(closeFn){
const navigate=useNavigate()
const {user,loading,cartProducts,isAdmin,setIsAdmin}=useContext(MainContext)
const signOut=async()=>{
   await signOutUser()
   setIsAdmin(false);
   window.location.reload(); // Reload the page after sign out
}

const loc=useLocation()
    return (
        <div className="mobile-menu">
<div className="mobile-menu__content">
<Link to={"/"}
 onClick={closeFn}

 className={`mobile-menu__content__item 
    ${isStoreSelected(loc.pathname)&& "mobile-menu__content__item--selected"}`}
 
 >Store</Link>
     <div className="mobile-menu__content mobile-menu__content--cart">
          <Link
            onClick={closeFn}
            to="/cart"
            className={`mobile-menu__content__item
              ${
                isCartSelected(loc.pathname) &&
                "mobile-menu__content__item--selected"
              }`}
          >
            Cart
          </Link>
          {user && cartProducts && (
            <div className="mobile-menu__content__cart-count">
              {cartProducts.length}
            </div>
          )}
        </div>
 
       { isAdmin && loading ? (
         <TailSpin
           visible={true}
           height="30"
           width="30"
           color="#3b4142"
           ariaLabel="tail-spin-loading"
           radius="1"
           wrapperStyle={{}}
           wrapperClass=""
         />
       ):(
       isAdmin && <Link
            onClick={closeFn}
            to="/addproduct"
            className={`mobile-menu__content__item
              ${
                isAddProduct(loc.pathname) &&
    
                "mobile-menu__content__item--selected"
              }`}
          >
            Add Product
          </Link>)}

 
{
loading?

(<TailSpin
   visible={true}
   height="30"
   width="30"
   color="#3b4142"
   ariaLabel="tail-spin-loading"
   radius="1"
   wrapperStyle={{}}
   wrapperClass=""
   />
)
:
 user ? (
   <button
    onClick={()=>{
      signOut()
    }
      } 

    className="mobile-menu__content__btn primary">
     Sign Out
   </button>
 ) : (
   <button onClick={() => navigate("/authenticate")} className="mobile-menu__content__btn primary">
     Login
   </button>
 )}
</div>
        </div>
    )
    
    }