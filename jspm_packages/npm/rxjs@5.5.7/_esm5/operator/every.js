/* */ 
"format cjs";
/** PURE_IMPORTS_START .._operators_every PURE_IMPORTS_END */
import { every as higherOrder } from '../operators/every';
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
export function every(predicate, thisArg) {
    return higherOrder(predicate, thisArg)(this);
}
//# sourceMappingURL=every.js.map
