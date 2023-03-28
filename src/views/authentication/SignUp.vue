<template>
  <section class="bg-gray-200 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <Transition
          name="fade"
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div v-if="showForm" class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Create Account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="onSubmit()">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  v-model.trim="signUpForm.email"
                  type="email"
                  name="email"
                  id="emailInput"
                  class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  v-model.trim="signUpForm.password"
                  type="password"
                  name="password"
                  id="passwordInput"
                  placeholder="••••••••"
                  class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div v-if="v$.$errors.length">
                <div v-for="item in v$.$errors" :key="item.id" class="text-red-500">
                  {{ item.$propertyPath }}: {{ item.$message }}
                </div>
              </div>
              <div class="text-red-500" v-if="erroMessage">
                {{ erroMessage }}
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-400 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create Account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <router-link
                  to="/login"
                  class="font-medium text-blue-400 hover:underline dark:text-primary-500"
                  >Sign in</router-link
                >
              </p>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, alphaNum } from '@vuelidate/validators'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useUser } from '../../composables/useUser'

const { register } = useUser()
const router = useRouter()

const showForm = ref(false)
const erroMessage = ref('')

const signUpForm = ref({
  email: '',
  password: ''
})

const rules = {
  email: { required, email }, // Matches signUpForm.email
  password: { required, alphaNum } // Matches signUpForm.email
}

const v$ = useVuelidate(rules, signUpForm)

const showFromHandler = (show = false) => {
  showForm.value = show
}
onMounted(() => {
  setTimeout(() => {
    showFromHandler(true)
  }, 100)
})

onBeforeRouteLeave((to, from, next) => {
  showFromHandler()
  setTimeout(() => {
    next()
  }, 100)
})

const onSubmit = async () => {
  if (!(await v$.value.$validate())) return

  console.log(signUpForm.value)
  try {
    register(signUpForm.value)
    router.push({ path: `/login` })
  } catch (error) {
    erroMessage.value = error

    setTimeout(() => {
      erroMessage.value = ''
    }, 2000)
  }
}
</script>
