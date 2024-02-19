<template>
    <v-card flat>
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
                        :label="`${lvlkey}`"
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
            </v-form>
        </v-card-text>

        <v-card-actions>
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
        </v-card-actions>
    </v-card>
</template>

<script
    lang="ts"
    setup
>
import { computed, reactive } from 'vue'
import deepClone from 'deep-clone'
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { getSecondFromMinuteAndSeconds } from '@/shared/utils/audio'
import type { ElementTableView, Jump, Track, Spin } from '@/interfaces'
import { useTableElements } from '@/composables'

interface Props {
    selectedElement: Jump | Track | Spin;
}

interface ElementData {
    startTime: string;
    endTime: string;
    lvlName: string;
}

const props = defineProps<Props>()
const emits = defineEmits(['closeDialog', 'addElement'])

const elements = useTableElements()

const difficultLvl = computed(() => props.selectedElement.difficultLvls)
const difficultLvlKeys = computed(() => Object.keys(difficultLvl.value))

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
    if (!v$.value.$error && props.selectedElement) {
        const cloneElement = deepClone(props.selectedElement)
        const tableElement: ElementTableView = Object.assign(cloneElement, {
            key: `${props.selectedElement.key}${elements.value.length}`,
            fullname: `${elementData.lvlName}${props.selectedElement.name}`,
            lvlName: elementData.lvlName,
            timeExecute: `${elementData.startTime}-${elementData.endTime}`,
            isShow: true,
            startTime: getSecondFromMinuteAndSeconds(elementData.startTime),
            endTime: getSecondFromMinuteAndSeconds(elementData.endTime),
            x: 50,
            y: 50
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
