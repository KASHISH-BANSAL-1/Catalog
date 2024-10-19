function decodeVal(base, value) {
    return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(xValues, yValues, x) {
    let totalSum = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let xi = xValues[i];
        let yi = yValues[i];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (x - xValues[j]) / (xi - xValues[j]);
            }
        }
        totalSum += term;
    }

    return totalSum;
}
function findConstant(data) {
    const n = data.keys.n;
    const k = data.keys.k;

const xVal = [];
const yVal = [];

for (const key in data) {
    if (key === "keys") continue;
    const base = data[key].base;
    const value = data[key].value;
    const x = parseInt(key);
    const y = decodeVal(base, value);

    xVal.push(x);
    yVal.push(y);
}

if (xVal.length < k || yVal.length < k) {
    throw new Error("Not enough data points to determine the polynomial.");
}

return lagrangeInterpolation(xVal.slice(0, k), yVal.slice(0, k), 0);
}

async function main() {
const d1 = await import('./tc1.json', { assert: { type: 'json' } });
const d2 = await import('./tc2.json', { assert: { type: 'json' } });

const c1 = findConstant(d1.default);
const c2 = findConstant(d2.default);

console.log(`Constant for tc1: ${c1}`);
console.log(`Constant for tc2: ${c2}`);
}

main();