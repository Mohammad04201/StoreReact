import { AiFillDelete } from "react-icons/ai";
import { removeArrayData } from "utils/firebaseFunctions";

export default function CartCard({prodect}){
    const { title, description, price, image }=prodect;

    const handleDelte=async()=>{
        await removeArrayData(prodect)
    }


    return(
        <div className="cart-card">
             <img src={image} alt="name" className="cart-card__image"></img>
             <span className="cart-card__title" >{title}</span>
            <span  className="cart-card__description">{description}</span>
            <span >$ {" "} {price}</span>
            <span className="cart-card__icon"><AiFillDelete onClick={handleDelte}/></span>
        </div>
    )
}