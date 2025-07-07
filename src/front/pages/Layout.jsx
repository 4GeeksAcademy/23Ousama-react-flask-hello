import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop.jsx";

import { Home } from "./Home.jsx";
import { Demo } from "./Demo.jsx";
import { Single } from "./Single.jsx";

import { Login } from "./Login.jsx";
import { Signup } from "./Signup.jsx";
import { Private } from "./Private.jsx";

import { PrivateRoute } from "../components/PrivateRoute.jsx";

import injectContext from "../hooks/useGlobalReducer.jsx";

import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/single/:theid" element={<Single />} />

                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />

                        <Route
                            path="/private"
                            element={
                                <PrivateRoute>
                                    <Private />
                                </PrivateRoute>
                            }
                        />

                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);