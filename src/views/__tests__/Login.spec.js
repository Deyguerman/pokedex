import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { shallowMount } from '@vue/test-utils'
import router from '@/router'
import Login from '../authentication/Login.vue'

describe('Login', () => {
  let wrapper

  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = shallowMount(Login, {
      global: {
        plugins: [router],
      }
    })

    await wrapper.vm.showFromHandler(true) // Show Form Login
  })

  it('Login form renders properly', async () => {
    expect(wrapper.get('h1').text()).toContain('Login')
  })

  it('Renders the inputs value', async () => {
    const emailInput = wrapper.find('#emailInput')
    expect(emailInput.text()).toContain('')

    await emailInput.setValue('test@gmail.com')
    expect(emailInput.element.value).toEqual('test@gmail.com')

    const passwordInput = wrapper.find('#passwordInput')
    expect(passwordInput.text()).toContain('')
    
    await passwordInput.setValue('12345678')
    expect(passwordInput.element.value).toEqual('12345678')
  })

  it('click the submit button', async () => {
    const form = wrapper.find('form')

    const spyOnForm = vi.spyOn(form, 'trigger')
    await form.trigger('submit')

    expect(spyOnForm).toHaveBeenCalledOnce()
  })

})
