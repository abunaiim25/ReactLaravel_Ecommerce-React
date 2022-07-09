import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../PUBLIC_URL';
import Skeleton from 'react-loading-skeleton'//loading
import 'react-loading-skeleton/dist/skeleton.css'//loading
import SkeletonViewProduct from '../../loading/frontend/SkeletonViewProduct/SkeletonViewProduct';
import SkeletonCategory from '../../loading/frontend/SkeletonCategory';


const ViewProduct = (props) => {
    document.title = "Product List";

    const history = useHistory();
    const [loading, setLoading] = useState(true);//loading
    const [productList, setProduct] = useState([]);
    const [categoryList, setCategory] = useState([]);

    const productCount = productList.length;//productCount
    

    //===========View Get Data =====================
    useEffect(() => {
        let isMounted = true;

        const product_slug = props.match.params.slug;
        axios.get(`/api/fetchproduct/${product_slug}`).then(res => {//slug
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
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
    }, [props.match.params.slug, history]);




    if (loading) {
        { loading && <p>Loading...</p> }//loading
    }
    else {
        var display_product = '';
        if(productCount)
        {
            display_product = productList.map((item, idx) => {
                return (
                    <div className="col-md-3" key={idx}>
                        <div className="card">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`${PUBLIC_URL}/${item.image}`} className="w-100" alt={item.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        else{//productCount
            display_product =
            <div className="col-md-12">
                <h4>No Product Available for {categoryList.name}</h4>
            </div>
        }
    }




    return (
        <>
            <div className="">
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h6>Collections / {categoryList.name || <SkeletonCategory />}</h6>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            {display_product || <SkeletonViewProduct  />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProduct
