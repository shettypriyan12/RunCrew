import React, { useEffect } from 'react'
import c from './Contact.module.css';
import Title1 from '../../Components/Titles/Title1/Title1';
import ContactForm2 from './Form/ContactForm2';

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className={c.contacts}>
                <Title1 page="contacts" />
                <div className={c.map}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d79476.21820330285!2d-0.11663735827067934!3d51.501623605467955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDMwJzEyLjAiTiAwwrAwNycxMC40Ilc!5e0!3m2!1sen!2sin!4v1750094273497!5m2!1sen!2sin" width="100%" height="100%" style={{ border: "0", }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <ContactForm2/>
            </div>
        </>
    )
}

export default Contact;