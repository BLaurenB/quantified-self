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
      <td id="delete-obj-${obj.id}"><img src="./lib/gradient-x.png" width="30" height="auto"></a></td>
    </tr>
    `)
    }
  )}
)

$("#food-list").on("click", this, function(event) {
  console.log(this)
  console.log(event)

parentElement:td#delete-obj-1
parentNode:td#delete-obj-1


})

function deleteCall(id) {
  // Default options are marked with *
  return fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/foods/${id}`, {
    headers: {
      // 'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: "DELETE",
    mode: 'cors' // no-cors, cors, *same-origin
   
  }).catch(console.log("FAIL"))
}
