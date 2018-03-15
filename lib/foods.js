// Fetch call to get current API data
// parse it
// the append the DOM with new rows per element of JSON Hash


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

