import {mealTotalCalories,
        colorCals,
        toatsCals,
        orderById} from './shared'

let remainingCals
let remainingDailyCals
let totalCalCount
let foodList

// Delete foods from table and from meals

const findFoodsInMeals = foodId => {
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      parsedResponse.forEach(function (meal) {
        meal.foods.forEach(function (food) {
          if (food.id == foodId) {
            deleteFoodFromMeals(meal.id, food.id)
          }
        })
      })
    })
}

const deleteFood = id => {
  fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/foods/${id}`, {
    method: 'DELETE'
  }).catch(error => console.error({ error }))
}

const deleteFoodFromMeals = (mealID, foodId) => {
  fetch(
    `https://vast-retreat-17218.herokuapp.com/api/v1/meals/${mealID}/foods/${foodId}`,
    { method: 'DELETE' }
  ).then(() => populateFoodFromMeals())
  .catch(error => console.error({ error }))
}

// Add Foods rows to Meal tables on Meal page

const populateFoodFromMeals = () => {
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      totalCalCount = 0
      parseMealsAndAppendFoods(parsedResponse)
      remainingDailyCals = 2000 - totalCalCount
      $("#toats-table").html('')
      $("#toats-table").append( totalCaloriesDiaryHtml(totalCalCount, remainingDailyCals))
    colorCals(remainingDailyCals, "#total-consumed-cals")
    colorCals(remainingDailyCals, "#total-remaining-cals")
  })
}

const parseMealsAndAppendFoods = (mealCollection) => {
  mealCollection.forEach(function (meal) {
    $(`#${meal.name.toLowerCase()}-table`).html('')
    appendFoodRow(meal)
    remainingCals = mealTotalCalories[meal.name.toLowerCase()] - toatsCals(meal)
    $(`.${meal.name.toLowerCase()}-table-calories`).html('')
    $(`.${meal.name.toLowerCase()}-table-calories`).append( totalCaloriesMealHtml(meal))
    colorCals(remainingCals, `#${meal.name.toLowerCase()}-remaining-calories`)
  })
}

const appendFoodRow = (meal) => {
  meal.foods.forEach(function (food) {
    totalCalCount += food.calories
    $(`#${meal.name.toLowerCase()}-table`).append(mealTableRowHtml(meal, food))
  })
}

// Create Food list at the bottom of Meal Page

const getFoodListMeal = () => {
  $('#food-list-meals').html('')
  return fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(myJson => foodListAssigner(myJson)) 
  .then(() =>
    tableSorter(foodList, orderById)
  )    
}

const tableSorter = (foodCollection, order) => {
  
  foodCollection.sort(order).forEach(function (food) {
    $('#food-list-meals').append(foodTableRowIndexHtml(food))
  })
}



const foodListAssigner = (myJson) => {
  foodList = myJson 
}

const foodListFunc = () => {
  return foodList
}




// Html for Meals page

const totalCaloriesDiaryHtml = (totalCalCount, remainingDailyCals) => {
   return ` <tr id="goal-calories">
              <td><p>Goal Calories</p></td>
              <td><p>2000</p></td>
            </tr>
            <tr id="consumed-calories">
              <td><p>Consumed Calories</p></td>
              <td id="total-consumed-cals"><p>${totalCalCount}</p></td>
            </tr>
            <tr id="remaining-total-calories">
              <td><p>Remaining Calories</p></td>
              <td id="total-remaining-cals"><p>${remainingDailyCals}</p></td>
            </tr>
`}

const totalCaloriesMealHtml = (meal) => {
  return `<tr>
            <td> Total Calories </td>
            <td> ${toatsCals(meal)} </td>
          </tr>
          <tr>
            <td> Remaining Calories </td>
            <td id="${meal.name.toLowerCase()}-remaining-calories"> ${remainingCals}</td>
          </tr>
          `
}

const mealTableRowHtml = (meal, food) => {
  return `<tr class="${meal.name}-list-item" id='${meal.id}'>
            <td class="${meal.name}-name-field" id='${food.id}'><p>${food.name}</p></td>
            <td class="${meal.name}-calorie-field" id='${food.id}'><p>${food.calories}</p></td>
            <td class="delete-meal-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id='${food.id}'></td>
          </tr>
         `
}

const foodTableRowIndexHtml = (food) => {
  return `<tr class="food-list-item" id='${food.id}'>
            <td><input type="checkbox" class='food-checkbox' name='${food.id}'></td>
            <td class="food-name-field" id='${food.id}'><p>${food.name}</p></td>
            <td class="food-calories-field" id='${food.id}'><p>${food.calories}</p></td>
          </tr>
          `
}
module.exports = {
  deleteFood,
  findFoodsInMeals,
  deleteFoodFromMeals,
  populateFoodFromMeals, 
  foodList, 
  foodListAssigner,
  foodListFunc, 
  tableSorter
}

populateFoodFromMeals()
getFoodListMeal()
