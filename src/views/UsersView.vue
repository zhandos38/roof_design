<template>
  <div class="card">
    <div class="card-header">Пользователи</div>
    <DataTable
      ref="dt"
      dataKey="id"
      :value="users"
      paginator
      lazy
      :rows="8"
      :total-records="totalRecords"
      tableStyle="min-width: 50rem"
      @page="onPage"
      v-model:filters="filters"
      @filter="onFilter"
      filterDisplay="menu"
    >
      <template #header>
        <div class="flex justify-end">
          <Button icon="pi pi-plus" rounded @click="createRow" />
        </div>
      </template>
      <Column field="schoolId" header="Школа" :show-filter-match-modes="false">
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @update:model-value="filterCallback()"
            :options="schools"
            option-label="name"
            option-value="id"
          />
        </template>
        <template #body="{ data }">
          {{ data.School?.name }}
        </template>
      </Column>
      <Column field="username" header="ИИН" :show-filter-match-modes="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @update:model-value="filterCallback()" />
        </template>
      </Column>
      <Column field="name" header="Имя" :show-filter-match-modes="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" @update:model-value="filterCallback()" />
        </template>
      </Column>
      <Column field="role" header="Роль" :show-filter-match-modes="false">
        <template #body="{ data }">
          {{ roles.find((item) => item.value === data.role)?.label }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @update:model-value="filterCallback()"
            :options="roles"
            option-label="label"
            option-value="value"
            filter
          />
        </template>
      </Column>
      <Column field="notificationToken" header="Уведомление">
        <template #body="{ data }">
          {{ data.notificationToken ? 'Да' : 'Нет' }}
        </template>
      </Column>
      <Column field="status" header="Статус" :show-filter-match-modes="false">
        <template #body="{ data }">
          {{ statuses.find((item) => item.value === data.status)?.label }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @update:model-value="filterCallback()"
            :options="statuses"
            option-label="label"
            option-value="value"
            filter
          />
        </template>
      </Column>
      <Column field="action" header="#">
        <template #body="{ data }">
          <div class="flex flex-wrap gap-2">
            <Button
              type="button"
              icon="pi pi-pencil"
              text
              raised
              outlined
              rounded
              severity="info"
              :loading="isLoadingUpdate"
              @click="updateRow(data.id)"
            />
            <Button
              type="button"
              icon="pi pi-trash"
              text
              raised
              outlined
              rounded
              severity="danger"
              @click="deleteRow(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="showFormModal"
    modal
    :header="row ? 'Обновить пользователя' : 'Добавить пользователя'"
    :style="{ width: '50vw' }"
  >
    <form @submit.prevent="handleSubmit(!v$.$invalid)" autocomplete="off">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6">
          <div class="input-group">
            <label for="phone"> ИИН </label>
            <InputText
              id="phone"
              class="w-full"
              :invalid="v$.username.$invalid && submitted"
              v-model="v$.username.$model"
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="name"> Имя </label>
            <InputText
              class="w-full"
              :invalid="v$.name.$invalid && submitted"
              v-model="v$.name.$model"
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="surname"> Фамилия </label>
            <InputText
              class="w-full"
              :invalid="v$.surname.$invalid && submitted"
              v-model="v$.surname.$model"
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="phone"> Номер телефона </label>
            <InputMask
              id="phone"
              class="w-full"
              mask="+7(999) 999-99-99"
              :invalid="v$.phone.$invalid && submitted"
              v-model="v$.phone.$model"
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="name"> Пароль </label>
            <InputText
              class="w-full"
              :invalid="v$.password.$invalid && submitted"
              v-model="v$.password.$model"
              type="password"
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="name"> Роль </label>
            <Select
              class="w-full"
              :invalid="v$.role.$invalid && submitted"
              :options="roles"
              option-label="label"
              option-value="value"
              v-model="v$.role.$model"
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="cityId"> Город </label>
            <Select
              id="cityId"
              class="w-full"
              :invalid="v$.cityId.$invalid && submitted"
              :options="cities"
              option-label="name"
              option-value="id"
              v-model="v$.cityId.$model"
              @update:model-value="fetchSchools"
              filter
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="schoolId"> Школа </label>
            <Select
              id="schoolId"
              class="w-full"
              :invalid="v$.schoolId.$invalid && submitted"
              :options="schools"
              option-label="name"
              option-value="id"
              v-model="v$.schoolId.$model"
              @update:model-value="fetchGroups"
              filter
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="groupId"> Класс </label>
            <Select
              id="groupId"
              class="w-full"
              :invalid="v$.groupId.$invalid && submitted"
              :options="groups"
              option-label="name"
              option-value="id"
              v-model="v$.groupId.$model"
              filter
            />
          </div>
        </div>
        <div class="col-span-6">
          <div class="input-group">
            <label for="name"> Статус </label>
            <Select
              class="w-full"
              :invalid="v$.status.$invalid && submitted"
              :options="statuses"
              option-label="label"
              option-value="value"
              v-model="v$.status.$model"
            />
          </div>
        </div>
      </div>

      <Button class="mt-4" type="submit" label="Сохранить" severity="success" />
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import usersService from '../services/users.service';
import { type User, UserStatus, roles, statuses } from '@/types/users';
import { UserRolesEnum } from '@/types/users';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useAppToast } from '@/helpers/toast';
import { useAppConfirm } from '@/helpers/confirm';
import Select from 'primevue/select';
import type { Group } from '@/types/groups';
import groupsService from '@/services/groups.service';
import type { City } from '@/types/cities';
import type { School } from '@/types/schools';
import schoolsService from '@/services/schools.service';
import citiesService from '@/services/cities.service';

const toast = useAppToast();
const confirm = useAppConfirm();

const dt = ref<any>(null);
const totalRecords = ref(10);
const users = ref<User[]>([]);

const cities = ref<City[]>([]);
const schools = ref<School[]>([]);
const groups = ref<Group[]>([]);

onMounted(async () => {
  lazyParams.value.rows = dt.value.rows;
  await loadLazyData();

  cities.value = await citiesService.getAll().then((result) => result.data);
});

const isSchoolsLoading = ref(false);
const fetchSchools = async () => {
  if (state.value.cityId) {
    isSchoolsLoading.value = true;
    try {
      schools.value = await schoolsService
        .getAll({
          cityId: state.value.cityId
        })
        .then((result) => result.data);
    } catch (e) {
      console.error(e);
    } finally {
      isSchoolsLoading.value = false;
    }
  } else {
    schools.value = [];
  }
};

const isGroupsLoading = ref(false);
const fetchGroups = async () => {
  if (state.value.schoolId) {
    isGroupsLoading.value = true;
    try {
      groups.value = await groupsService
        .getAll({
          schoolId: state.value.schoolId
        })
        .then((result) => result.data);
    } catch (e) {
      console.error(e);
    } finally {
      isGroupsLoading.value = false;
    }
  } else {
    groups.value = [];
  }
};

const loadLazyData = async () => {
  const { data, paginator } = await usersService.getAll({
    skip: lazyParams.value.first,
    take: lazyParams.value.rows,
    groupId: filters.value.groupId.value || undefined,
    status: filters.value.status.value || undefined,
    role: filters.value.role.value || undefined,
    username: filters.value.username.value || undefined,
    name: filters.value.name.value || undefined
  });

  users.value = data;
  totalRecords.value = paginator.count;
};

const lazyParams = ref<any>({
  first: 0,
  rows: 0,
  sortField: null,
  sortOrder: null
});

async function onPage(event: any) {
  lazyParams.value = event;
  await loadLazyData();
}

// User Form
const showFormModal = ref<boolean>(false);
const row = ref<User | null>(null);

const stateDefault = {
  username: '',
  name: '',
  surname: '',
  password: '',
  phone: '',
  role: UserRolesEnum.STUDENT,
  status: UserStatus.ACTIVE,
  cityId: undefined as any,
  schoolId: undefined as any,
  groupId: undefined as any
};
const state = ref({ ...stateDefault });

const rules = computed(() => {
  const rules = {
    username: { required },
    name: { required },
    surname: { required },
    role: { required },
    password: {},
    phone: {},
    status: { required },
    cityId: {},
    schoolId: {},
    groupId: {}
  };

  if (!row.value) {
    rules.password = { required };
  }

  return rules;
});

const submitted = ref(false);
const v$ = useVuelidate(rules, state, { $autoDirty: true });

const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;
  if (!isFormValid) {
    return;
  }

  try {
    // const formData = new FormData();
    // formData.append('name', state.value.name);
    // formData.append('surname', state.value.surname);
    // formData.append('username', state.value.username);
    // formData.append('role', state.value.role);
    // formData.append('status', state.value.status);
    // if (state.value.password) {
    //   formData.append('password', state.value.password);
    // }
    // if (state.value.groupId) {
    //   formData.append('groupId', state.value.groupId);
    // }

    const params = {
      ...state.value,
      cityId: undefined
    };

    if (row.value) {
      await usersService.update(row.value.id, params);
    } else {
      await usersService.create(params);
    }

    toast.showSuccess('Успешно создано');
    await loadLazyData();
    showFormModal.value = false;
  } catch (err) {
    toast.showError('Какая-то ошибка');
  }
};

