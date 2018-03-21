import { getFoodList } from './fetch-foods'



$('#food-list').on('click', '.food-name-field', function (event) {
  let attribute = `name`
  let attributeForPatch = 'name'

  editCell(attribute, event)

  $('#food-list').find(`#food-${attribute}-edit`).focus()

  $(`#food-${attribute}-edit`).on('focusout', function(exitEvent) {
    updateCellAndDB(attribute, exitEvent, attributeForPatch)
  })
})

$('#food-list').on('click', '.food-calorie-field', function (event) {
  let attribute = `calorie`
  let attributeForPatch = 'calories'

  editCell(attribute, event)

  $('#food-list').find(`#food-${attribute}-edit`).focus()

  $(`#food-${attribute}-edit`).on('focusout', function(exitEvent) {
    updateCellAndDB(attribute, exitEvent, attributeForPatch)
  })
})


const editCell = (attribute, event) => {
  let tableCell = $(`<td class="food-${attribute}-field" id='${event.currentTarget.id}'><input type="text" ${attribute}="food-${attribute}" value="${event.target.textContent}"
  id="food-${attribute}-edit" required ></td>`)
  $(`td#${event.currentTarget.id}.food-${attribute}-field`).html(tableCell)
}

const updateCellAndDB = (attribute, exitEvent, attributeForPatch) => {
  let value = $(`#food-${attribute}-edit`).val()
  let foodInfo = {food:{[attributeForPatch]: value}}
  console.log(foodInfo)
  updateExistingFood(foodInfo, exitEvent.target.parentElement.id)
  exitEvent.stopImmediatePropagation()
}


$("form").submit(function( event ) {
  event.preventDefault()
  let name = $('#food-name-field').val()
  let calories = $('#calories-field').val()
  let foodInfo = {food:{name, calories}}
  postNewFood(foodInfo)
  this.reset()
})

const postNewFood = (foodInfo) => {
  fetch("https://vast-retreat-17218.herokuapp.com/api/v1/foods",
  postConfig(foodInfo))
  .then(processResponse)
  .then(getFoodList)
  .catch(errorLog)
}

const updateExistingFood = (foodInfo, foodId) => {
  fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/foods/${foodId}`,
  updateConfig(foodInfo))
  .then(processResponse)
  .then(getFoodList)
  .catch(errorLog)
}

const updateConfig = (foodInfo) => {
  return {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(foodInfo)
  }
}

const postConfig = (foodInfo) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(foodInfo)
  }
}

$('#food-filter').on('keyup', function (event) {
  let input = event.currentTarget.value.toUpperCase()
  let i = input.length
  let listItems = Array.from($("#food-list").find("tr"))

  listItems.forEach(function(item) {
    if (item.firstElementChild.textContent.toUpperCase().substr(0, i) != input) {
      item.style.display = 'none'
    } else  {
      item.style.display = ''
    }
  })
})

const processResponse = (response) => {
  return response.json()
  .then((json) => {
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

const errorLog = () => {
  console.error({ error})
}

// getFoodList()
