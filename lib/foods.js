// Fetch call to get current API data
// parse it
// the append the DOM with new rows per element of JSON Hash

const getFoodList = () => {
  $("#food-list").html("")
  fetch("https://vast-retreat-17218.herokuapp.com/api/v1/foods")
  .then(response => response.json())
  .then(myJson => {
    myJson.forEach(function(obj) { 
    $("#food-list").append(`
    <tr>
      <td>${obj.name}</td>
      <td>${obj.calories}</td>
      <td class="delete-food-button"><img src="./lib/gradient-x.png" width="30" height="auto" id='${obj.id}'></a></td>
    </tr>
    `)
    }
  )}
)
}

//turn this into anamed function to include in index.js
$("#food-list").on("click", ".delete-food-button", function(event) {
  event.target.parentNode.remove()
  getMeals(event.target.id)
  // deleteCall(event.target.id)

})

// function deleteCall(id) {
//   // Default options are marked with *
//   return fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/foods/${id}`, {
//     // headers: {
//     // 'content-type': 'application/json'
//     // },
//     method: "DELETE",
//     mode: 'cors' // no-cors, cors, *same-origin
   
//   }).catch(console.log("FAIL"))
// }


//when deleting, need to delete the food, but first delete all meal_foods where the food id is...
//need to do a GET to meals, 
// parse and search for the food name or id, 
//then delete the occurances in meals (api.v1/meal:id/foods/:id), 
//and then delete the food at api/v1/foods:id

const getMeals = (foodId) => {
  fetch("https://vast-retreat-17218.herokuapp.com/api/v1/meals")
  .then(response => response.json())
  .then(parsedResponse => { 
    parsedResponse.forEach(function(element) {
      element.foods.forEach(function(food){  //this is an array
        if (food.id == foodId) {
          console.log(food)
         }      
      }) 

      // fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/meals/${element.id}/foods/${foodId}`)
    })
  })
}

//----------------------------
//adding a food via the page
//form is made. need to collect data from the form
//take data from the form and funnel it to a post request.
//initiate a new GET that updates all the foods.

// const functNameHere = (args) => {
//stuff
// }



$("form").submit(function( event ) {
  event.preventDefault()
  let name = $('#food-name-field').val()
  let calories = $('#calories-field').val()
  let foodInfo = {food:{name, calories}}
  postNewFood(foodInfo) 
})

const postNewFood = (foodInfo) => {
  let url = "https://vast-retreat-17218.herokuapp.com/api/v1/foods"
  fetch(url, postConfig(foodInfo)) //make POST request
  .then((response => function(response) {
    if (!response.ok) {
      return response.json
    }else {
      const error = {
        status: repsonse.status,
        statusText: response.statusText,
        json
      }
      return Promise.reject(error)      
    }
  })) 
  .then(getFoodList) //re-generate the list on the page
  .catch(errorLog())
}

const postConfig = (foodInfo) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(foodInfo)
  }
}


const processResponse = (response) => {
  // return response.json(); {  //WHYYYYY??? ...the ';'
    if (!response.ok) {
      const error = {
        status: repsonse.status,
        statusText: response.statusText,
        json
      }
      return Promise.reject(error)
    }
    return json

}

const errorLog = (error) => { console.error(error)}

getFoodList()