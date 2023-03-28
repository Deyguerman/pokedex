import { describe, expect, beforeEach, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUser } from '../useUser'

const user = {
  email: 'test@gmail.com',
  password: '1234',
  favorites: []
}

describe('useUser', () => {

  beforeEach(async () => {
    setActivePinia(createPinia())
  })


  test('useUser register new user', async () => {
    const { register } = useUser()

    const newUser = await register({
      email: 'test@gmail.com',
      password: '1234'
    })

    expect(newUser).toBe(true)
  })

  test('useUser Register and Login', async () => {
    const { register, login, userLogged } = useUser()

    const newUser = await register(user)

    expect(newUser).toBe(true)

    await login(user)

    expect(userLogged.value).toMatchObject(user)
  })

  test('useUser set and get Favorites - Pokemon Favorite List', async () => {
    const { getFavorites, setFavorites, userLogged, login, register } = useUser()

    await register(user)
    await login(user)

    expect(userLogged.value).toMatchObject(user)

    await setFavorites({
      name: 'bulbasaur',
      id: 1,
      thumbnailImg: '',
      favorite: true
    })

    const favorites = await getFavorites()

    expect(favorites.length).toBe(1)
  })

})
