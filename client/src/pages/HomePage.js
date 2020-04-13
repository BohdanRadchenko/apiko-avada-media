import React from "react";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import CardList from "../components/CardList/CardList";
import Footer from "../components/Footer/Footer";

const Home = () => {
    return (
        <div>
            <Header/>
            <Categories/>
            <CardList/>
            <Footer/>
        </div>
    )
}

export default Home
