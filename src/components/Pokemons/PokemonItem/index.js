import React from 'react';
import './style.css';
import { Card, Icon } from 'antd';

const { Meta } = Card;

const PokemonItem = ({ pokemon, showModal }) => (
    <Card
        hoverable
        style={{ width: 240 }}
        className="pokemon-item"
        cover={<img alt={pokemon.name} src={pokemon.image}></img>}
    >
        <Meta
            title={pokemon.name}
            avatar={
                <Icon
                    type="arrows-alt"
                    theme="outlined"
                    onClick={() => showModal(pokemon)}
                    style={{
                        fontSize: 25,
                    }}
                />
            }
            description={pokemon.number}
        />
    </Card>
);

export default PokemonItem;