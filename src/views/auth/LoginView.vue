<script lang="ts" setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { reactive, ref, onMounted } from 'vue';
import { required } from '@vuelidate/validators';
import Button from 'primevue/button';
import { useVuelidate } from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';

const router = useRouter();
const authStore = useAuthStore();

const state = reactive({
  username: '',
  password: ''
});

const rules = {
  username: { required },
  password: { required }
};

const submitted = ref(false);
const v$ = useVuelidate(rules, state);

const isLoading = ref(false);
const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;
  if (!isFormValid) {
    return;
  }

  isLoading.value = true;
  try {
    await authStore.login(state.username, state.password);
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (authStore.getIsLoggedIn()) {
    await router.push('/');
  }
});
</script>

<template>
  <FloatingConfigurator />
  <Toast />
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
          style="border-radius: 53px"
        >
          <div class="flex justify-center items-center mb-8">
            <div class="text-center">
              <div class="text-5xl font-semibold">
                Smart School ITB
              </div>
              <span class="text-muted-color font-medium"> Войдите чтобы продолжить </span>
            </div>
          </div>

          <form @submit.prevent="handleSubmit(!v$.$invalid)">
            <label
              for="iin"
              class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
              >Админ</label
            >
            <InputText
              id="iin"
              class="w-full md:w-[30rem] mb-8"
              :invalid="v$.username.$invalid && submitted"
              v-model="v$.username.$model"
            />

            <label
              for="password1"
              class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
              >Пароль</label
            >
            <Password
              id="password1"
              :invalid="v$.password.$invalid && submitted"
              v-model="v$.password.$model"
              placeholder="Password"
              :toggleMask="true"
              class="mb-4"
              fluid
              :feedback="false"
            ></Password>

            <Button class="w-full" type="submit" label="Войти" :loading="isLoading"></Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
