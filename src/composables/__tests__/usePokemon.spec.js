import { describe, expect, beforeEach, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePokemons } from '../usePokemons'


describe('usePokemons', () => {

  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  test('usePokemons getAllPokemons - Pokemon List', async () => {
    const { getAllPokemons, pokemonList } = usePokemons()

    expect(pokemonList.value).toMatchObject([])

    await getAllPokemons()

    expect(pokemonList.value.length).toBeGreaterThan(0)
  })

  test('usePokemons getPokemon - Pokemon Detail', async () => {
    const { getPokemon, pokemon } = usePokemons()

    expect(pokemon.value).toMatchObject({})

    await getPokemon(1)

    expect(pokemon.value).toMatchObject({ "picture": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png", "name": "bulbasaur", "height": 0.7, "weight": 6.9, "types": ["grass", "poison"], "abilities": [{ "ability": { "name": "overgrow", "url": "https://pokeapi.co/api/v2/ability/65/" }, "is_hidden": false, "slot": 1 }, { "ability": { "name": "chlorophyll", "url": "https://pokeapi.co/api/v2/ability/34/" }, "is_hidden": true, "slot": 3 }], "evolutions": [{ "name": "bulbasaur", "id": "1", "thumbnailImg": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" }, { "name": "ivysaur", "id": "2", "thumbnailImg": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" }, { "name": "venusaur", "id": "3", "thumbnailImg": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" }], "stats": [{ "name": "hp", "value": 45 }, { "name": "attack", "value": 49 }, { "name": "defense", "value": 49 }, { "name": "special attack", "value": 65 }, { "name": "special defense", "value": 65 }, { "name": "speed", "value": 45 }], "weaknesses": ["flying", "fire", "ice", "psychic"], "gender": "Male / Female" })
  })


})
