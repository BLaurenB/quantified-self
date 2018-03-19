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



findFoodFromMeals()
