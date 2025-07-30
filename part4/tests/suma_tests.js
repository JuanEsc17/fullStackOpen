const suma = (a, b) => {
    return a + b
}

const checks = [
    {
        a: 1, b: 3, result: 4
    },
    {
        a: 0, b: 0, result: 1
    },
    {
        a: 5, b: 2, result: 2
    }
]

checks.forEach(check => {
    const {a, b, result} = check
    console.assert(
    suma(a, b) === result,
    `Suma of ${a} and ${b} expected to be ${result}`
)
})

console.log(`${checks.length} checks performed`)