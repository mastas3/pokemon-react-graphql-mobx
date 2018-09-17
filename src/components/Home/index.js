import React from 'react';

import { Layout } from 'antd';
import Pokemons from '../Pokemons';
import 'antd/dist/antd.css';
import './style.css';

const { Content } = Layout;

const Home = () => (
    <Content>
        <Pokemons />
    </Content>
);
 
export default Home;