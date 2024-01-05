<template>
    <table class="table-auto border border-collapse border-slate-500">
        <thead>
            <tr>
                <th class="border border-slate-600 px-2">
                    Порядк. № элемента
                </th>
                <th class="border border-slate-600 px-2">
                    Элемент
                </th>
                <th class="border border-slate-600 px-2">
                    Время выполнения
                </th>
                <th class="border border-slate-600 px-2">
                    Базовая стоимость
                </th>
            </tr>
        </thead>
        <tbody>
            <template
                v-if="elements.length"
            >
                <v-hover
                    v-slot="{ isHovering, props }"
                >
                    <tr
                        v-for="(element, index) in elements"
                        :key="element.key"
                        :class="{ 'row__select': isHovering }"
                        v-bind="props"
                    >
                        <td class="border border-slate-600 px-2">
                            {{ index + 1 }}
                        </td>
                        <td class="border border-slate-600 px-2">
                            {{ element.fullname }}
                        </td>
                        <td class="border border-slate-600 px-2">
                            {{ element.timeExecute }}
                        </td>
                        <td class="border border-slate-600 px-2">
                            <div class="d-flex justify-space-between">
                                {{ element.difficultLvls[element.lvlName as keyof (JumpsDifficultLvls | DefaultDifficultLvls)]?.baseCost }}
                                <v-icon
                                    v-if="isHovering"
                                    icon="mdi-close"
                                    class="ml-5 table_close_icon"
                                    title="Удалить элемент"
                                    @click="deleteElement(element)"
                                ></v-icon>
                            </div>
                        </td>
                    </tr>
                </v-hover>
            </template>

            <tr
                v-else
                class="text-center"
            >
                <td class="text-center" colspan="4">
                    Нет элементов
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script
    setup
    lang="ts"
>
import type { ElementTableView, JumpsDifficultLvls, DefaultDifficultLvls } from '@/interfaces'

const elements = useTableElements()

// FIXME: v-hover работает только с props, может можно как-то по-другому
interface Props {}
const props = defineProps<Props>()

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
</style>
