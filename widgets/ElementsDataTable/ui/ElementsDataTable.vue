<template>
    <div>
        <AddElementButton
            @on-add-element-click="openAddDialog"
        />

        <ElementsTable />

        <v-dialog
            v-model="addDialog"
            width="auto"
            height="auto"
            class="addition_dialog"
            persistent
        >
            <AddElementsCard
                @close-dialog="closeAddDialog"
            />
        </v-dialog>

        <v-dialog
            v-model="noAudioDialog"
            width="auto"
            :absolute="true"
        >
            <v-alert
                type="warning"
                text="Пожалуйста, выберите музыкальную композицию"
            >
            </v-alert>
        </v-dialog>
    </div>
</template>

<script
    setup
    lang="ts"
>
import AddElementsCard from '@/widgets/AddElementCard/ui/AddElementCard'
import AddElementButton from '@/features/AddElement/ui/AddElementButton'
import ElementsTable from '@/widgets/ElementsDataTable/ui/ElementsTable'

const addDialog = ref(false)
const noAudioDialog = ref<boolean>(false)

const audio = useAudioMetaData()

const openAddDialog = () => {
    if (audio.value.audioUrl) {
        addDialog.value = true
    } else {
        noAudioDialog.value = true
    }
}

const closeAddDialog = () => {
    addDialog.value = false
}

</script>
