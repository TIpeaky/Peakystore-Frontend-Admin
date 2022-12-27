import { useTheme } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import Navigation from './Navigation';
import { useMemo } from 'react';
import logo from '../../images/logoWhiteMin.png'

export interface SidebarProps {
    drawerOpen: boolean;
    drawerToggle: any;
    window?: any;
};

function Sidebar ({ drawerOpen, drawerToggle, window }: SidebarProps) {
    const theme = useTheme();

    const navigation = useMemo(() => <Navigation />, []);

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box >
                    <img src={logo} alt="logo" />
                </Box>
            </Box>
        <Box component="nav"
                    sx={{ 
                        flexShrink: { md: 0 }, 
                        width: 260
                    }} 
                    aria-label="mailbox folders">
            <Drawer
                container={container}
                variant= 'persistent'
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        marginTop: 8,
                        width: 260,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawerOpen && navigation}
            </Drawer>
        </Box>
        </>
    );
};

export default Sidebar;
