import React from 'react'
import classes from './MenuModal1.module.css';

import { RxCross2 } from 'react-icons/rx';

const MenuModal1 = ({ showMenu, setShowMenu }) => {
    if (!showMenu) return null;

    return (
        <>
            <div className={classes.navModalOverlay}>
                <div className={classes.navModal}>
                    <div className={classes.navModalX} onClick={() => setShowMenu(false)}>
                        <RxCross2 />
                    </div>
                    <div className={classes.navModalBody}>
                        <div className={classes.accordion}>
                            <div className={classes.accordionItem}>
                                <div className={classes.accordionHeader}>Item 1</div>
                                <div className={classes.accordionBody}>Content 1</div>
                            </div>
                            <div className={classes.accordionItem}>
                                <div className={classes.accordionHeader}>Item 2</div>
                                <div className={classes.accordionBody}>Content 2</div>
                            </div>
                            {/* Add more items if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuModal1;