const createRow = () => {
  showFormModal.value = true;
};

const isLoadingUpdate = ref(false);
const updateRow = async (id: number) => {
  isLoadingUpdate.value = true;
  try {
    row.value = await usersService.getOne(id);

    state.value.name = row.value.name;
    state.value.surname = row.value.surname;
    state.value.username = row.value.username;
    state.value.role = row.value.role;
    state.value.phone = row.value.phone;
    state.value.status = row.value.status;
    state.value.groupId = row.value.groupId;
    state.value.password = '';

    showFormModal.value = true;
  } catch {
    toast.showError();
  } finally {
    isLoadingUpdate.value = false;
  }
};

const resetForm = () => {
  submitted.value = false;

  state.value = { ...stateDefault };
};

watch(
  () => showFormModal.value,
  (value) => {
    if (!value) {
      row.value = null;
      resetForm();
    }
  }
);

// Delete Row
function deleteRow(id: number) {
  confirm.showDelete({
    accept: async () => {
      try {
        await usersService.delete(id);
        toast.showSuccess('Запись удалена');
        loadLazyData();
      } catch {
        toast.showError();
      }
    }
  });
}

// filter
const filters = ref({
  groupId: { value: null },
  role: { value: null },
  status: { value: null },
  username: { value: null },
  name: { value: null }
});
const onFilter = () => {
  lazyParams.value.filters = filters.value;
  loadLazyData();
};
</script>
