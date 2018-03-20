import {getMeals,
        deleteCall,
        deleteFoodFromMeals} from './fetch-crud'
import findFoodFromMeals from './meals'

$('#food-list').on('click', '.delete-food-button', function (event) {
  event.preventDefault()
  event.target.parentElement.parentElement.remove()
  getMeals(event.target.id)
  deleteCall(event.target.id)
})

$('.meal-table').on('click', '.delete-meal-food-button', function (event) {
  event.preventDefault()
  let foodId = event.target.id
  let mealId = event.currentTarget.parentElement.id
  event.target.parentElement.parentElement.remove()
  deleteFoodFromMeals(mealId, foodId)
})
