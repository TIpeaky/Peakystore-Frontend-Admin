import { List} from '@mui/material';
import NavItem from './NavItem';
import menuItem from './../../../menu-items';


// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const Navigation = () => {
    const navCollapse = menuItem.items.map((item) => {
        return <NavItem key={item.id} item={item} level={1} />
    });

    return (
        <List >
            {navCollapse}
        </List>
    );
};

export default Navigation;
