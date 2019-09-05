export function updateArrayInPlace<T>(original: T[], updated: T[]): T[] {
    // add new items to a set
    // iterate old items, and delete from og if not in set
    // if in set, delete from set
    // iterate through set and append new items
    if (!original) {
        original.push(...updated);
    }
    else {
        const updates = new Set<T>(updated);
        let i = 0;
        while (i < original.length) {
            if (updates.has(original[i])) {
                // we already have this
                updates.delete(original[i]);
                ++i;
            }
            else {
                // this item is not in the final, remove from array
                original.splice(i, 1);
                // no need to increment as element has been removed
            }
        }

        updates.forEach((val: T) => {
            original.push(val);
        });
    }
    return original;
}