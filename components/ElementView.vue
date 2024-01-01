<template>
    <v-btn
        type="button"
        class="element"
        @click="onElementClick"
    >
        {{ props.element.name }}
        <v-tooltip
            activator="parent"
            location="end"
        >
            {{ element.title }}
        </v-tooltip>

        <v-dialog
            v-model="addDialog"
            width="auto"
            :absolute="true"
        >
            <v-card>
                <v-card-title>Выберите сложность элемента и время выполнения</v-card-title>

                <v-card-text>
                    <v-form>
                        <v-radio-group
                            v-model="elementData.lvlName"
                            :inline="true"
                        >
                            <v-radio
                                v-for="lvlkey in difficultLvlKeys"
                                :key="lvlkey"
                                :label="lvlkey"
                                :value="lvlkey"
                            />
                        </v-radio-group>

                        <div class="d-flex mb-3">
                            <label
                                for="startTime"
                                class="mr-3"
                            >
                                Время начала
                            </label>

                            <MinuteWithSecondInput
                                @input="onStartTimeInput"
                            />

                            <label
                                for="endTime"
                                class="mr-3"
                            >
                                Время конца
                            </label>

                            <MinuteWithSecondInput
                                @input="onEndTimeInput"
                            />
                        </div>

                        <v-btn
                            type="button"
                            class="mr-3"
                            @click="onAdd"
                        >
                            Добавить
                        </v-btn>

                        <v-btn
                            type="button"
                            @click="closeDialog"
                        >
                            Отменить
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
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
    </v-btn>
</template>

<script
    setup
    lang="ts"
>
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { getSecondFromMinuteAndSeconds } from '@/utils/audio'
import type { ElementView, ElementTableView } from '@/interfaces'

interface Props {
    element: ElementView | ElementTableView;
}

interface ElementData {
    startTime: string;
    endTime: string;
    lvlName: string;
}

const props = defineProps<Props>()

const elements = useTableElements()
const audio = useAudioMetaData()

const addDialog = ref<boolean>(false)
const noAudioDialog = ref<boolean>(false)
const difficultLvlKeys = ref<string[]>(Object.keys(props.element.difficultLvls))

const elementData = reactive<ElementData>({
    startTime: '',
    endTime: '',
    lvlName: ''
})

const rules = computed(() => {
    return {
        lvlName: {
            required: helpers.withMessage('Выберите сложность элемента', required)
        },
        startTime: {
            required: helpers.withMessage('Введите время начала выполнения элемента', required)
        },
        endTime: {
            required: helpers.withMessage('Выберите время окончания выполнения элемента', required)
        }
    }
})

const v$ = useVuelidate(rules, elementData)

const onElementClick = () => {
    if (audio.value.audioUrl) {
        addDialog.value = true
    } else {
        noAudioDialog.value = true
    }
}

const closeDialog = () => {
    addDialog.value = false
}

const onStartTimeInput = (time: string) => {
    elementData.startTime = time
}

const onEndTimeInput = (time: string) => {
    elementData.endTime = time
}

const onAdd = () => {
    v$.value.$validate()
    if (!v$.value.$error) {
        const tableElement: ElementTableView = Object.assign(props.element, {
            fullname: `${elementData.lvlName}${props.element.name}`,
            lvlName: elementData.lvlName,
            timeExecute: `${elementData.startTime}-${elementData.endTime}`,
            isInIce: false,
            startTime: getSecondFromMinuteAndSeconds(elementData.startTime),
            endTime: getSecondFromMinuteAndSeconds(elementData.endTime)
        })

        // WARNING: Нужно быть уверенным, что элементы отфильтрованы по времени startTime,
        // т.к. это важно для работы плеера
        addDialog.value = false
        console.log('added tableElement: ', tableElement)
        elements.value.push(tableElement)
    }
}

</script>

<style scoped>
.element {
    text-transform: none;
}
</style>
