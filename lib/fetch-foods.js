import { orderById } from './shared-functions'







const getFoodList = () => {
  $('#food-list').html('')
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(parseAndAppendFoods)
}

const parseAndAppendFoods = (foodList) => {
  foodList.sort(orderById).forEach(function (food) {
    $('#food-list').append( foodTableRowFoodsHtml(food) )
  })
}





// HTML for Food Page

const foodTableRowFoodsHtml = (food ) => {
  return `<tr class="food-list-item" id='${food.id}'>
  <td class="food-name-field" id='${food.id}'><p>${food.name}</p></td>
  <td class="food-calorie-field" id='${food.id}'><p>${food.calories}</p></td>
  <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id='${food.id}'></td>
  </tr>
  `
}

getFoodList()

module.exports = { getFoodList }
