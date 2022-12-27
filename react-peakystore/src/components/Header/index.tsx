import styles from './Header.module.scss'
import logo from '../../images/logoWhiteMin.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCircleUser, faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import * as React from 'react';
import Popover from '@mui/material/Popover';
import CategoriesPopUp from './CategoriesPopUp';
import UserPopUp from './UserPopUp';
import { Link } from 'react-router-dom';


function Header() {
    //Pop Over
    const [anchorEl, setAnchorCategory] = React.useState<HTMLAnchorElement | null>(null);
    const [anchorEl2, setAnchorUser] = React.useState<HTMLAnchorElement | null>(null);


    const handleClickCategory = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorCategory(event.currentTarget);
    };
    const handleClickUser = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorCategory(null);
    };

    const handleCloseUser = () => {
        setAnchorUser(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const open2 = Boolean(anchorEl2);
    const id2 = open ? 'simple-popover' : undefined;


    return (
        <header className={styles.header}>
            <div className={styles.header_logo}>
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>

            <ul className={styles.header_nav}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Produtos</Link></li>
                <div>
                    <li className={styles.category_li}>
                        <a className={styles.category_link} onClick={handleClickCategory}>Categorias
                        <FontAwesomeIcon className={styles.angle_down_icon} icon={faAngleDown}/>
                        </a>  
                    </li>
                        <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
                            anchorOrigin={{ vertical: 25, horizontal: -300}}
                            anchorReference='anchorEl'>
                            <CategoriesPopUp />
                        </Popover>
                </div>
                <li><a href="#">Contato</a></li>
            </ul>

            <div className={styles.search_bar_and_icons}>
                <div className={styles.search_bar}>
                    <form>
                        <label htmlFor="input_search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.search_bar_icon} />
                        </label>
                        <input type="text" placeholder='Buscar produtos' id="input_search" />
                    </form>
                </div>
                <div className={styles.header_icons}>
                    <a href='#'>
                        <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
                    </a>
                    <a onClick={handleClickUser}>
                        <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
                    </a>
                    <Popover id={id2} open={open2} anchorEl={anchorEl2} onClose={handleCloseUser}
                            anchorOrigin={{ vertical: 'bottom', horizontal: -50}}
                            anchorReference='anchorEl'>
                        <UserPopUp/>
                    </Popover>
                </div>
            </div>
        </header>
    )
}

export default Header