const dummy = (blogs) => {
  return 1
}

const totalLikes = array => {
    let sum = 0
    array.forEach(element => {
        sum += element.likes
    })
    return sum
}

const favoriteBlog = array => {
    if (array.length === 0){
        return null
    }
    
    return array.reduce((max, current) => {
        return current.likes > max.likes ? current : max
    })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}