import AddCategory from '../components/admin/Category/AddCategory';
import EditCategory from '../components/admin/Category/EditCategory';
import ViewCategory from '../components/admin/Category/ViewCategory';
import Dashboard from '../components/admin/Dashboard';
import AddProduct from '../components/admin/Product/AddProduct';
import EditProduct from '../components/admin/Product/EditProduct';
import ViewProduct from '../components/admin/Product/ViewProduct';
import Profile from '../components/admin/Profile';

const Routes =
[
    //dashboard Pages
    { path:'/admin', expect:true, name:'Admin' },
    { path:'/admin/dashboard', expect:true, name:'Dashboard', component:Dashboard },
    //Category Pages
    { path:'/admin/add-category', expect:true, name:'AddCategory', component:AddCategory },
    { path:'/admin/view-category', expect:true, name:'ViewCategory', component:ViewCategory },
    { path:'/admin/edit-category/:id', expect:true, name:'EditCategory', component:EditCategory },
    //Category Pages
    { path:'/admin/add-product', expect:true, name:'AddProduct', component:AddProduct },
    { path:'/admin/view-product', expect:true, name:'ViewProduct', component:ViewProduct },
    { path:'/admin/edit-product/:id', expect:true, name:'EditProduct', component:EditProduct },
    //Profile Pages
    { path:'/admin/profile', expect:true, name:'Profile', component:Profile },
   
]

export default Routes
