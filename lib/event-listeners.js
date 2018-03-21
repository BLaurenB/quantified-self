import {  findFoodsInMeals,
          deleteFood,
          deleteFoodFromMeals,
          populateFoodFromMeals
        } from './fetch-meals'

import {getFoodList, 
        editAndUpdateCell, 
        editCell, 
        updateCellAndDB, 
        updateExistingFood, 
        postNewFood
        } from './fetch-foods'


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

$('#food-list').on('click', '.food-name-field', function (event) {
  editAndUpdateCell('name', event)
})

$('#food-list').on('click', '.food-calories-field', function (event) {
  editAndUpdateCell('calories', event)
})


$('form').submit(function (event) {
  event.preventDefault()
  let name = $('#food-name-field').val()
  let calories = $('#calories-field').val()
  let foodInfo = { food: { name, calories } }
  postNewFood(foodInfo)
  this.reset()
})

$('#food-filter').on('keyup', function (event) {
  let input = event.currentTarget.value.toUpperCase()
  let i = input.length
  let listItems = Array.from($('#food-list').find('tr'))

  listItems.forEach(function (item) {
    if (
      item.firstElementChild.textContent.toUpperCase().substr(0, i) != input
    ) {
      item.style.display = 'none'
    } else {
      item.style.display = ''
    }
  })
})
