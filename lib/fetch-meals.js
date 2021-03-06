import {mealTotalCalories,
        colorCals,
        toatsCals,
        orderById} from './shared'

let remainingCals
let remainingDailyCals
let totalCalCount
let foodList
let foodReference

// Delete foods from table and from meals

const findFoodsInMeals = (foodId, parent) => {
  foodReference = false
  fetch('https://qs-backend-express.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      parsedResponse.forEach(function (meal) {
        meal.foods.forEach(function (food) {
          if (food.id == foodId) {foodReference = true }
        })
      })
      if (foodReference) {
        alert("This food is in a meal! \n \n \n Remove the food from all meals before deleting")
      } else {
        deleteFood(foodId)
        parent.remove()
      }
    })
    .catch(errorLog)
}

const deleteFood = id => {
  fetch(`https://qs-backend-express.herokuapp.com/api/v1/foods/${id}`, {
    method: 'DELETE'
  }).catch(errorLog)

}

const deleteFoodFromMeals = (mealID, foodId) => {
  fetch(
    `https://qs-backend-express.herokuapp.com/api/v1/meals/${mealID}/foods/${foodId}`,
    { method: 'DELETE'})
  .then(() => populateFoodFromMeals())
  .catch(errorLog)
}

// Add Foods rows to Meal tables on Meal page

const populateFoodFromMeals = () => {
  fetch('https://qs-backend-express.herokuapp.com/api/v1/meals')
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
  .catch(errorLog)
}

const parseMealsAndAppendFoods = (mealCollection) => {
  mealCollection.forEach(function (meal) {
    $(`#${meal.name.toLowerCase()}-table`).html('')
    if (meal.foods[0].name == null) {
      meal.foods = []
    }
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
  return fetch('https://qs-backend-express.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(myJson => foodListAssigner(myJson))
  .then(() =>
    tableSorter(foodList, orderById)
  )
  .catch(errorLog)
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

const pushFoodToMeals = (foods, mealId) => {
  foods.forEach(function (foodId) {
    fetch(`https://qs-backend-express.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, {
        method: 'POST'
    })
    .then(() => populateFoodFromMeals())
    .catch(errorLog)
  })
}

const errorLog = (error) => {
  console.error({ error })
}

// Html for Meals page

const totalCaloriesDiaryHtml = (totalCalCount, remainingDailyCals) => {
   return ` <thead>
              <tr id="goal-calories">
                <td><p>Goal Calories</p></td>
                <td> </td>
                <td><p>2000</p></td>
              </tr>
            </thead>
            <tbody>
              <tr id="consumed-calories">
                <td><p>Consumed Calories</p></td>
                <td></td>
                <td id="total-consumed-cals"><p>${totalCalCount}</p></td>
              </tr>
            <tfoot>
              <tf id="remaining-total-calories">
                <td><p>Remaining Calories</p></td>
                <td></td>
                <td id="total-remaining-cals"><p>${remainingDailyCals}</p></td>
              </tf>
            </tfoot>
`}

const totalCaloriesMealHtml = (meal) => {
  return `<tr>
            <td> Total Calories </td>
            <td> ${toatsCals(meal)} </td>
            <td></td>
            </tr>
            <tr>
            <td> Remaining Calories </td>
            <td id="${meal.name.toLowerCase()}-remaining-calories"> ${remainingCals}</td>
            <td></td>
          </tr>
          `
}

const mealTableRowHtml = (meal, food) => {
  return `<tr class="${meal.name}-list-item" data-id='${meal.id}'>
            <td class="${meal.name}-name-field" data-id='${food.id}'><p>${food.name}</p></td>
            <td class="${meal.name}-calorie-field"><p>${food.calories}</p></td>
            <td class="delete-meal-food-button" data-id='${food.id}'><img src="./public/assets/gradient-x.png" width="30" height="auto" alt='delete'></td>
          </tr>
         `
}

const foodTableRowIndexHtml = (food) => {
  return `<tr class="food-list-item">
            <td>
              <label for='${food.id}-checkbox' class="checkbox-label"> select food
                <input type="checkbox" title="food-checkbox" id='${food.id}-checkbox' class='food-checkbox' name='${food.id}'>
              </label>
            </td>
            <td class="food-name-field"><p>${food.name}</p></td>
            <td class="food-calories-field"><p>${food.calories}</p></td>
            <td></td>
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
  tableSorter,
  pushFoodToMeals,
  getFoodListMeal
}
