<template>
  <v-text-field
    v-model="time"
    label="Время (ММ:СС)"
    :rules="timeRules"
    placeholder="ММ:СС"
    class="minute-with-second-input"
    @input="formatTime"
  />
</template>

<script
    setup
    lang="ts"
>

interface Props {
    value?: string;
}

const props = defineProps<Props>()

const emits = defineEmits(['input'])

const time = ref<string>(props.value || '')

// Правила валидации
const timeRules = computed(() => [
  v => !!v || 'Поле обязательно для заполнения',
  v => /^\d{2}:\d{2}$/.test(v) || 'Введите время в формате ММ:СС'
])

// Метод для форматирования ввода
const formatTime = () => {
  // Удаляем все символы, кроме цифр
  let cleaned = time.value.replace(/\D/g, '')

  // Ограничиваем длину ввода до 4 символов
  if (cleaned.length > 4) {
    cleaned = cleaned.slice(0, 4)
  }

  // Добавляем двоеточие после первых двух символов
  if (cleaned.length > 2) {
    cleaned = cleaned.slice(0, 2) + ':' + cleaned.slice(2)
  }

  // Обновляем значение поля
  time.value = cleaned
  emits('input', time.value)
}

</script>

<style scoped>
.minute-with-second-input {
  width: 100%;
}
</style>
