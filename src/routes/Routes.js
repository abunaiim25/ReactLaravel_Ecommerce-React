import AddCategory from '../components/admin/Category/AddCategory';
import EditCategory from '../components/admin/Category/EditCategory';
import ViewCategory from '../components/admin/Category/ViewCategory';
import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';

const Routes =
[
    //dashboard
    { path:'/admin', expect:true, name:'Admin' },
    { path:'/admin/dashboard', expect:true, name:'Dashboard', component:Dashboard },
    //Category
    { path:'/admin/add-category', expect:true, name:'AddCategory', component:AddCategory },
    { path:'/admin/view-category', expect:true, name:'ViewCategory', component:ViewCategory },
    { path:'/admin/edit-category/:id', expect:true, name:'EditCategory', component:EditCategory },
    //
    { path:'/admin/profile', expect:true, name:'Profile', component:Profile },
   
]

export default Routes
