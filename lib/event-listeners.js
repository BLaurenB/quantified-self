import {findFoodsInMeals,
        deleteFood,
        deleteFoodFromMeals,
          populateFoodFromMeals} from './fetch-meals'

$('#food-list').on('click', '.delete-food-button', function (event) {
  event.preventDefault()
  event.target.parentElement.parentElement.remove()
  findFoodsInMeals(event.target.id)
  deleteFood(event.target.id)
})

$('.meal-table').on('click', '.delete-meal-food-button', function (event) {
  event.preventDefault()
  let foodId = event.target.id
  let mealId = event.currentTarget.parentElement.id
  event.target.parentElement.parentElement.remove()
  deleteFoodFromMeals(mealId, foodId)
})

$("#new-food-btn").click(function(event) {
  event.preventDefault()
  window.location="./foods.html"
})
