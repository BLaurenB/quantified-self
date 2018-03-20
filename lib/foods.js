
const getFoodList = () => {
  $('#food-list').html('')
  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods')
    .then(response => response.json())
    .then(myJson => {
      myJson.sort(orderById).forEach(function (obj) {
        $('#food-list').append(
          `
      <tr class="food-list-item" id='${obj.id}'>
        <td class="food-name-field" id='${obj.id}'><p>${obj.name}</p></td>
        <td class="food-calorie-field" id='${obj.id}'><p>${obj.calories}</p></td>
        <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id='${obj.id}'></td>
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


$('#food-list').on('click', '.delete-food-button', function (event) {
  event.preventDefault()
  event.target.parentElement.parentElement.remove()
  getMeals(event.target.id)
  deleteCall(event.target.id)
})

$('#food-list').on('click', '.food-name-field', function (event){
  let tableCell = $(`<td class="food-name-field" id='${event.currentTarget.id}'><input type="text" name="food-name" value="${event.target.textContent}"
  id="food-name-edit" required ></td>`)
  $(`td#${event.currentTarget.id}.food-name-field`).html(tableCell)
  $('#food-list').find(`#food-name-edit`).focus()
  $(`#food-name-edit`).on('focusout', function(exitEvent) {
    let name = $('#food-name-edit').val()
    let foodInfo = {food:{name}}
    updateExistingFood(foodInfo, exitEvent.target.parentElement.id)
    exitEvent.stopImmediatePropagation()
  });
})

$('#food-list').on('click', '.food-calorie-field', function (event){
  let tableCell = $(`<td class='.food-calorie-field' id='${event.currentTarget.id}'><input type="text" name="food-calorie" value="${event.target.textContent}"
  id="food-calorie-edit" required ></td>`)
  $(`td#${event.currentTarget.id}.food-calorie-field`).html(tableCell)
  $('#food-list').find(`#food-calorie-edit`).focus()
  $(`#food-calorie-edit`).on('focusout', function(exitEvent) {
    let calories = $('#food-calorie-edit').val()
    let foodInfo = {food:{calories}}
    updateExistingFood(foodInfo, exitEvent.target.parentElement.id)
    exitEvent.stopImmediatePropagation()
  });
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



const searchFunction = (event) => {

  // let input = $('#food-filter').val()
  // let listItems = $("tr")
  // let category = document.querySelector('.mw-category');
// let links = category.querySelectorAll('a')
// let links = Array.from(document.querySelectorAll(".mw-category a"));
// let de = links
//               .map(link => link.textContent)
//               .filter(streetName => streetName.includes('de'));


  // listItems.forEach(function)
  // for (i = 0; i < list.length; i++) {
  //   p = listItems[i].getElementsByTagName("p")[0]
  //   if (p.innerHTML.toUpperCase().indexOf(input > -1)) {
  //     listItems[i].style.display = ""
  //   } else {
  //     listItems[i].style.display = "none"
  //   }
  //   }
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

getFoodList()
