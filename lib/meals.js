let totalCalCount = 0
let remainingCals
let remainingDailyCals


const findFoodFromMeals = foodId => {
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      parsedResponse.forEach(function (meal) {
        $(`#${meal.name.toLowerCase()}-table`).html('')
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
        $(`.${meal.name.toLowerCase()}-table-calories`).html('')
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
        colorCals(remainingCals, `#${meal.name.toLowerCase()}-remaining-calories`)

      })
      remainingDailyCals = 2000 - totalCalCount
      $("#toats-table").html('')
      $("#toats-table"). append(
      `
      <tr id="goal-calories">
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
      `
    )
    colorCals(remainingDailyCals, "#total-consumed-cals")
    colorCals(remainingDailyCals, "#total-remaining-cals")
  })
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

const getFoodListMeal = () => {
  $('#food-list-meals').html('')
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods')
    .then(response => response.json())
    .then(myJson => {
      myJson.sort(orderById).forEach(function (obj) {
        $('#food-list-meals').append(
          `
      <tr class="food-list-item" id='${obj.id}'>
        <td><input type="checkbox" class='food-checkbox' name='${obj.id}'></td>
        <td class="food-name-field" id='${obj.id}'><p>${obj.name}</p></td>
        <td class="food-calorie-field" id='${obj.id}'><p>${obj.calories}</p></td>
      </tr>
      `
        )
      })
    })
}

$("#new-food-btn").click(function(event) {
  event.preventDefault()
  window.location="./foods.html"
})

const orderById = (a, b) => {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
 }

const mealTotalCalories = {
  snack : 200,
  breakfast : 400,
  lunch : 600,
  dinner : 800
}

$('.add-to-meal-btn').on('click', function(event) {
  event.preventDefault()
  let mealId = event.currentTarget.id
  let foods = []
  $('.food-checkbox').each(function() {
    if ($(this).is(":checked")) {
    foods.push($(this).attr('name'))
   }
  })
  foods.forEach(function (foodId) {
    fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, {
        method: 'POST'
    })
    findFoodFromMeals()
  })
})

findFoodFromMeals()
getFoodListMeal()
