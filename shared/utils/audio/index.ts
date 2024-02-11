/**
 * Переводит длительность песни в секундах в минуты и секунды
 * @param {number } songDuration - Длительность песни в секундах
 * @return Объект { минуты, секунды }
 */
export const getMinuteAndSecondsFromSongSeconds = (songDuration: number): {
    minutes: number;
    seconds: number;
} => {
    const fullMinutes = songDuration / 60
    return {
        minutes: fullMinutes - (fullMinutes % 1),
        seconds: (fullMinutes % 1) * 60
    }
}

/**
 * Переводит длительность в формате мм:сс в секунды
 * @param {string } ms - время в формате мм:сс
 * @return Время в секундах
 */
export const getSecondFromMinuteAndSeconds = (ms: string): number => {
    const [minuteStr, secondStr] = ms.split(':')
    return parseInt(minuteStr) * 60 + parseInt(secondStr)
}
