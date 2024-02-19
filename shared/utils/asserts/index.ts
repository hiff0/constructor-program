/**
 * Вызывается в конце обработки статуса, для того, чтобы получать ошику,
 * если какой-то из статусов не обработан
 * @param value
 * @example
 * type Tabs = 'jump' | 'track' | 'spin' | 'addition'
 * // Обрабатываем currentTab
 * (currentTab: Tabs) => {
    if (currentTab === 'jump') {
        return // TODO
    } else if (currentTab === 'spin') {
        return // TODO
    } else if (currentTab === 'track') {
        return // TODO
    } else if (currentTab === 'addition') {
        return // TODO
    }
    // в assert будет подчеркивать ошибку, если мы не обработает все случаи для  currentTab
    assert(currentTab)
}
 */
export declare function assert(value: never): never
