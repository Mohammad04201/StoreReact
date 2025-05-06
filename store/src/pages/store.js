
import ProductCard from "components/prodect-card/prodect-card";
import { useContext } from "react";
import { MainContext } from "utils/context";
import { RotatingLines } from "react-loader-spinner";
export default function Store() {
  const { loading, filteredProducts, productData, role } = useContext(MainContext);


  const productsToDisplay = role === "admin" ||role==="user"? filteredProducts : productData;

  return (<div className="store">
    {loading?
    (<RotatingLines
      visible={true}
      height="96"
      width="96"
      strokeColor="#3b4142"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      />)
   :productsToDisplay.map((prodect, index) => (
        <ProductCard key={index} prodect={prodect} />
      ))
   }
  </div>  );
}