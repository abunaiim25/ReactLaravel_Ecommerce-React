import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';



const ViewCategory = () => {
  document.title = "View Category";

  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);


  //===========View Data =====================
  useEffect(() => {
    axios.get(`/api/view-category`).then(res => {
      //console.log(res.data.category)
      if (res.data.status === 200) {
        setCategorylist(res.data.category)
      }
      setLoading(false);
    });

  }, []);

  //===========Delete Data By Id=====================
  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/delete-category/${id}`).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      }
      else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Delete";
      }
      setLoading(false);
    });
  }




  var viewcategory_HtmlTable = "";
  if (loading) {
    return <h4>Loading Category...</h4>
  }
  else {
    viewcategory_HtmlTable =
      categorylist.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.slug}</td>
            <td>{item.status}</td>
            <td><Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm ">Edit</Link></td>
            <td> <button type='button' onClick={(e) => deleteCategory(e, item.id)} className='btn btn-danger btn-sm'>Delete</button> </td>
          </tr>
        )
      })
  }



  return (
    <>
      <div className="container-fluid px-4">

        <h1 class="mt-4">Category</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item"><Link className='link' to={'/admin/dashboard'}>Dashboard</Link></li>
          <li class="breadcrumb-item active">View Category</li>
        </ol>

        <div className="card mt-4 ">
          <div className="card-header space_between">
            <h4>Category List</h4>
            <Link className='btn btn-success btn-sm' to="/admin/add-category">Add Category</Link>
          </div>

          <div className="card-body ">
            <table className="table table-bordered table-striped table-hover">
              <thead className=''>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {viewcategory_HtmlTable}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewCategory
