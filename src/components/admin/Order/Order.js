import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { PUBLIC_URL } from '../../../PUBLIC_URL';

const Order = () => {

    document.title = "Orders";

    const [loading, setLoading] = useState(true);
    const [ordersList, setOrders] = useState([]);
  
    //===========View Data =====================
    useEffect(() => {
        let isMounted = true;

      axios.get(`/api/admin/orders`).then(res => {
        if(isMounted)
        {
            if (res.data.status === 200) {
                setOrders(res.data.orders);
                setLoading(false);
              }
        }
      });
      return () => {
        isMounted = false;
      };
    }, []);


  //onClick={(e)=>deleteProduct(e, item.id)} 
  var orders_display = "";
  if (loading) {
    return <h4>Loading Orders...</h4>
  }
  else {
    orders_display =
    ordersList.map((item) => {

        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.tracking_no}</td> {/** Join category -> category_id*/}
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>
              <Link to={`view-order/${item.id}`} className="btn btn-success btn-sm ">View</Link>
            </td>
          </tr>
        )
      })
  }



  return (
    <>
      <div className="container-fluid px-4">

        <h1 class="mt-4">Orders</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item"><Link className='link' to={'/admin/dashboard'}>Dashboard</Link></li>
          <li class="breadcrumb-item active">Orders</li>
        </ol>

        <div className="card mt-4 ">
          <div className="card-header space_between">
            <h4>Order List</h4>
           
          </div>

          <div className="card-body ">
            <div className="table-responsive">
              <table class="table table-bordered table-striped table-hover">
                <thead className=''>
                  <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Tracking No.</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders_display}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
