/** 4 */
import About from "../components/frontend/About"
import Cart from "../components/frontend/Cart";
import Checkout from "../components/frontend/Checkout";
import ProductDetails from "../components/frontend/Collections/ProductDetails";
import ViewCategory from "../components/frontend/Collections/ViewCategory";
import ViewProduct from "../components/frontend/Collections/ViewProduct";
import Contact from "../components/frontend/Contact"
import Home from "../components/frontend/Home";


const FrontendRouteList =
[
    // Pages
    { path:'/', exact:true, name:'Home' , component:Home },
    { path:'/about', exact:true, name:'About', component:About },
    { path:'/contact', exact:true, name:'Contact', component:Contact },
    { path:'/collections', exact:true, name:'ViewCategory', component:ViewCategory },
    { path:'/collections/:slug', exact:true, name:'ViewProduct', component:ViewProduct },
    { path:'/collections/:category/:product', exact:true, name:'ProductDetails', component:ProductDetails },//product details
    { path:'/cart', exact:true, name:'Cart' , component: Cart},
    { path:'/checkout', exact:true, name:'Checkout', component:Checkout },
];

export default FrontendRouteList;



