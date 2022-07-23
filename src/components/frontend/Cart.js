import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { PUBLIC_URL } from '../../PUBLIC_URL';
import { Link } from 'react-router-dom';


const Cart = () => {

    document.title = "Cart";

    const history = useHistory();
    const [loading, setLoading] = useState(true);//loading
    const [cartList, setCart] = useState(true);
    var total_cart_price = 0; //total_cart_price (3)

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


    //==================update quantity=========================
    const handleDecrement = (cart_id) => {
        setCart(cartList =>
            cartList.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, "dec")
    }
    const handleIncrement = (cart_id) => {
        setCart(cartList =>
            cartList.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, "inc")
    }
    //update quantity
    function updateCartQuantity(cart_id, scope) {
        axios.put(`/api/cart-update-quantity/${cart_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
                //swal("Success", res.data.message, "success");
            }
            else if (res.data.status === 401) {//unauthorize -> Login to Continue
                history.push('/')
                swal("Oops!", res.data.message, "warning");
            }
        });
    }


    //===========Delete Data By Id=====================
    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Remove";
            }
            else if (res.data.status === 401) {//unauthorize -> Login to Continue
                history.push('/')
                swal("Oops!", res.data.message, "warning");
            }
            //setLoading(false);
        });
    }




    if (loading) {
        return <h4>Loading Cart...</h4>
    }
    else {
        var cart_table = '';
        if (cartList.length > 0) {
            {
                cart_table =
                    <div>
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th className='text-center'>Image</th>
                                    <th className='text-center'>Product</th>
                                    <th className='text-center'>Price</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-center'>Total Price</th>
                                    <th className='text-center'>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((item, idx) => {
                                    //total_cart_price (3)
                                    total_cart_price += item.product.selling_price * item.product_qty;
                                    return (
                                        <tr key={idx}>
                                            <td className='text-center'><img src={`${PUBLIC_URL}/${item.product.image}`} width="50px" height="50px" alt="Product Image" /></td>
                                            <td className='text-center'>{item.product.name}</td>
                                            <td width="15%" className='text-center'>{item.product.selling_price}</td>
                                            <td width="15%">
                                                <div className="input-group">
                                                    <button onClick={() => handleDecrement(item.id)} type='button' className='input-group-text'>-</button>
                                                    <div type="text" className='form-control text-center' >{item.product_qty}</div>
                                                    <button onClick={() => handleIncrement(item.id)} type='button' className='input-group-text'>+</button>
                                                </div>
                                            </td>
                                            <td width="15%" className='text-center'>{item.product.selling_price * item.product_qty}</td>
                                            <td width="15%" className='text-center'>
                                                <button type='button' onClick={(e) => deleteCartItem(e, item.id)} className='btn btn-danger btn-sm'>Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {/** checkout */}
                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-md-4">
                                <div className="card card-body mt-3">
                                    <h4>Sub Total:
                                        <span className='float-end'>{total_cart_price}</span>{/** total_cart_price (3) */}
                                    </h4>
                                    <h4>Grand Total:
                                        <span className='float-end'>{total_cart_price}</span>
                                    </h4>
                                    <hr />
                                    <Link to="/checkout" className='btn btn-primary'>Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        } else {
            cart_table =
                <div className="card card-body py-5 text-center shadow-sm">
                    <h4>Your Shopping Cart is Empty</h4>
                </div>
        }
    }
    return (
        <>
            <div className="">
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h6>Home / Cart</h6>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {cart_table}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Cart
