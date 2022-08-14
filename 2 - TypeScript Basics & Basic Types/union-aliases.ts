type Combinable = number | string;
type ConversionDescriptor = 'numerical' | 'text';

function combine(
    input1: Combinable,
    input2: Combinable,
    resultType: ConversionDescriptor
) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'numerical') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }

    return result;
}

const combinedAges = combine(30, 26, 'numerical');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'numerical');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'text');
console.log(combinedNames);
