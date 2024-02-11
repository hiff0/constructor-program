/**
 * Скрывает DOM элемент свойсвом visibility
 * @param element
 */
export const hideElement = (element: HTMLElement) => {
    element.style.visibility = 'hidden'
}

/**
 * Показывает DOM элемент свойсвом visibility
 * @param element
 */
export const showElement = (element: HTMLElement) => {
    element.style.visibility = 'visible'
}
