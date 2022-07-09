import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewCategory = () => {
    document.title = "Collections";

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategory] = useState([]);

    //===========View Data =====================
    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/get-category`).then(res => {
           if(isMounted)
           {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setLoading(false);
            }
           }
        });
        return () => (
            isMounted = false
        )
    }, []);


    if (loading) {
        return <h4>Loading Category...</h4>
    }
    else {
        var display_category = '';
        display_category = categoryList.map((item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <Link to={`collections/${item.slug}`}>
                            <img src="" className="w-100" alt={item.name} />
                        </Link>
                        <div className="card-body">
                            <Link to={`collections/${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    

    return (
        <>
            <div className="">
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h6>Category</h6>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            {display_category}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewCategory
