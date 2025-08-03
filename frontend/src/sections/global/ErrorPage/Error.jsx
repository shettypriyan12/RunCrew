import React from 'react'
import c from './Error.module.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <section className={c.errorPage} >
                <div className={c.errors}>
                    <h1>404</h1>
                    <h2>OOPS...</h2>
                    <p>We're sorry, but <br/> something went wrong</p>

                    <button className={c.redirect}>
                        <Link to={`/`}>homepage</Link>
                    </button>
                </div>
            </section>
        </>
    )
}

export default Error;