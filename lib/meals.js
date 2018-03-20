let totalCalCount = 0
let remainingCals
let remainingDailyCals


const findFoodFromMeals = foodId => {
  $('#breakfast-table', '#lunch-table', '#dinner-table', '#snack-table').html('')
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      parsedResponse.forEach(function (meal) {
        meal.foods.forEach(function (food) {
          totalCalCount += food.calories
          $(`#${meal.name.toLowerCase()}-table`).append(
            `
            <tr class="${meal.name}-list-item" id='${food.id}'>
            <td class="${meal.name}-name-field" id='${food.id}'><p>${food.name}</p></td>
            <td class="${meal.name}-calorie-field" id='${food.id}'><p>${food.calories}</p></td>
            <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id='${food.id}'></td>
            </tr>
            `
          )
        })
        remainingCals = mealTotalCalories[meal.name.toLowerCase()] - toatsCals(meal)
        $(`.${meal.name.toLowerCase()}-table-calories`).append(
          `
          <tr>
          <td> Total Calories </td>
          <td> ${toatsCals(meal)} </td>
          </tr>
          <tr>
          <td> Remaining Calories </td>
          <td id="${meal.name.toLowerCase()}-remaining-calories"> ${remainingCals}</td>
          </tr>
          `
        )
        colorCals(remainingCals, meal.name.toLowerCase())
        
      })
      remainingDailyCals = 2000 - totalCalCount
      $("#toats-table"). append(
      `
      <tr id="goal-calories">
        <td><p>Goal Calories</p></td>
        <td><p>2000</p></td>
      </tr>
      <tr id="consumed-calories">
        <td><p>Consumed Calories</p></td>
        <td><p>${totalCalCount}</p></td>
      </tr>
      <tr id="remaining-total-calories">
        <td><p>Remaining Calories</p></td>
        <td><p>${remainingDailyCals}</p></td>
      </tr>
      `
    )
  })
}


const colorCals = (remainingCals, mealName) => {
  if (remainingCals < 0) {
    $(`#${mealName}-remaining-calories`).css('color', 'red')
  } else {
  $(`#${mealName}-remaining-calories`).css('color', 'green')
  }
}


const toatsCals = (meal) => {
  let total = meal.foods.reduce(function(sum, food){
    return sum += food.calories
  }, 0)
  return total
}


const mealTotalCalories = {
  snack : 200,
  breakfast : 400,
  lunch : 600,
  dinner : 800
}


findFoodFromMeals()
