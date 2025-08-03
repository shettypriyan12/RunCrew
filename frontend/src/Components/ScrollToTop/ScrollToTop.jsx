import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: "fixed",
                bottom: "40px",
                right: "40px",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                backgroundColor: "#171717",
                color: "white",
                border: "none",
                cursor: "pointer",
                display: visible ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
            }}
            aria-label="Scroll to top"
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
