// Fetch call to get current API data
// parse it
// the append the DOM with new rows per element of JSON Hash


fetch("https://vast-retreat-17218.herokuapp.com/api/v1/foods")
  .then(response => response.json())
  .then(myJson => {
    console.log(myJson)
  })

