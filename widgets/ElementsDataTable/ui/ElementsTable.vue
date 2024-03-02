<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-center font-weight-bold">
                    Порядк. № элемента
                </th>
                <th class="text-center font-weight-bold">
                    Элемент
                </th>
                <th class="text-center font-weight-bold">
                    Интервал выполнения
                </th>
                <th class="text-center font-weight-bold">
                    Базовая стоимость
                </th>
                <th class="text-center font-weight-bold">
                    Оценка исполнения
                </th>
                <th class="text-center font-weight-bold">
                    Оценка за элемент
                </th>
                <th class="text-center font-weight-bold">
                    Действия
                </th>
            </tr>
        </thead>
        <tbody>
            <template
                v-if="elements.length"
            >
                <tr
                    v-for="(element, index) in elements"
                    :key="element.key"
                >
                    <td class="text-center">
                        {{ index + 1 }}
                    </td>
                    <td class="text-center">
                        {{ element.fullname }}
                    </td>
                    <td class="text-center">
                        {{ element.timeExecute }}
                    </td>
                    <td class="text-center">
                        {{ element.difficultLvls[element.lvlName as keyof (JumpsDifficultLvls | DefaultDifficultLvls)]?.baseCost }}
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td>
                        <div class="activities rounded-pill h-75 d-flex align-center px-2">
                            <v-icon icon="mdi-comment-text-outline" class="mr-3 action"></v-icon>
                            <v-icon icon="mdi-pencil-outline" class="mr-3 action"></v-icon>
                            <v-icon icon="mdi-trash-can-outline" class="action" @click="deleteElement(element)"></v-icon>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="text-end" colspan="3">
                        Базовая стоимость
                    </td>
                    <td class="text-center">
                        {{ sumBaseCost }}
                    </td>
                    <td class="text-center">
                        Итоговая оценка
                    </td>
                    <td class="text-center">
                        В разработке
                    </td>
                </tr>
            </template>

            <tr
                v-else
            >
                <td colspan="7" class="text-center">
                    Нет элементов
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script
    lang="ts"
    setup
>
import { useTableElements } from '@/composables'
import type { ElementTableView, JumpsDifficultLvls, DefaultDifficultLvls } from '@/interfaces'

const elements = useTableElements()

const sumBaseCost = computed(() => elements.value.reduce((acc: number, element: ElementTableView) => {
    const baseCost = element.difficultLvls[element.lvlName as keyof (JumpsDifficultLvls | DefaultDifficultLvls)]?.baseCost
    if (baseCost) {
        acc = parseFloat((acc + baseCost).toFixed(2))
    }
    return acc
}, 0))

const deleteElement = (element: ElementTableView) => {
    elements.value = elements.value.filter(el => el !== element)
    element.draggebleDom?.remove()
}
</script>

<style scoped>
.row__select {
    background-color: azure;
}

.table_close_icon:hover {
    cursor: pointer;
}

.activities {
    background-color: #D0D1D2;
}

.action:hover {
    cursor: pointer;
}
</style>
