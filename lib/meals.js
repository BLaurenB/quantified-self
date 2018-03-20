const findFoodFromMeals = foodId => {
  $('#breakfast-table', '#lunch-table', '#dinner-table', '#snack-table').html('')
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      parsedResponse.forEach(function (meal) {
        meal.foods.forEach(function (food) {
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
      $(`.${meal.name.toLowerCase()}-table-calories`).append(
        `
        <tr>
          <td> Total Calories </td>
          <td> ${toatsCals(meal)} </td>
        </tr>
        <tr>
          <td> Remaining Calories </td>
          <td> remaining calories count here </td>
        </tr>
        `
      )
    })
  })
}

const toatsCals = (meal) => {
  let total = meal.foods.reduce(function(sum, food){
    return sum += food.calories
  }, 0)
  return total
}

const getFoodList = () => {
  $('#food-list-meals').html('')
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods')
    .then(response => response.json())
    .then(myJson => {
      myJson.sort(orderById).forEach(function (obj) {
        $('#food-list-meals').append(
          `
      <tr class="food-list-item" id='${obj.id}'>
        <td><input type="checkbox" name='${obj.id}'></td>
        <td class="food-name-field" id='${obj.id}'><p>${obj.name}</p></td>
        <td class="food-calorie-field" id='${obj.id}'><p>${obj.calories}</p></td>
      </tr>
      `
        )
      })
    })
}

const orderById = (a, b) => {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
 }

findFoodFromMeals()
getFoodList()
