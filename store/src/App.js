
import "./App.scss";
import Navbar from "components/navbar/navbar";
import Authenticate from "pages/authenticate";
import Cart from "pages/cart";
import Store from "pages/store";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "utils/firebaseConfig";
import { MainContext } from "utils/context";
import { fetchUserData, setupDBListner, getDataSubmit } from "utils/firebaseFunctions";
import { useEffect, useState } from "react";
import Addproduct from "pages/addproduct";
import { where, query, onSnapshot, collection } from "firebase/firestore";

function App() {
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productData, setProductData] = useState([]);
  const [role, setRole] = useState("");
console.log(productData)
  const fetchUser = async () => {
    const res = await fetchUserData(user);
    if (res.success) {
      setUsername(res.data.username);
      setCartProducts(res.data.cartProducts);
      setIsAdmin(res.role === "admin");
      setRole(res.role);
      setProductData(await getDataSubmit(user.uid));
    }
  };

  useEffect(() => {
    if (user) fetchUser();
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      setupDBListner(user, (data) => {
        const updatedProducts = productData.filter((product) => !data.some((cartProduct) => cartProduct.id === product.id));
        setFilteredProducts(updatedProducts);
        setCartProducts(data);
      });
    }
  }, [loading, user, productData]);

  useEffect(() => {
    const collectionRef = collection(database, "products");
    let q;

    if (role === "admin" && user?.uid) {
      q = query(collectionRef, where("userId", "==", user.uid));
    } else {
      q = collectionRef;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProductData(products);

        if (role !== "admin") {
          setFilteredProducts(products);
        }
      },
      (error) => {
        console.error("Error fetching products: ", error);
      }
    );

    return () => unsubscribe();
  }, [role, user?.uid]);

  return (
    <MainContext.Provider value={{ user, loading, cartProducts, username, filteredProducts, setFilteredProducts, isAdmin, setIsAdmin, role, userId: user?.uid, productData }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Store />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/addproduct" element={<Addproduct />}></Route>
        <Route path="/authenticate" element={<Authenticate />}></Route>
      </Routes>
    </MainContext.Provider>
  );
}

export default App;