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
 * @param elementDom - Перемещаемый элемент
 */
export const setElementMoveFunction = (parentElement: HTMLElement, elementDom: HTMLElement) => {
    elementDom.onmousedown = (event) => {
        elementDom.style.zIndex = '1000'

        const shiftX = event.clientX - elementDom.getBoundingClientRect().left
        const shiftY = event.clientY - elementDom.getBoundingClientRect().top

        parentElement.onmousemove = (event: MouseEvent) => {
            const left = parentElement.getBoundingClientRect().left
            const top = parentElement.getBoundingClientRect().top
            const right = parentElement.getBoundingClientRect().right
            const bottom = parentElement.getBoundingClientRect().bottom

            const x = event.pageX - left - shiftX
            const y = event.pageY - top - shiftY

            if (event.pageX > left + elementDom.offsetWidth / 2 &&
                event.pageX < right - elementDom.offsetWidth / 2 &&
                event.pageY > top + elementDom.offsetWidth / 2 &&
                event.pageY < bottom - elementDom.offsetWidth / 2) {
                moveAt(elementDom, x, y)
            }
        }

        elementDom.onmouseup = () => {
            parentElement.onmousemove = null
            elementDom.onmouseup = null
        }

        parentElement.onmouseup = () => {
            parentElement.onmousemove = null
            elementDom.onmouseup = null
        }
    }

    elementDom.ondragstart = () => false
    elementDom.style.cursor = 'pointer'
}
