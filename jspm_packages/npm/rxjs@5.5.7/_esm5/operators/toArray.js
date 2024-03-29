/* */ 
"format cjs";
/** PURE_IMPORTS_START ._reduce PURE_IMPORTS_END */
import { reduce } from './reduce';
function toArrayReducer(arr, item, index) {
    if (index === 0) {
        return [item];
    }
    arr.push(item);
    return arr;
}
export function toArray() {
    return reduce(toArrayReducer, []);
}
//# sourceMappingURL=toArray.js.map
