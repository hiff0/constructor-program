<template>
  <div>
    Выберите тренировку
    <template
      v-if="!currentProgram"
    >
      <div class="d-flex flex-column">
        <v-btn
          v-for="program in programs"
          :key="program.programName"
        >
          {{ program.programName }}
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script
    lang="ts"
    setup
>
import type { Program } from '@interfaces';

definePageMeta({
  layout: 'default'
})

const programs = usePrograms()
const currentProgram = ref<null | Program>(null)
</script>
