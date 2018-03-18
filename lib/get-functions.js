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
  if (a.id < b.id) return -1
  if (a.id > b.id) return 1
  return 0
}


getFoodList()
