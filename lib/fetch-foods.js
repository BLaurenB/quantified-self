import { orderById } from './shared'

// Get foods for initial page load

const getFoodList = () => {
  $('#food-list').html('')
  fetch('https://qs-backend-express.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(parseAndAppendFoods)
  .catch(errorLog)
}

const parseAndAppendFoods = (foodList) => {
  foodList.sort(orderById).forEach(function (food) {
    $('#food-list').append( foodTableRowFoodsHtml(food) )
  })
}

// Update foods
const editAndUpdateCell = (attribute, event) => {
  editCell(attribute, event)
  $('#food-list').find(`#food-${attribute}-edit`).focus()
  $(`#food-${attribute}-edit`).on('focusout', function (exitEvent) {
    updateCellAndDB(attribute, exitEvent)
  })
}

const editCell = (attribute, event) => {
  $(`td.${event.currentTarget.parentElement.id}.food-${attribute}-field`).html(tableCellHTML(attribute, event))
}

const updateCellAndDB = (attribute, exitEvent) => {
  let value = $(`#food-${attribute}-edit`).val()
  let foodInfo = { food: { [attribute]: value } }
  updateExistingFood(foodInfo, exitEvent.target.parentElement.id)
  exitEvent.stopImmediatePropagation()
}

const updateExistingFood = (foodInfo, foodId) => {
  fetch(
    `https://qs-backend-express.herokuapp.com/api/v1/foods/${foodId}`,
    fetchConfig(foodInfo, "PATCH")
  )
  .then(processResponse)
  .then(getFoodList)
  .catch(errorLog)
}



//Post New Food

const postNewFood = foodInfo => {
  fetch(
    'https://qs-backend-express.herokuapp.com/api/v1/foods',
    fetchConfig(foodInfo, "POST")
  )
  .then(processResponse)
  .then(getFoodList)
  .catch(errorLog)
}



// Configs

const fetchConfig = (foodInfo, verb) => {
  return {
    method: verb,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(foodInfo),
  }
}


// Procesing and Error Handling

const processResponse = response => {
  return response.json().then(json => {
    if (!response.ok) {
      const error = {
        status: response.status,
        statusText: response.statusText,
        json
      }
      return Promise.reject(error)
    }
    return json
  })
}

const errorLog = (error) => {
  console.error({ error })
}


// HTML for Food Page

const foodTableRowFoodsHtml = (food ) => {
  return `<tr class="food-list-item" id='${food.id}'>
  <td class="food-name-field ${food.id}"><p>${food.name}</p></td>
  <td class="food-calories-field ${food.id}"><p>${food.calories}</p></td>
  <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" alt='delete'></td>
  </tr>
  `
}

const tableCellHTML = (attribute, event) => {
  return $(`<td class="food-${attribute}-field" id='${event.currentTarget.parentElement.id}'>
  <label for="food-${attribute}-edit"></label>
  <input type="text" ${attribute}="food-${attribute}" value="${event.target.textContent}"
  id="food-${attribute}-edit" required >
  </td>`
  )
}

module.exports = {
  getFoodList,
                  editAndUpdateCell,
                  editCell,
                  updateCellAndDB,
                  updateExistingFood,
                  postNewFood
                }
