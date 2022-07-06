import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <nav className="sb-sidenav accordion sb-sidenav-dark " id="sidenavAccordion">
                <div className="sb-sidenav-menu" >
                    <div className="nav">

                        <div className="sb-sidenav-menu-heading">Core</div>
                        <Link className="nav-link" to="/admin/dashboard">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-gauge-high"></i></div>
                            Dashboard
                        </Link>

                        {/**=========Group============ */}
                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="false" aria-controls="category">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-align-left"></i></div>
                            Category
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="category" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/add-category">Add Category</Link>

                                <Link className="nav-link" to="/admin/view-category">View Category</Link>
                            </nav>
                        </div>
                        {/**=========Group============ */}


                        {/**=========Group============ */}
                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#product" aria-expanded="false" aria-controls="product">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-align-left"></i></div>
                            Product
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="product" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/add-product">Add Product</Link>

                                <Link className="nav-link" to="/admin/view-product">View Product</Link>
                            </nav>
                        </div>
                        {/**=========Group============ */}


                        <Link className="nav-link" to="/admin/profile">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Profile
                        </Link>

                        <div className="sb-sidenav-menu-heading">Interface</div>

                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Pages
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                    Authentication
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>
                                <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link className="nav-link" to="login.html">Login</Link>
                                        <Link className="nav-link" to="register.html">Register</Link>
                                        <Link className="nav-link" to="password.html">Forgot Password</Link>
                                    </nav>
                                </div>
                                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                    Error
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>
                                <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link className="nav-link" to="401.html">401 Page</Link>
                                        <Link className="nav-link" to="404.html">404 Page</Link>
                                        <Link className="nav-link" to="500.html">500 Page</Link>
                                    </nav>
                                </div>
                            </nav>
                        </div>
                        <div className="sb-sidenav-menu-heading">Addons</div>
                        <Link className="nav-link" to="charts.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            Charts
                        </Link>
                        <Link className="nav-link" to="tables.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Tables
                        </Link>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </>
    )
}

export default Sidebar
