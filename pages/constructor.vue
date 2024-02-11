<template>
    <div>
        <v-row>
            <v-col>
                <ProgramName />
                <RinkCanvas />
                <ProgramPlayer
                    v-if="isFileLoad"
                />
                <AVWaveForm />

                <ElementsDataTable />
            </v-col>
        </v-row>
    </div>
</template>

<script
    setup
    lang="ts"
>
import ElementsDataTable from '@/widgets/ElementsDataTable/ui/ElementsDataTable.vue'

definePageMeta({
    layout: 'default'
})

const isFileLoad = ref<boolean>(false)

</script>
