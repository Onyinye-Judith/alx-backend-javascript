ARRAY

The Array object, as with arrays in other programming languages, enables storing a collection of multiple items under a single variable name, and has members for performing common array operations.

Description
In JavaScript, arrays aren't primitives but are instead Array objects with the following core characteristics:

JavaScript arrays are resizable and can contain a mix of different data types. (When those characteristics are undesirable, use typed arrays instead.)
JavaScript arrays are not associative arrays and so, array elements cannot be accessed using arbitrary strings as indexes, but must be accessed using nonnegative integers (or their respective string form) as indexes.
JavaScript arrays are zero-indexed: the first element of an array is at index 0, the second is at index 1, and so on — and the last element is at the value of the array's length property minus 1.
JavaScript array-copy operations create shallow copies. (All standard built-in copy operations with any JavaScript objects create shallow copies, rather than deep copies).
Array indices
Array objects cannot use arbitrary strings as element indexes (as in an associative array) but must use nonnegative integers (or their respective string form). Setting or accessing via non-integers will not set or retrieve an element from the array list itself, but will set or access a variable associated with that array's object property collection. The array's object properties and list of array elements are separate, and the array's traversal and mutation operations cannot be applied to these named properties.

Array elements are object properties in the same way that toString is a property (to be specific, however, toString() is a method). Nevertheless, trying to access an element of an array as follows throws a syntax error because the property name is not valid:

js
Copy to Clipboard
arr.0; // a syntax error
JavaScript syntax requires properties beginning with a digit to be accessed using bracket notation instead of dot notation. It's also possible to quote the array indices (e.g., years['2'] instead of years[2]), although usually not necessary.

The 2 in years[2] is coerced into a string by the JavaScript engine through an implicit toString conversion. As a result, '2' and '02' would refer to two different slots on the years object, and the following example could be true:

js
Copy to Clipboard
console.log(years["2"] !== years["02"]);
Only years['2'] is an actual array index. years['02'] is an arbitrary string property that will not be visited in array iteration.

Relationship between length and numerical properties
A JavaScript array's length property and numerical properties are connected.

Several of the built-in array methods (e.g., join(), slice(), indexOf(), etc.) take into account the value of an array's length property when they're called.

Other methods (e.g., push(), splice(), etc.) also result in updates to an array's length property.

js
Copy to Clipboard
const fruits = [];
fruits.push("banana", "apple", "peach");
console.log(fruits.length); // 3
When setting a property on a JavaScript array when the property is a valid array index and that index is outside the current bounds of the array, the engine will update the array's length property accordingly:

js
Copy to Clipboard
fruits[5] = "mango";
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 6
Increasing the length extends the array by adding empty slots without creating any new elements — not even undefined.

js
Copy to Clipboard
fruits.length = 10;
console.log(fruits); // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
console.log(fruits[8]); // undefined
Decreasing the length property does, however, delete elements.

js
Copy to Clipboard
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
This is explained further on the length page.

Array methods and empty slots
Array methods have different behaviors when encountering empty slots in sparse arrays. In general, older methods (e.g. forEach) treat empty slots differently from indices that contain undefined.

Methods that have special treatment for empty slots include the following: concat(), copyWithin(), every(), filter(), flat(), flatMap(), forEach(), indexOf(), lastIndexOf(), map(), reduce(), reduceRight(), reverse(), slice(), some(), sort(), and splice(). Iteration methods such as forEach don't visit empty slots at all. Other methods, such as concat, copyWithin, etc., preserve empty slots when doing the copying, so in the end the array is still sparse.

js
Copy to Clipboard
const colors = ["red", "yellow", "blue"];
colors[5] = "purple";
colors.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
// Output:
// 0: red
// 1: yellow
// 2: blue
// 5: purple

colors.reverse(); // ['purple', empty × 2, 'blue', 'yellow', 'red']
Newer methods (e.g. keys) do not treat empty slots specially and treat them as if they contain undefined. Methods that conflate empty slots with undefined elements include the following: entries(), fill(), find(), findIndex(), findLast(), findLastIndex(), includes(), join(), keys(), toLocaleString(), toReversed(), toSorted(), toSpliced(), values(), and with().

js
Copy to Clipboard
const colors = ["red", "yellow", "blue"];
colors[5] = "purple";
const iterator = colors.keys();
for (const key of iterator) {
  console.log(`${key}: ${colors[key]}`);
}
// Output
// 0: red
// 1: yellow
// 2: blue
// 3: undefined
// 4: undefined
// 5: purple

const newColors = colors.toReversed(); // ['purple', undefined, undefined, 'blue', 'yellow', 'red']
Copying methods and mutating methods
Some methods do not mutate the existing array that the method was called on, but instead return a new array. They do so by first constructing a new array and then populating it with elements. The copy always happens shallowly — the method never copies anything beyond the initially created array. Elements of the original array(s) are copied into the new array as follows:

Objects: the object reference is copied into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays.
Primitive types such as strings, numbers and booleans (not String, Number, and Boolean objects): their values are copied into the new array.
Other methods mutate the array that the method was called on, in which case their return value differs depending on the method: sometimes a reference to the same array, sometimes the length of the new array.

The following methods create new arrays by accessing this.constructor[Symbol.species] to determine the constructor to use: concat(), filter(), flat(), flatMap(), map(), slice(), and splice() (to construct the array of removed elements that's returned).
