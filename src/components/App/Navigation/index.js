import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

const { Item } = Menu;
const { Header } = Layout;



const Navigation = () => (
    <Header>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
        >
            <Item key ="1">
                <Link to={routes.HOME}>
                    Home
                </Link>
            </Item>
            <Item key ="2">About</Item>
            <Item key ="3">Contact</Item>
        </Menu>
    </Header>
); 

export default withRouter(Navigation);