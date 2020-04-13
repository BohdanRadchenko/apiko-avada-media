import React from "react";
import css from './Categories.module.css'
import Select from "./Select/Select";

const Categories = () => {
    return (
        <div className={css.container}>
            <div className={css.selectWrapper}>
                <Select/>
            </div>
            <button className={css.price}>
                Price From (USD)
            </button>

            <span className={css.dash}></span>

            <button className={css.price}>
                Price to (USD)
            </button>
        </div>
    )
}

export default Categories