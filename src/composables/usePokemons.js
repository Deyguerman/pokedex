import { storeToRefs } from 'pinia';
import pokemonApi from '../apis/pokemonApi'


import { usePokemonStore } from '../stores/pokemonStore';

import { useUserStore } from '../stores/userStore'


export const usePokemons = () => {

    const pokemonStore = usePokemonStore();
    const { pokemonList, pokemon } = storeToRefs(pokemonStore);

    const { getFavorites } = useUserStore()

    const verifyFavorites = () => {
        const favorites = getFavorites

        pokemonList.value.forEach(item => {
            const isFavorite = favorites.find(elem => elem.id === item.id) ? true :  false
            item.favorite = isFavorite
        })

        pokemonStore.loadPokemons(pokemonList.value)

    }

    const getAllPokemons = async () => {
        if (pokemonList.value.length) {
            return verifyFavorites()
        }

        const pokemons = await pokemonApi.get('pokemon', {
            params: {
                limit: 1008,
                offset: 0
            }
        })

        pokemonStore.loadPokemons(pokemons.results.map((item, index) => {
            const id = index + 1

            return {
                ...item,
                id,
                favorite: false,
                thumbnailImg: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            }
        }))
    }

    const setFilteredPokemons = (pokemons) => {
        pokemonStore.setFilteredPokemons(pokemons)
    }

    const getPokedex = () => {
        return pokemonStore.getPokedex
    }

    const getEvolutions = (chain, evolutions = []) => {
        if (!chain) return evolutions
        const id = chain.species.url.split("/").at(-2)
        evolutions.push({
            name: chain.species.name,
            id,
            thumbnailImg: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        });

        if (chain.evolves_to.length) {
            return getEvolutions(chain.evolves_to[0], evolutions);
        }

        return evolutions;
    };

    const getWeaknesses = async (types) => {
        let weaknesses = {};
        for (const item of types) {
            const type_data = (await pokemonApi.get(item.type.url, {
                baseURL: ''
            }))

            const weaknesses_data = {
                double: type_data.damage_relations.double_damage_from,
                half: type_data.damage_relations.half_damage_from,
                zero: type_data.damage_relations.no_damage_from
            }


            Object.entries(weaknesses_data).forEach(([key, value]) => {
                switch (key) {
                    case ('double'):
                        value.forEach(i => { weaknesses[i.name] ? weaknesses[i.name] *= 2 : weaknesses[i.name] = 2 });
                        break;
                    case ('half'):
                        value.forEach(i => { weaknesses[i.name] ? weaknesses[i.name] *= .5 : weaknesses[i.name] = .5 });
                        break;
                    case ('zero'):
                        value.forEach(i => { weaknesses[i.name] = 0 });
                        break;
                }
            });
        }

        return Object.keys(weaknesses).filter(item => {
            if (weaknesses[item] > 1) return true
        })
    }

    const getGender = (genderRate) => {
        if (genderRate === 0) return 'Male'
        if (genderRate === 8) return 'Female'
        if (genderRate < 0) return 'Genderless'

        return 'Male / Female'
    }

    const getPokemon = async (id) => {
        const pokemonDetail = await pokemonApi.get(`pokemon/${id}`)
        const pokemonSpecie = await pokemonApi.get(`pokemon-species/${id}`)

        let evolutions
        const weaknesses = await getWeaknesses(pokemonDetail.types)
        const stats = pokemonDetail.stats.map(item => {
            return {
                name: item.stat.name.replace('-', ' '),
                value: item.base_stat
            }
        })


        if (pokemonSpecie?.evolution_chain?.url) {
            evolutions = await pokemonApi.get(pokemonSpecie?.evolution_chain.url, {
                baseURL: ''
            })
        }

        const pokemon = {
            picture: pokemonDetail.sprites.other["official-artwork"].front_default,
            name: pokemonDetail.name,
            height: pokemonDetail.height / 10,
            weight: pokemonDetail.weight / 10,
            types: pokemonDetail.types.map(item => item.type.name),
            abilities: pokemonDetail.abilities,
            evolutions: getEvolutions(evolutions.chain),
            stats,
            weaknesses,
            gender: getGender(pokemonSpecie.gender_rate)
        }

        pokemonStore.setPokemon(pokemon)
    }

    return {
        //! Properties
        pokemonList,
        pokemon,
        //! Metodos
        getAllPokemons,
        getPokedex,
        setFilteredPokemons,
        getPokemon
    }

}