/**
 * Убирает обрабочик клика на элемент и старта перемещения
 * @param parentElement - HTML элемент, внутри которого перемещается элемент
 * @param element - Перемещаемый HTML элемент
 */
export const disableElementMoveFunction = (parentElement: HTMLElement, element: HTMLElement) => {
    parentElement.onmousemove = null

    element.onmousedown = null
    element.draggable = false
    element.style.cursor = 'default'
}
