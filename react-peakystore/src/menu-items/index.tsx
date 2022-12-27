import {CreditCardOutlined,
    BarChartOutlined,
    UserOutlined,
    TeamOutlined,
    TagsOutlined,
    ShoppingCartOutlined } from '@ant-design/icons';

    //<HomeOutlined /> <ShoppingCartOutlined /> <ShoppingOutlined /> <SettingOutlined /> <TeamOutlined /> <UsergroupAddOutlined />
    // <WalletOutlined /> <UserOutlined /> <TagsOutlined />

const icons = {
    CreditCardOutlined,
    BarChartOutlined,
    UserOutlined,
    TeamOutlined,
    TagsOutlined,
    ShoppingCartOutlined
};

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            url: '/dashboard',
            icon: icons.BarChartOutlined,
            breadcrumbs: false
        },
        {
            id: 'Pagamentos',
            title: 'Pagamentos',
            url: '/pagamentos',
            icon: icons.CreditCardOutlined,
            breadcrumbs: false
        },
        {
            id: 'Clientes',
            title: 'Clientes',
            url: '/clientes',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'Produtos',
            title: 'Produtos',
            url: '/admin/products',
            icon: icons.ShoppingCartOutlined,
            breadcrumbs: false
        },
        {
            id: 'Cupons',
            title: 'Cupons',
            url: '/cupons',
            icon: icons.TagsOutlined,
            breadcrumbs: false
        },
        {
            id: 'Funcionarios',
            title: 'Funcionarios',
            url: '/funcionarios',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        }
    ]
};

export default menuItems;
