/** 4 */
import AddCategory from '../components/admin/Category/AddCategory';
import EditCategory from '../components/admin/Category/EditCategory';
import ViewCategory from '../components/admin/Category/ViewCategory';
import Dashboard from '../components/admin/Dashboard';
import Order from '../components/admin/Order/Order';
import AddProduct from '../components/admin/Product/AddProduct';
import EditProduct from '../components/admin/Product/EditProduct';
import ViewProduct from '../components/admin/Product/ViewProduct';
import Profile from '../components/admin/Profile';

const AdminRouteList =
[
    //dashboard Pages
    { path:'/admin', exact:true, name:'Admin' },
    { path:'/admin/dashboard', exact:true, name:'Dashboard', component:Dashboard },
    //Category Pages
    { path:'/admin/add-category', exact:true, name:'AddCategory', component:AddCategory },
    { path:'/admin/view-category', exact:true, name:'ViewCategory', component:ViewCategory },
    { path:'/admin/edit-category/:id', exact:true, name:'EditCategory', component:EditCategory },
    //Category Pages
    { path:'/admin/add-product', exact:true, name:'AddProduct', component:AddProduct },
    { path:'/admin/view-product', exact:true, name:'ViewProduct', component:ViewProduct },
    { path:'/admin/edit-product/:id', exact:true, name:'EditProduct', component:EditProduct },
    //Profile Pages
    { path:'/admin/profile', exact:true, name:'Profile', component:Profile },
    { path:'/admin/orders', exact:true, name:'Order', component:Order },
   
];

export default AdminRouteList;
