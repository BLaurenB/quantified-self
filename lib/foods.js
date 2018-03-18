

$('#food-list').on('click', '.food-name-field', function (event){
  let tableCell = $(`<td class="food-name-field" id='${event.target.id}'><input type="text" name="food-name" value="${event.target.textContent}"
  id="food-name-edit" required ></td>`)
  $(`td#${event.target.id}.food-name-field`).html(tableCell)
  $('#food-list').find(`#food-name-edit`).focus()
  $(`#food-name-edit`).on('focusout', updateEvent(exitEvent))
})



const updateEvent = (exitEvent) => {
  let name = $('#food-name-edit').val()
  let foodInfo = { food: { name } }
  updateExistingFood(foodInfo, exitEvent.target.parentElement.id)
  exitEvent.stopImmediatePropagation()
}


function deleteCall (id) {
  return fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/foods/${id}`, {
    method: 'DELETE'
  }).catch(error => console.error({ error }))
}

const getMeals = foodId => {
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(parsedResponse => {
      parsedResponse.forEach(function (element) {
        element.foods.forEach(function (food) {
          // this is an array
          if (food.id == foodId) {
            deleteFoodFromMeals(element.id, food.id)
          }
        })
      })
    })
}

const deleteFoodFromMeals = (mealID, foodId) => {
  fetch(
    `https://vast-retreat-17218.herokuapp.com/api/v1/meals/${mealID}/foods/${foodId}`,
    { method: 'DELETE' }
  ).catch(error => console.error({ error }))
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


