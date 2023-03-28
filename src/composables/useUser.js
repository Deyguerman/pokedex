import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

export const useUser = () => {

    const userStore = useUserStore();
    const { userLogged, users } = storeToRefs(userStore);


    const register = (user) => {
        if (users.value.find(item => item.email === user.email)) throw new Error('User already exist')

        userStore.register(user)

        return true
    }

    const login = (credentials) => {
        const validUser = users.value.find(item => {
            return item.email === credentials.email && item.password === credentials.password
        })

        if (!validUser) throw new Error('Email or Password invalid')

        userStore.login(credentials)
    }

    const logout = () => userStore.logout()

    const setFavorites = (pokemon) => {
        if (pokemon.favorite) userStore.addFavorite(pokemon)
        else userStore.removeFavorite(pokemon.id)
    }

    const getFavorites = () => userStore.getFavorites

    return {

        //Properties
        userLogged,

        //Methods
        register,
        login,
        logout,
        setFavorites,
        getFavorites
    }
}