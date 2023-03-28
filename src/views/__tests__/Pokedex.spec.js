import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@vue/test-utils'
import router from '@/router'
import Pokedex from '../Pokedex.vue'
import SimpleTypeahead from 'vue3-simple-typeahead';


describe('Pokedex', () => {
  let wrapper

  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(Pokedex, {
      global: {
        plugins: [router, SimpleTypeahead],
      }
    })
  })

  it('Pokedex renders properly', async () => {
    expect(wrapper.text()).toContain('Pokedex')
  })

  it('Pokedex typeahead exist', async () => {
    const typeahead = wrapper.find('#typeahead_id')
    expect(typeahead.text()).toContain('')
  })

  it('Pokedex list loads properly', async () => {
    const pokemons = wrapper.vm.pokemons

    expect(pokemons).toHaveLength(0)

    await wrapper.vm.getAllPokemons()
    const pokedex = (await wrapper.vm.getPokedex()).length

    expect(pokedex).toBeGreaterThanOrEqual(1)

  })

})
