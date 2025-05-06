import React, { useContext } from "react";
import ProductForm from "components/product-form/product-form";
import { MainContext } from "utils/context";

export default function ProductPage() {
  const { isAdmin, loading } = useContext(MainContext);

  return (
  <>
{loading?
     <div className="cart__message">Loading...</div>

:isAdmin ? (
    <div className="container">
      <ProductForm />
    </div>
  ) : (
    <div className="cart__message">You do not have permission to view this page.</div>
 )}
  </>
  )
}