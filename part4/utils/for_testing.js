const palindromo = (string) => {
    return string.split('').reverse().join()
}

const average = array => {
    let sum = 0
    array.forEach(num => { sum += sum })
    return sum / array.length
}