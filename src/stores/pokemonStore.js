import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {

    state: () => ({
        pokemonList: [],
        pokemonListFiltered: [],
        favorites: [],
        pokemon: undefined
    }),
    persist: true,
    actions: {
        loadPokemons(pokemons) {
            this.pokemonList = pokemons;
        },
        setFilteredPokemons(pokemons = []) {
            this.pokemonListFiltered = pokemons
        },
        clearState() {
            this.pokemonList = [];
            this.pokedex = [];
            this.pokemon = undefined;
        },
        addFavorite(pokemon) {
            this.favorites = [...this.favorites, pokemon]
        },
        removeFavorite(id) {
            this.favorites = this.favorites.filter(item => !item.id === id)
        },
        setPokemon(pokemon) {
            this.pokemon = pokemon
        }
    },
    getters: {
        getPokedex() {
            return this.pokemonListFiltered.length ? this.pokemonListFiltered : this.pokemonList
        },
        getFavorites() {
            return this.favorites
        }
    }
})

