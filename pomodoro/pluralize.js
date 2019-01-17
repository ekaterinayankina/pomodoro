/**
 * Возвращает слово (или его окончание) для множественного числа
 * на основании самого числа и массива окончаний для 1, 4 и 5 (штука, штуки, штук).
 *
 * @param {number} digit число на основе которого нужно сформировать окончание.
 * @param {array} endings массив слов или окончаний для чисел (1, 4, 5).
 * @example pluralize(10, ['яблоко', 'яблока', 'яблок']) // 'яблок'
 * @example pluralize(1, ['ко', 'ка', 'к']) // 'ко'
 * @return {string} Слово или окончание.
 */
module.exports = function pluralize (digit, endings) {
    const tens = digit % 100;
    if (tens >= 11 && tens <= 19) {
        return endings[2];
    }

    const units = digit % 10;
    switch (units) {
        case (1):
            return endings[0];
        case (2):
        case (3):
        case (4):
            return endings[1];
        default:
            return endings[2];
    }
};