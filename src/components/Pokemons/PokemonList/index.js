import React, { Fragment } from 'react';
import PokemonItem from '../PokemonItem';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Slider, Modal, AutoComplete } from 'antd';
import { withHandlers } from 'recompose';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './style.css';

const { Option } = AutoComplete;

const GET_POKEMONS = gql`
    query($first: Int!) {
        pokemons(first: $first) {
            id
            number
            name
            types
            image
            evolutions {
                id
            }
        }
    }
`;

const state = observable({
    numberOfPokemonsToShow: 50,
    isModalVisible: false,
    chosenPokemon: null,
});

const Pokemons = observer(() => (
    <Query
        query={GET_POKEMONS}
        variables={{
            first: state.numberOfPokemonsToShow,
        }}
    >
        {({ loading, error, data }) => {
            if (loading && !data.pokemons) {
                return <Spin />
            }

            if (error) {
                return <div>Error: {error}</div>
            }

            const { pokemons } = data;

            return (
                <Fragment>
                    <PokemonList pokemons={pokemons} />
                </Fragment>
            );
        }}
    </Query>
));

const PokemonDetails = (pokemon) => (
    <div style={{
        textAlign: 'center',
    }}>
        <h4>{pokemon.name} Types:</h4>
        <ul style={{
            listStyle: 'none',
            textAlign: 'left',
        }}>
            {pokemon.types.map((type, idx) => (
                <li key={idx}>{type}</li>
            ))}
        </ul>
    </div>
);

const CustomSlider = ({ text, style, ...props }) => (
    <div style={style}>
        <h3>{text}</h3>
        <Slider {...props} />
    </div>
);

const PokemonList = withHandlers({
    handleSliderChange: props => value => {
        state.numberOfPokemonsToShow = value;
    },

    showModal: props => (pokemon) => {
        state.chosenPokemon = pokemon;
        state.isModalVisible = !state.isModalVisible;
    },

    handleOk: props => () => {
        state.isModalVisible = false;
    },

    handleCancel: props => () => {
        state.isModalVisible = false;
    },

    onSearch: props => value => {
        console.log('search', value);
    },

    onSelect: props => value => {
        console.log('select', value);
    },    
})(observer(({ pokemons, handleSliderChange, showModal, handleOk, handleCancel, onSelect, onSearch }) => (
    <div className="pokemon-list-container">
        <CustomSlider
            onChange={handleSliderChange}
            defaultValue={state.numberOfPokemonsToShow}
            text="Choose how many Pokemon's you wanna see!"
            min={0}
            max={200}
            step={50}
            style={{
                width: '50%',
            }}
        />
        <AutoComplete
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="input here"
        >
            {pokemons.map(pokemon => (
                <Option key={pokemon.name}>{pokemon.name}</Option>
            ))}
        </AutoComplete>
        <div className="pokemon-list">
            {pokemons.map(pokemon => (
                <PokemonItem
                    key={pokemon.id}
                    pokemon={pokemon}
                    showModal={showModal}
                />
            ))}
        </div>
        <Modal
            centered
            title={state.chosenPokemon ? state.chosenPokemon.name : ''}
            visible={state.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            bodyStyle={{
                display: 'flex',
                justifyContent: 'center',
            }}
            footer={
                <PokemonDetails
                    {...state.chosenPokemon}
                />
            }
        >
            <img src={state.chosenPokemon ? state.chosenPokemon.image : ''} />
        </Modal>
    </div >
)));

export default Pokemons;
