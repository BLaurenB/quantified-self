$('#food-list').on('click', '.delete-food-button', function (event) {
  event.preventDefault()
  event.target.parentElement.parentElement.remove()
  getMeals(event.target.id)
  deleteCall(event.target.id)
})
