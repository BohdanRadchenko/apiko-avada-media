import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FavoriteList from "../components/FavoriteList/FavoriteList";

const FavoritePage = () => {
    return (
        <div>
            <Header/>
            <FavoriteList/>
            <Footer/>
        </div>
    )
}

export default FavoritePage