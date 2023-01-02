import { Outlet, useNavigate } from "react-router-dom"
import NavBar from '../../components/NavBar'
import Sidebar from '../../components/SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, CssBaseline } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { openDrawer } from '../../store/reducers/menu';

export interface Customization {
    isOpen: undefined[];
    fontFamily: any;
    borderRadius: number;
    opened: boolean;
};

export interface RootState {
    customization: Customization;
    menu: any;
    name: string;
    openItem: string;
    openComponent: string;
    drawerOpen: boolean;
    componentDrawerOpen: boolean;
}

export interface MainProps {
    theme: any;
    open: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: MainProps) => ({
    ...theme.typography?.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(260 - 20),
            width: `calc(100% - 260px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - 260px)`,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - 260px)`,
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - 260px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

const PaginaBase = () => {
    const theme = useTheme();
    let navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    const { drawerOpen } = useSelector((state: RootState) => state.menu);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    useEffect(() => {
        if(!token) {
            navigate('/admin/login')
        }
      }, []);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);


    return (
    <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                bgcolor: theme.palette.background.default,
                transition: drawerOpen ? theme.transitions.create('width') : 'none'
            }}
        >
            <NavBar handleLeftDrawerToggle={handleDrawerToggle} />
        </AppBar>

        <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />

        <Main theme={theme} open={drawerOpen}>
            <Outlet />
        </Main>
    </Box>
    )
}

export default PaginaBase

