<template>
    <div>
        <v-row>
            <v-col>
                <ElementsScheme />
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
import ElementsScheme from '@/widgets/ElementsScheme/ui/ElementsScheme.vue'

definePageMeta({
    layout: 'default'
})

</script>
