import {  getFoodListMeal,
          findFoodsInMeals,
          deleteFood,
          deleteFoodFromMeals,
          populateFoodFromMeals,
          foodListFunc,
          foodList,
          tableSorter,
          pushFoodToMeals
        } from './fetch-meals'

import {getFoodList,
        editAndUpdateCell,
        editCell,
        updateCellAndDB,
        updateExistingFood,
        postNewFood
        } from './fetch-foods'

  import {orderById,
          orderByAsc,
          orderByDesc,
          createFoodListFromCheckbox
        } from "./shared"

let counter = 0

$('#food-list').on('click', '.delete-food-button', function (event) {
  event.preventDefault()
  let parent = event.target.parentElement.parentElement
  findFoodsInMeals(event.target.id, parent)
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


$("#calories-header").on('click', function (event) {
  $('#food-list-meals').html('')
  counter++
  if (counter === 1) {
    tableSorter(foodListFunc(), orderByAsc)
  } else if (counter === 2) {
     tableSorter(foodListFunc(), orderByDesc)
  } else {
    tableSorter(foodListFunc(), orderById)
    counter = 0
  }
})


$('.add-to-meal-btn').on('click', function(event) {
  event.preventDefault()
  let mealId = event.currentTarget.id
  let foods = []
  createFoodListFromCheckbox($('.food-checkbox'), foods)
  pushFoodToMeals(foods, mealId)
  $('.food-checkbox').prop('checked', false)
  $('.add-to-meal-btn').blur()
})
