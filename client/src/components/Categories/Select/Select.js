import React from "react";
import css from './Select.module.css'

const Select = () => {
    return (
        <div className={css.container}>
            <label
                className={css.label}
                htmlFor="select">
            <select
                name='select'
                id='select'
                className={css.select}>
                <option hidden> Choose Category </option>
                <option > Cat 1 </option>
                <option > Cat 2 </option>
            </select>
            </label>

        </div>
    )
}

export default Select