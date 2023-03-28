import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLogged: undefined,
    users: []
  }),
  actions: {
    register(user) {
      this.users.push({ ...user, favorites: [] })
    },
    login({ email }) {
      this.userLogged = this.users.find(item => item.email == email)
    },
    logout() {
      this.userLogged = undefined
    },
    addFavorite(pokemon) {
      this.userLogged.favorites = [...this.userLogged.favorites, pokemon]
      this.updateUserList()
    },
    removeFavorite(id) {
      this.userLogged.favorites = this.userLogged.favorites.filter(item => {
        return item.id !== id
      })

      this.updateUserList()
    },
    updateUserList() {
      const index = this.getUserIndex
      this.users[index] = this.userLogged
    }
  },
  getters: {
    getFavorites() {
      return this.userLogged?.favorites ?? []
    },
    getUserIndex() {
      return this.users.findIndex(item => item.email === this.userLogged.email)
    }
  },
  persist: true
})
