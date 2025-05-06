
import { useContext } from "react";
import { MainContext } from "utils/context";
import { useNavigate } from "react-router-dom";
import { updateArrayData, removeProductData } from "utils/firebaseFunctions";
import { AiFillDelete } from "react-icons/ai";

export default function ProductCard({ prodect }) {
  const { title, description, wasPrice, price, image } = prodect;
  const navigate = useNavigate();
  const {loading, user, role } = useContext(MainContext);

  const redirectToLogin = () => {
    navigate("/authenticate");
  };

  const handleDelete = async () => {
    const productId = prodect.id; // استخراج معرف المنتج
    const result = await removeProductData(productId);
    if (result.success) {
      console.log("Product removed successfully");
    } else {
      console.error("Error removing product:", result.error);
    }
  };

  const addToCart = async () => {
    await updateArrayData(prodect);
  };

  return !loading&& (
    <div className="product-card">
      <div className="product-card__content">
        <img src={image} alt={title} className="product-card__content__image" />
        <span className="product-card__content__title">{title}</span>
        <div className="product-card__content__price">
          {price}
          <span className="product-card__content__price__slash">{wasPrice}</span>
        </div>
        <span className="product-card__content__description">{description}</span>

        {role === "admin" && (
          <span className="product-card__content__icon">
            <AiFillDelete onClick={handleDelete} />
          </span>
        )}
      </div>
      <button
        onClick={user ? addToCart : redirectToLogin}
        className="product-card__btn"
      >
        Add to Cart
      </button>
    </div>
  );
}