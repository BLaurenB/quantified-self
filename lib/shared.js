

const mealTotalCalories = {
  snack : 200,
  breakfast : 400,
  lunch : 600,
  dinner : 800
}

const colorCals = (calories, cssElement) => {
  if (calories < 0) {
    $(cssElement).css('color', 'red')
  } else {
  $(cssElement).css('color', 'green')
  }
}

const toatsCals = (meal) => {
  let total = meal.foods.reduce(function(sum, food){
    return sum += food.calories
  }, 0)
  return total
}

const orderById = (a, b) => {
  if (a.id < b.id) {
    return -1
  } else if (a.id > b.id) {
    return 1
  } else {
  return 0
  }
}
const orderByAsc = (a, b) => {
  if (a.calories < b.calories) {
    return -1
  } else if (a.calories > b.calories) {
    return 1
  } else {
  return 0
  }
}
const orderByDesc = (a, b) => {
    if (a.calories < b.calories) {
    return 1
  } else if (a.calories > b.calories) {
    return -1
  } else {
  return 0
  }
}

module.exports = {mealTotalCalories,
                  colorCals,
                  toatsCals,
                  orderById, 
                  orderByAsc,
                  orderByDesc}
