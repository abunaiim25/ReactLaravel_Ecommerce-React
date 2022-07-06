import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { PUBLIC_URL } from '../../../PUBLIC_URL';


const ViewProduct = () => {
  document.title = "View Product";

  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  //===========View Data =====================
  useEffect(() => {
    axios.get(`/api/view-product`).then(res => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setLoading(false);
      }
    });
  }, []);
  //onClick={(e)=>deleteProduct(e, item.id)} 
  var viewproduct_display = "";
  if (loading) {
    return <h4>Loading Product...</h4>
  }
  else {
    viewproduct_display =
      viewProduct.map((item) => {
        //Status
        var productStatus = '';
        if (item.status == "0") {
          productStatus =<span className="badge bg-danger">Inactive</span>;
        }
        else if (item.status == "1"){
          productStatus =  <span className="badge bg-success">Active</span>;
        }

        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.category.name}</td> {/** Join category -> category_id*/}
            <td>{item.name}</td>
            <td>{item.selling_price}</td>
            <td>{productStatus}</td> {/** Status */}
            <td>
              <img src={`${PUBLIC_URL}/${item.image}`} width="50px" alt={item.name} />
            </td>
            <td>
              <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm ">Edit</Link>
            </td>
            <td>
            <td> <button type='button' onClick={(e)=>deleteProduct(e, item.id)} className='btn btn-danger btn-sm'>Delete</button> </td>
            </td>
          </tr>
        )
      })
  }

    //===========Delete Data By Id=====================
    const deleteProduct = (e, id) => {
      e.preventDefault();
  
      const thisClicked = e.currentTarget;
      thisClicked.innerText = "Deleting";
  
      axios.delete(`/api/delete-product/${id}`).then(res => {
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


  return (
    <>
      <div className="container-fluid px-4">

        <h1 class="mt-4">Product</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item"><Link className='link' to={'/admin/dashboard'}>Dashboard</Link></li>
          <li class="breadcrumb-item active">View Product</li>
        </ol>

        <div className="card mt-4 ">
          <div className="card-header space_between">
            <h4>Product List</h4>
            <Link className='btn btn-success btn-sm' to="/admin/add-product">Add Product</Link>
          </div>

          <div className="card-body ">
            <div className="table-responsive">
              <table class="table table-bordered table-striped table-hover">
                <thead className=''>
                  <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Image</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {viewproduct_display}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProduct
