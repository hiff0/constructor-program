<template>
    <v-card>
        <v-tabs
            v-model="tab"
            bg-color="primary"
        >
            <v-tab value="jump">
                Прыжки
            </v-tab>
            <v-tab value="spin">
                Вращения
            </v-tab>
            <v-tab value="track">
                Дорожки
            </v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="jump">
                    <ElementsGrid
                        :elements="jumps"
                    />
                </v-window-item>

                <v-window-item value="spin">
                    <ElementsGrid
                        :elements="spins"
                    />
                </v-window-item>

                <v-window-item value="track">
                    <ElementsGrid
                        :elements="tracks"
                    />
                </v-window-item>
            </v-window>

            <v-form>
                <v-radio-group
                    v-model="elementData.lvlName"
                    :inline="true"
                >
                    <v-radio
                        v-for="lvlkey in difficultLvlKeys"
                        :key="lvlkey?.baseCost"
                        :label="`${lvlkey?.baseCost}`"
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
</template>

<script
    lang="ts"
    setup
>
import deepClone from 'deep-clone'
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { getSecondFromMinuteAndSeconds } from '@/shared/utils/audio'
import type { ElementTableView } from '@/interfaces'

interface ElementData {
    startTime: string;
    endTime: string;
    lvlName: string;
}

const emits = defineEmits(['closeDialog', 'addElement'])

const tab = ref<string | null>(null)

const jumps = useJumps()
const spins = useSpins()
const tracks = useTracks()

const elements = useTableElements()

const selectedElement = ref<ElementTableView | null>(null)
const difficultLvlKeys = computed(() => selectedElement.value?.difficultLvls)

const elementData = reactive<ElementData>({
    startTime: '',
    endTime: '',
    lvlName: ''
})

const closeDialog = () => {
    emits('closeDialog')
}

const onStartTimeInput = (time: string) => {
    elementData.startTime = time
}

const onEndTimeInput = (time: string) => {
    elementData.endTime = time
}

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

const onAdd = () => {
    v$.value.$validate()
    if (!v$.value.$error && selectedElement.value) {
        const cloneElement = deepClone(selectedElement.value)
        const tableElement: ElementTableView = Object.assign(cloneElement, {
            key: `${selectedElement.value.key}${elements.value.length}`,
            fullname: `${elementData.lvlName}${selectedElement.value.name}`,
            lvlName: elementData.lvlName,
            timeExecute: `${elementData.startTime}-${elementData.endTime}`,
            isInIce: false,
            startTime: getSecondFromMinuteAndSeconds(elementData.startTime),
            endTime: getSecondFromMinuteAndSeconds(elementData.endTime)
        })

        // WARNING: Нужно быть уверенным, что элементы отфильтрованы по времени startTime,
        // т.к. это важно для работы плеера
        console.log('added tableElement: ', tableElement)
        elements.value.push(tableElement)
        elements.value = elements.value.sort((a, b) => a.startTime - b.startTime)
        emits('addElement')
    }
}

</script>
