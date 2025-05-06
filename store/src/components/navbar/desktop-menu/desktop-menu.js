
import { Link, useLocation } from "react-router-dom";
import { isStoreSelected, isCartSelected, isAddProduct } from "utils/checkRoutes";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "utils/context";
import { signOutUser } from "utils/firebaseFunctions";
import { TailSpin } from "react-loader-spinner";

export default function DisktopMenu() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { user, loading, cartProducts, isAdmin, setIsAdmin } = useContext(MainContext);

  const signOut = async () => {
    await signOutUser();
    setIsAdmin(false);
    window.location.reload(); // Reload the page after sign out
  };

  return (
    <>
      <Link
        to={"/"}
        className={`navbar__right-side__item ${isStoreSelected(loc.pathname) && "navbar__right-side__item--selected"}`}
      >
        Store
      </Link>
      <div className="navbar__right-side__item navbar__right-side__item--cart-count">
        <Link
          to={"/cart"}
          className={`navbar__right-side__item ${isCartSelected(loc.pathname) && "navbar__right-side__item--selected"}`}
        >
          Cart
        </Link>
        {user && cartProducts && (
          <div className="navbar__right-side__item__cart-count">
            {cartProducts.length}
          </div>
        )}
      </div>

      {isAdmin && loading ? (
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
      ) : (
        isAdmin && (
          <Link
            to={"/addproduct"}
            className={`navbar__right-side__item ${isAddProduct(loc.pathname) && "navbar__right-side__item--selected"}`}
          >
            Add Product
          </Link>
        )
      )}

      {loading ? (
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
      ) : user ? (
        <button 
        className="navbar__right-side__btn primary"
         onClick={()=>{
            signOut()
}}>
            
          Sign Out
        </button>
      ) : (
        <button
          className="navbar__right-side__btn primary"
          onClick={() => {
            navigate("/authenticate");
          }}
        >
          Login
        </button>
      )}
    </>
  );
}