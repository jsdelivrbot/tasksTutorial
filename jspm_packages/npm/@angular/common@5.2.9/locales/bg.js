/* */ 
"format cjs";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// THIS CODE IS GENERATED - DO NOT MODIFY
// See angular/tools/gulp-tasks/cldr/extract.js
function plural(n) {
    if (n === 1)
        return 1;
    return 5;
}
export default [
    'bg', [['am', 'pm'], , ['пр.об.', 'сл.об.']],
    [
        ['am', 'pm'],
        ,
    ],
    [
        ['н', 'п', 'в', 'с', 'ч', 'п', 'с'],
        ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        [
            'неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък',
            'петък', 'събота'
        ],
        ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    ],
    ,
    [
        ['я', 'ф', 'м', 'а', 'м', 'ю', 'ю', 'а', 'с', 'о', 'н', 'д'],
        [
            'яну', 'фев', 'март', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп',
            'окт', 'ное', 'дек'
        ],
        [
            'януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли',
            'август', 'септември', 'октомври', 'ноември', 'декември'
        ]
    ],
    ,
    [['пр.Хр.', 'сл.Хр.'], , ['преди Христа', 'след Христа']], 1,
    [6, 0], ['d.MM.yy \'г\'.', 'd.MM.y \'г\'.', 'd MMMM y \'г\'.', 'EEEE, d MMMM y \'г\'.'],
    ['H:mm \'ч\'.', 'H:mm:ss \'ч\'.', 'H:mm:ss \'ч\'. z', 'H:mm:ss \'ч\'. zzzz'],
    [
        '{1}, {0}',
        ,
        ,
    ],
    [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
    ['#,##0.###', '#,##0%', '0.00 ¤', '#E0'], 'лв.', 'Български лев', plural
];
//# sourceMappingURL=bg.js.map