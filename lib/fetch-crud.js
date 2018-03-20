function deleteCall (id) {
  return fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/foods/${id}`, {
    method: 'DELETE'
  }).catch(error => console.error({ error }))
}

const getMeals = foodId => {
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      parsedResponse.forEach(function (element) {
        element.foods.forEach(function (food) {
          // this is an array
          if (food.id == foodId) {
            deleteFoodFromMeals(element.id, food.id)
          }
        })
      })
    })
}

const deleteFoodFromMeals = (mealID, foodId) => {
  fetch(
    `https://vast-retreat-17218.herokuapp.com/api/v1/meals/${mealID}/foods/${foodId}`,
    { method: 'DELETE' }
  ).catch(error => console.error({ error }))
}

module.exports = {
  deleteCall,
  getMeals
}
