import React from 'react';
import { Container } from 'react-bootstrap';
import classes from './Brand.module.css';


const Brand = () => {
    return (
        <>
            <section className={classes.logos}>
                <Container fluid="md" className={classes.logoall}>
                    <div className={classes.lleft}>
                        <h1>We work with</h1>
                        <h1>the best brands</h1>
                    </div>
                    <div className={classes.lright}>
                        <div>
                            <img src="/images/HomePage/client-01-copyright.png" alt="mizuno" />
                        </div>
                        <div>
                            <img src="/images/HomePage/client-02-copyright.png" alt="asics" />
                        </div>
                        <div>
                            <img src="/images/HomePage/client-03-copyright.png" alt="adidas" />
                        </div>
                        <div>
                            <img src="/images/HomePage/client-04-copyright.png" alt="puma" />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Brand;