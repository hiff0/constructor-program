<template>
  <div>
    <v-row>
      <v-col>
        <div style="margin: auto; max-width: 300px;">
          <v-text-field
            v-model="programName"
            placeholder="Название программы"
          />
        </div>
        <ElementsScheme />
        <AVWaveForm />

        <ElementsDataTable />
        <div
          class="d-flex justify-end position-sticky mt-2 constructor-save-btn"
        >
          <SaveTrainigButton />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script
    setup
    lang="ts"
>
import ElementsDataTable from '@widgets/ElementsDataTable/ui/ConstructorElementsDataTable.vue'
import ElementsScheme from '@widgets/ElementsScheme/ui/ElementsScheme.vue'
import SaveTrainigButton from '@features/SaveTraining/SaveTrainigButton.vue'

definePageMeta({
  layout: 'default'
})

const programName = useProgramName()

</script>

<style scoped>
.constructor-save-btn {
  bottom: 12px;
}
</style>
