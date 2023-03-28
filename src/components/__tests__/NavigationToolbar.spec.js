import { describe, it, expect, beforeEach, test, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@vue/test-utils'
import router from '@/router'
import NavigationToolbar from '../NavigationToolbar.vue'


describe('NavigationToolbar', () => {
  let wrapper

  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(NavigationToolbar, {
      global: {
        plugins: [router],
      }
    })
  })

  it('NavigationToolbar renders properly', async () => {
    expect(wrapper.text()).toContain('Pokedex')
    expect(wrapper.text()).toContain('Favorites')
  })

  test('NavigationToolbar click the links', async () => {
    const push = vi.spyOn(router, 'push')

    await wrapper.find('#pokedexLink').trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith('/pokedex')
    
    await wrapper.find('#favoritesLink').trigger('click')

    expect(push).toHaveBeenCalledTimes(2)
    expect(push).toHaveBeenCalledWith('/favorites')
    
    await wrapper.find('#logout').trigger('click')

    expect(push).toHaveBeenCalledTimes(3)
    expect(push).toHaveBeenCalledWith('/')
  })

  // it('Pokedex typeahead exist', async () => {
  //   const typeahead = wrapper.find('#typeahead_id')
  //   expect(typeahead.text()).toContain('')
  // })

  // it('Pokedex list loads properly', async () => {
  //   const pokemons = wrapper.vm.pokemons

  //   expect(pokemons).toHaveLength(0)

  //   await wrapper.vm.getAllPokemons()
  //   const pokedex = (await wrapper.vm.getPokedex()).length

  //   expect(pokedex).toBeGreaterThanOrEqual(1)

  // })

})
