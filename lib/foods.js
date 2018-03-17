// Fetch call to get current API data
// parse it
// the append the DOM with new rows per element of JSON Hash

const getFoodList = () => {
  $('#food-list').html('')
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods')
    .then(response => response.json())
    .then(myJson => {
      myJson.reverse().forEach(function (obj) {
        $('#food-list').append(
          `
      <tr>
        <td>${obj.name}</td>
        <td>${obj.calories}</td>
        <td class="delete-food-button"><img src="public/assets/gradient-x.png" width="30" height="auto" id='${obj.id}'></a></td>
      </tr>
      `
        )
      })
    })
}

const checkFoodName = (input) => {
  if (input === '') {
    input.setCustomValidity("Please enter a food name")
  }
}

const checkFoodCalories= (input) => {
  if (input === '') {
    input.setCustomValidity("Please enter a food name")
  }
}

$('#food-list').on('click', '.delete-food-button', function (event) {
  event.preventDefault()
  event.target.parentElement.parentElement.remove()
  getMeals(event.target.id)
  deleteCall(event.target.id)
})

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
  checkFoodName(name)
  checkFoodCalories(calories)
  postNewFood(foodInfo)
})

const postNewFood = (foodInfo) => {
  fetch("https://vast-retreat-17218.herokuapp.com/api/v1/foods",
  postConfig(foodInfo))
  .then(processResponse)
  .then(getFoodList)
  .catch(errorLog)
}

const postConfig = (foodInfo) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(foodInfo)
  }
}

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

getFoodList()
