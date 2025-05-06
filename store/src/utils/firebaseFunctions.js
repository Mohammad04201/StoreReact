import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import {deleteDoc, arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";

 

 export const registerUser=async(username,email,password)=>{

    try{ 
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await setDoc(doc(database,"users",user.uid),{
            username:username,
            role:"user",
            cartProducts:[]
        })
        return{success:true}
    }
    catch(error){
        return{ success: false , error : error.message}

    }
 } 

export const adminSubmit = async (userId, image, title, price, wasPrice, description) => {
  try {
    const collectionRef = collection(database, "products");
    const docRef = doc(collectionRef);
    await setDoc(docRef, {
      id: docRef.id, // تخزين المعرف الفريد في المستند
      role: "admin",
      userId: userId, // تخزين معرف المستخدم
      image: image,
      title: title,
      price: price,
      wasPrice: wasPrice,
      description: description,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


export const signInUser=async(email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password)
    return{success:true}
  }
  catch (error){
    return{ success: false , error : error.message}
  }
}
export const signOutUser=async()=>{
  try{
    await signOut(auth)
    return{success:true}
  }
  catch (error){
    return{ success: false , error : error.message}
  }
}

export const getDataSubmit = async (userId) => {
  const collectionRef = collection(database, "products");
  const productData = [];

  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.userId === userId) {
      productData.push(data);
    }
  });

  return productData;
};

export const removeProductData = async (productId) => {
  console.log("Removing product with ID:", productId); // تتبع معرف المنتج
  const docRef = doc(database, "products", productId);
  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error removing product:", error); // تتبع الخطأ
    return { success: false, error: error.message };
  }
};
export const fetchUserData = async (user) => {
  try {
    const q = query(
      collection(database, "users"),
      where('__name__', '==', user?.uid)
    );
    const doc = await getDocs(q);
    if (!doc.empty) {
      const data = doc.docs[0].data();
      return { success: true, data: data, role: data.role }; // إضافة الدور إلى البيانات المسترجعة
    } else {
      return { success: false, error: "User data not found." };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateArrayData=async (prodect)=>{
  // authe.currentUser بتجيب المستخدم العامل تسجيل دخول
const user = auth.currentUser;
  const docRef=doc(database,"users",user.uid)
try{
await updateDoc(docRef,{
  cartProducts:arrayUnion(prodect)
})
return{success:true}

}
catch (error){
  return{ success: false , error : error.message}

}

}

export const removeArrayData=async (prodect)=>{
  const user = auth.currentUser;
    const docRef=doc(database,"users",user.uid)
  try{
  await updateDoc(docRef,{
    cartProducts:arrayRemove(prodect)
  })
  return{success:true}
  
  }
  catch (error){
    return{ success: false , error : error.message}
  
  }
  
  }

export const setupDBListner=async(user,callback)=>{
const docRef=doc(database,"users",user.uid)
return onSnapshot(docRef,(doc)=>{
if(doc.exists()){
  const data=doc.data();
  callback(data['cartProducts'])
}
})

}





 export function getFrontendErrorMessage(errorCode) {
    switch (errorCode) {
      case "Firebase: Error (auth/user-not-found).":
        return "This email is not registered, please make sure you enter a registered email.";
      case "Firebase: Error (auth/wrong-password).":
        return "The password entered is wrong. Please make sure you enter the correct password.";
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return "The password should be at least 6 characters.";
      case "Firebase: Error (auth/email-already-in-use).":
        return "The email address is already in use. Please use a different email.";
      case "Firebase: Error (auth/invalid-email).":
        return "Invalid email address. Please enter a valid email.";
      case "Firebase: Error (auth/weak-password).":
        return "Weak password. Please choose a stronger password.";
      case "Firebase: Error (auth/invalid-login-credentials).":
        return "Incorrect credentials, please make sure you add correct ones.";
      case "Firebase: Error (auth/operation-not-allowed).":
        return "This operation is currently not allowed. Please try again later.";
      case "Firebase: Error (auth/too-many-requests).":
        return "Too many requests, please try again in some minutes";
      case "Firebase: Error (auth/app-not-authorized).":
        return "The app is not authorized to use Firebase Authentication.";
      case "Firebase: Error (auth/network-request-failed).":
        return "Network error. Please check your internet connection and try again.";
      case "Firebase: Error (auth/requires-recent-login).":
        return "Please log in again to continue.";
      case "Firebase: Error (auth/invalid-api-key).":
        return "Invalid API key. Please contact support.";
      default:
        return "An error occurred. Please try again.";
    }
  }
