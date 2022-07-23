import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { PUBLIC_URL } from '../../../PUBLIC_URL';


const ProductDetails = (props) => {

    document.title = "Product Details";

    const history = useHistory();
    const [loading, setLoading] = useState(true);//loading
    const [productList, setProduct] = useState([]);
    const [quentity, setQuentity] = useState(1);//quentity


    //===========View Get Data =====================
    useEffect(() => {
        let isMounted = true;

        const category_slug = props.match.params.category;//coming FrontendRouteList
        const product_slug = props.match.params.product;//coming FrontendRouteList
        axios.get(`/api/view-productdeatils/${category_slug}/${product_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                    setLoading(false);//loading
                }
                else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "");
                }
                else if (res.data.status === 404) {
                    history.push('/collections')
                    swal("Warning", res.data.message, "warning");
                }
            }
        });
        return () => (
            isMounted = false
        )
    }, [props.match.params.category, props.match.params.product, history]);


    //quantity
    const handleDecrement = () => {
        if (quentity > 1) {
            setQuentity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if (quentity < 10) {
            setQuentity(prevCount => prevCount + 1);
        }
    }

    //AddToCart
    const submitAddToCart = (e) => {
        e.preventDefault();

        const data = {
            product_id: productList.id,
            product_qty: quentity,
        }
        //post
        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {//Added to Cart Successfully
                swal("Success", res.data.message, "success");
                //history.push('');
            }
            else if (res.data.status === 409) {// Already Added to Cart
                swal("Success", res.data.message, "success");
            }
            else if (res.data.status === 401) {//Login to Add to Cart
                swal("Warning", res.data.message, "warning");
            }
            else if (res.data.status === 404) {//Product Not Found
                swal("Warning", res.data.message, "warning");
            }
        });
    }



    if (loading) {
        return <h4>Loading Product Details...</h4>
    }
    else {
        var available_stock = '';
        if (productList.quantity > 0) {
            available_stock =
                <div>
                    <label className='btn-sm btn-success px-4 mt-2'>In Stock</label>

                    <div className="row">
                        <div className="col-md-3 mt-3">
                            <div className="input-group">
                                <button type='button' onClick={handleDecrement} className='input-group-text'>-</button>
                                <div type="text" className='form-control text-center' >{quentity}</div>
                                <button type='button' onClick={handleIncrement} className='input-group-text'>+</button>
                            </div>
                        </div>

                        <div className="col-md-3 mt-3">
                            <button type='button' onClick={submitAddToCart} className='btn btn-primary w-100'>Add to Cart</button>
                        </div>
                    </div>
                </div>
        }
        else {
            available_stock =
                <div>
                    <label className='btn-sm btn-danger px-4 mt-2'>Out of Stock</label>
                </div>
        }
    }

    return (
        <>
            <div className="">
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h6>Collections / {productList.category.name} / {productList.name}</h6>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-4 border-end">
                                <img src={`${PUBLIC_URL}/${productList.image}`} alt={productList.name} className='w-100' />
                            </div>

                            <div className="col-md-8">
                                <h4>
                                    {productList.name}
                                    <span className='float-end badge btn-sm btn-danger badge-pil'>{productList.brand}</span>
                                </h4>

                                <p>{productList.description}</p>
                                <h4 className="mb-1">
                                    Rs: {productList.selling_price}
                                    <s className="ms-2">Rs: {productList.orginal_price}</s>
                                </h4>

                                <div>{available_stock}</div>

                                <button type='button' className='btn btn-danger mt-3'>Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
