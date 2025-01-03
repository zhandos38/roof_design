<template>
  <main class="w-full max-w-md mx-auto p-6">
    <div
      class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Регистрация</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            У вас есть аккаунта?
            <RouterLink class="text-blue-600 decoration-2 hover:underline font-medium" to="login">
              Войти в систему
            </RouterLink>
          </p>
        </div>

        <div class="mt-5">
          <!-- Form -->
          <form>
            <div class="grid gap-y-4">
              <!-- Form Group -->
              <div>
                <label for="name" class="block text-sm mb-2 dark:text-white">Имя</label>
                <div class="relative">
                  <Input class="w-full" name="name" type="text" placeholder="Введите имя" />
                  <div
                    class="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3"
                  >
                    <svg
                      class="h-5 w-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group -->
              <div>
                <label for="login" class="block text-sm mb-2 dark:text-white">Логин</label>
                <div class="relative">
                  <Input class="w-full" name="login" type="text" placeholder="Введите логин" />
                  <div
                    class="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3"
                  >
                    <svg
                      class="h-5 w-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group -->
              <div>
                <label for="password" class="block text-sm mb-2 dark:text-white">Пароль</label>
                <div class="relative">
                  <Input
                    class="w-full"
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                  />
                  <div
                    class="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3"
                  >
                    <svg
                      class="h-5 w-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <Button severity="info" label="Зарегистрироваться" />
            </div>
          </form>
          <!-- End Form -->
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Input from 'primevue/inputtext'
import Button from 'primevue/button'
</script>
