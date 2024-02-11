<template>
    <div>
        <AddElementButton
            @on-add-element-click="openAddDialog"
        />

        <ElementsTable />

        <v-dialog
            v-model="addDialog"
            width="auto"
            class="addition_dialog"
            :absolute="true"
        >
            <AddElementsCard
                @close-dialog="closeAddDialog"
            />
        </v-dialog>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { ref } from 'vue'
import AddElementsCard from '@/widgets/AddElementCard/ui/AddElementCard'
import AddElementButton from '@/features/AddElement/ui/AddElementButton'
import ElementsTable from '@/widgets/ElementsDataTable/ui/ElementsTable'

const addDialog = ref(false)

const openAddDialog = () => {
    addDialog.value = true
}

const closeAddDialog = () => {
    addDialog.value = false
}

</script>

<style scoped>
.addition_dialog {
    max-height: 250px;
    overflow-y: hidden;
}
</style>
