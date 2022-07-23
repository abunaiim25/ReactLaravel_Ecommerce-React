import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


const Checkout = () => {

    document.title = "Checkout";
    const history = useHistory();
    var total_cart_price = 0; //total_cart_price (3)

    const [loading, setLoading] = useState(true);//loading
    const [cartList, setCart] = useState(true);
    const [errors, setErrors] = useState([]);
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    //===================Paypal Code===================public\index.html
    //Standard payments with JavaScript frameworks
    {/** 
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "0.01",
                    },
                },
            ],
        });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture();
    };
*/}

    //=====================Post Data on DB=====================
    const submitOrder = (e, payment_mode) => {
        e.preventDefault();

        const data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id: '',
        }
        //Payment post
        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/place-order`, data).then(res => {
                    if (res.data.status === 200) {
                        swal("Order Placed Successfully", res.data.message, "success");
                        setErrors([]);
                        history.push('thank-you');
                    }
                    else if (res.data.status === 422) {//422=>input field error
                        swal("All Fields Are Mandetory", "", "error");
                        setErrors(res.data.errors);
                    }
                });
                break;

            case 'payonline':
                axios.post(`/api/validate-order`, data).then(res => {
                    if (res.data.status === 200) {
                        setErrors([]);
                        var myModal = window.bootstrap?.Modal(document.getElementById('payOnlineModal'));
                        myModal?.show();
                        /*
                        var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
                        myModal.show();
                        */
                    }
                    else if (res.data.status === 422) {//422=>input field error
                        swal("All Fields Are Mandetory", "", "error");
                        setErrors(res.data.errors);
                    }
                });
                break;

            default:
                break;

        }
    }

    //=============login or ont login===============
    if (localStorage.getItem('auth_tokan')) {
        history.push('/');
        swal("Warning", "Login to goto Cart Page", "warning")
    }


    //===========View Get Data =====================
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);//loading
                }
                else if (res.data.status === 401) {//unauthorize
                    history.push('/')
                    swal("Oops!", res.data.message, "warning");
                }
            }
        });
        return () => (
            isMounted = false
        )
    }, [history]);


    //loading
    if (loading) {
        return <h4>Loading Checkout...</h4>
    }
    else {
        var checkout_table = '';
        if (cartList.length > 0) {
            checkout_table =
                <div>
                    <div className="row">

                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Basic Information</h4>
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>First Name</label>
                                                <input type="text" name='firstname' onChange={handleInput} value={checkoutInput.firstname} className='form-control' />
                                                <small className='text-danger'>{errors.firstname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Last Name</label>
                                                <input type="text" name='lastname' onChange={handleInput} value={checkoutInput.lastname} className='form-control' />
                                                <small className='text-danger'>{errors.lastname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Phone Nubmer</label>
                                                <input type="text" name='phone' onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                                                <small className='text-danger'>{errors.phone}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Email Address</label>
                                                <input type="text" name='email' onChange={handleInput} value={checkoutInput.email} className='form-control' />
                                                <small className='text-danger'>{errors.email}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label>Full Address</label>
                                                <textarea name="address" rows="3" onChange={handleInput} value={checkoutInput.address} className='form-control'></textarea>
                                                <small className='text-danger'>{errors.address}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>City</label>
                                                <input type="text" name='city' onChange={handleInput} value={checkoutInput.city} className='form-control' />
                                                <small className='text-danger'>{errors.city}</small>
                                            </div>

                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>State</label>
                                                <input type="text" name='state' onChange={handleInput} value={checkoutInput.state} className='form-control' />
                                                <small className='text-danger'>{errors.state}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Zip Code</label>
                                                <input type="text" name='zipcode' onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                                                <small className='text-danger'>{errors.zipcode}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-end">
                                                <button type='button' onClick={ (e) => submitOrder(e, 'cod') } className='btn btn-primary mx-1'>Place Order</button>
                                                <button type='button' onClick={ (e) => submitOrder(e, 'payonline') }  className='btn btn-warning mx-1'>Pay Online</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width="50%">Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.map((item, idx) => {
                                        //total_cart_price (3)
                                        total_cart_price += item.product.selling_price * item.product_qty;

                                        return (
                                            <tr key={idx}>
                                                <td>{item.product.name}</td>
                                                <td>{item.product.selling_price}</td>
                                                <td>{item.product_qty}</td>
                                                <td>{item.product.selling_price * item.product_qty}</td>
                                            </tr>
                                        )
                                    })}

                                    <tr>
                                        <td colSpan="2" className='text-end fw-bold'>Grand Total:</td>
                                        <td colSpan="2" className='text-end fw-bold'>{total_cart_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
        } else {
            checkout_table =
                <div className="card card-body py-5 text-center shadow-sm">
                    <h4>Your Shopping Cart is Empty. You are in Checkout Page</h4>
                </div>
        }
    }




    return (
        <>
            {/** Modal */}

            <div className="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="payOnlineModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="payOnlineModalLabel">Online payment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <hr />
                            {/** 
                            <PayPalButton
                                createOrder={(data, actions) => this.createOrder(data, actions)}
                                onApprove={(data, actions) => this.onApprove(data, actions)}
                            />
                            */}
                        </div>
                    </div>
                </div>
            </div>



            {/** Content */}
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Checkout</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    {checkout_table}
                </div>
            </div>
        </>
    )
}

export default Checkout
