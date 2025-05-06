
import { useState } from "react";
import { adminSubmit } from "utils/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { MainContext } from "utils/context";
import { useContext } from "react";
export default function ProductForm() {
  const navigate = useNavigate();

const {user}=useContext(MainContext)
  const [error, setError] = useState("");
  const [adminDataProduct, setAdminDataProduct] = useState({
    image: "",
    title: "",
    price: 0,
    wasPrice: 0,
    description: "",
    
  });

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminDataProduct({
      ...adminDataProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields before submission
    if (!adminDataProduct.image || !adminDataProduct.title || adminDataProduct.price <= 0 || !adminDataProduct.description) {
      setError("All fields are required and price must be greater than 0.");
      return;
    }
  
    const userId = user.uid; 
    try {
      const result = await adminSubmit(
        userId,
        adminDataProduct.image,
        adminDataProduct.title,
        adminDataProduct.price,
        adminDataProduct.wasPrice,
        adminDataProduct.description
      );
    
      if (result.success) {
        setAdminDataProduct({
          image: "",
          title: "",
          price: 0,
          wasPrice: 0,
          description: "",
        });
        navigate("/");
      } else {
        setError(result.error);
        console.log(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Full error details:", err);
    }
  };



  return (
    <div className="product">
      <form className="product--form" onSubmit={handleSubmit}>
        <h2 className="product--form__title">Add a Product</h2>
        <label className="product--form__label" htmlFor="image">
          Image
        </label>
        <input
          onChange={handleAdminChange}
          value={adminDataProduct.image}
          required
          className="product--form__input"
          type="url"
          id="image"
          placeholder="Enter Link Image"
          name="image"
        />
        <label className="product--form__label" htmlFor="title">
          Title
        </label>
        <input
          onChange={handleAdminChange}
          value={adminDataProduct.title}
          required
          className="product--form__input"
          type="text"
          id="title"
          placeholder="Enter Title"
          name="title"
        />
        <label className="product--form__label" htmlFor="price">
          Price
        </label>
        <input
          onChange={handleAdminChange}
          value={adminDataProduct.price}
          required
          className="product--form__input"
          type="number"
          id="price"
          placeholder="Enter Price"
          name="price"
        />
        <label className="product--form__label" htmlFor="wasPrice">
          Was Price
        </label>
        <input
          onChange={handleAdminChange}
          value={adminDataProduct.wasPrice}
          required
          className="product--form__input"
          type="number"
          id="wasPrice"
          placeholder="Enter Was Price"
          name="wasPrice"
        />
        <label className="product--form__label" htmlFor="description">
          Description
        </label>
        <textarea
          onChange={handleAdminChange}
          value={adminDataProduct.description}
          required
          id="description"
          className="product--form__description"
          placeholder="Enter your description"
          name="description"
        ></textarea>
        <button type="submit" className="product--form__btn primary">
          Add
        </button>
      </form>
    </div>
  );
}