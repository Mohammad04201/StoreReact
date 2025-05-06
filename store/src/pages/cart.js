import CartCard from "components/cart-card/cart-card";
import { MainContext } from "utils/context";
import { useContext } from "react";

export default function Cart(){
  const { user, loading, username, cartProducts } = useContext(MainContext);
  
  const calculateTotalPrice= ()=>{
    if( "cart= "+cartProducts){
      console.log(cartProducts)
        let totalprice=0;
        cartProducts.forEach(prodect => {
           totalprice+=Number(prodect.price)       
        });
        return totalprice;
    }
    else{
        return 0
    }
  }


  return loading ? (
    <div className="cart__message">Loading...</div>
  ) : !user ? (
    <div className="cart__message">Please Login To View Your Cart</div>
  ) : (
    <div className="cart">
      <div className="cart__product">
       {!cartProducts || cartProducts.length===0?(


           <div className="cart__message cart__message--empty-cart">Please Add Products To Cart </div>
       )
        :  (
            cartProducts.map((prodect, index) => {
              return (
                <CartCard 
                  key={index}
                  prodect={prodect}
                />
              );
            })

        )
        }
      </div>
      <div className="cart__checkout">
        <h1>CheckOut</h1>
        <h2>Username: {username}</h2>
        <h2>Total: $ {calculateTotalPrice()}</h2>
        {calculateTotalPrice()!==0&& <button className="primary">Pay</button>}
      </div>
    </div>
  );
}
