/**
 * Перемещает HTML элемент на указанную позицию
 * @param element - HTML элемент
 * @param pageX - Позиция по оси X
 * @param pageY - Позиция по оси Y
 */
const moveAt = (element: HTMLElement, pageX: number, pageY: number) => {
    element.style.left = pageX + 'px'
    element.style.top = pageY + 'px'
}

/**
 * Задает функцию перемещения для передаваемого HTML элемента
 * @param parentElement - Родительский элемент, над которым должен перемещаться элемент
 * @param element - Перемещаемый элемент
 */
export const setElementMoveFunction = (parentElement: HTMLElement, element: HTMLElement) => {
    element.onmousedown = (event) => {
        element.style.zIndex = '1000'

        const shiftX = event.clientX - element.getBoundingClientRect().left
        const shiftY = event.clientY - element.getBoundingClientRect().top

        parentElement.onmousemove = (event: MouseEvent) => {
            const left = parentElement.getBoundingClientRect().left
            const top = parentElement.getBoundingClientRect().top
            const right = parentElement.getBoundingClientRect().right
            const bottom = parentElement.getBoundingClientRect().bottom

            const x = event.pageX - left - shiftX
            const y = event.pageY - top - shiftY

            if (event.pageX > left + element.offsetWidth / 2 &&
                event.pageX < right - element.offsetWidth / 2 &&
                event.pageY > top + element.offsetWidth / 2 &&
                event.pageY < bottom - element.offsetWidth / 2) {
                moveAt(element, x, y)
            }
        }

        element.onmouseup = () => {
            parentElement.onmousemove = null
            element.onmouseup = null
        }
    }

    element.ondragstart = () => false
    element.style.cursor = 'pointer'
}
