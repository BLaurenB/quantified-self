
$('.add-to-meal-btn').on('click', function(event) {
  event.preventDefault()
  let mealId = event.currentTarget.id
  let foods = []
  $('.food-checkbox').each(function() {
    if ($(this).is(":checked")) {
    foods.push($(this).attr('name'))
   }
  })
  foods.forEach(function (foodId) {
    fetch(`https://vast-retreat-17218.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, {
        method: 'POST'
    })
  })
})
