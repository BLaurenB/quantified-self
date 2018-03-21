/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var foods = __webpack_require__(1);
	var meals = __webpack_require__(2);
	// var deleteStuff = require("./crud/delete")

	// import deleteStuff from 'path'

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var getFoodList = function getFoodList() {
	  $('#food-list').html('');
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods').then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    myJson.sort(orderById).forEach(function (obj) {
	      $('#food-list').append('\n      <tr class="food-list-item" id=\'' + obj.id + '\'>\n        <td class="food-name-field" id=\'' + obj.id + '\'><p>' + obj.name + '</p></td>\n        <td class="food-calorie-field" id=\'' + obj.id + '\'><p>' + obj.calories + '</p></td>\n        <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id=\'' + obj.id + '\'></td>\n      </tr>\n      ');
	    });
	  });
	};

	var orderById = function orderById(a, b) {
	  if (a.id < b.id) return -1;
	  if (a.id > b.id) return 1;
	  return 0;
	};

	$('#food-list').on('click', '.delete-food-button', function (event) {
	  event.preventDefault();
	  event.target.parentElement.parentElement.remove();
	  findFoodsInMeals(event.target.id);
	  deleteFood(event.target.id);
	});

	$('#food-list').on('click', '.food-name-field', function (event) {
	  var tableCell = $('<td class="food-name-field" id=\'' + event.currentTarget.id + '\'><input type="text" name="food-name" value="' + event.target.textContent + '"\n  id="food-name-edit" required ></td>');
	  $('td#' + event.currentTarget.id + '.food-name-field').html(tableCell);
	  $('#food-list').find('#food-name-edit').focus();
	  $('#food-name-edit').on('focusout', function (exitEvent) {
	    var name = $('#food-name-edit').val();
	    var foodInfo = { food: { name: name } };
	    updateExistingFood(foodInfo, exitEvent.target.parentElement.id);
	    exitEvent.stopImmediatePropagation();
	  });
	});

	$('#food-list').on('click', '.food-calorie-field', function (event) {
	  var tableCell = $('<td class=\'.food-calorie-field\' id=\'' + event.currentTarget.id + '\'><input type="text" name="food-calorie" value="' + event.target.textContent + '"\n  id="food-calorie-edit" required ></td>');
	  $('td#' + event.currentTarget.id + '.food-calorie-field').html(tableCell);
	  $('#food-list').find('#food-calorie-edit').focus();
	  $('#food-calorie-edit').on('focusout', function (exitEvent) {
	    var calories = $('#food-calorie-edit').val();
	    var foodInfo = { food: { calories: calories } };
	    updateExistingFood(foodInfo, exitEvent.target.parentElement.id);
	    exitEvent.stopImmediatePropagation();
	  });
	});

	function deleteFood(id) {
	  return fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods/' + id, {
	    method: 'DELETE'
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	}

	var findFoodsInMeals = function findFoodsInMeals(foodId) {
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals').then(function (response) {
	    return response.json();
	  }).then(function (parsedResponse) {
	    parsedResponse.forEach(function (element) {
	      element.foods.forEach(function (food) {
	        // this is an array
	        if (food.id == foodId) {
	          deleteFoodFromMeals(element.id, food.id);
	        }
	      });
	    });
	  });
	};

	var deleteFoodFromMeals = function deleteFoodFromMeals(mealID, foodId) {
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals/' + mealID + '/foods/' + foodId, { method: 'DELETE' }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	$("form").submit(function (event) {
	  event.preventDefault();
	  var name = $('#food-name-field').val();
	  var calories = $('#calories-field').val();
	  var foodInfo = { food: { name: name, calories: calories } };
	  postNewFood(foodInfo);
	  this.reset();
	});

	var postNewFood = function postNewFood(foodInfo) {
	  fetch("https://vast-retreat-17218.herokuapp.com/api/v1/foods", postConfig(foodInfo)).then(processResponse).then(getFoodList).catch(errorLog);
	};

	var updateExistingFood = function updateExistingFood(foodInfo, foodId) {
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods/' + foodId, updateConfig(foodInfo)).then(processResponse).then(getFoodList).catch(errorLog);
	};

	var updateConfig = function updateConfig(foodInfo) {
	  return {
	    method: 'PATCH',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(foodInfo)
	  };
	};

	var postConfig = function postConfig(foodInfo) {
	  return {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(foodInfo)
	  };
	};

	var searchFunction = function searchFunction(event) {

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
	};

	$('#food-filter').on('keyup', function (event) {
	  var input = event.currentTarget.value.toUpperCase();
	  var i = input.length;
	  var listItems = Array.from($("#food-list").find("tr"));

	  listItems.forEach(function (item) {
	    if (item.firstElementChild.textContent.toUpperCase().substr(0, i) != input) {
	      item.style.display = 'none';
	    } else {
	      item.style.display = '';
	    }
	  });
	});

	var processResponse = function processResponse(response) {
	  return response.json().then(function (json) {
	    if (!response.ok) {
	      var _error = {
	        status: response.status,
	        statusText: response.statusText,
	        json: json
	      };
	      return Promise.reject(_error);
	    }
	    return json;
	  });
	};

	var errorLog = function errorLog() {
	  console.error({ error: error });
	};

	getFoodList();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var totalCalCount = 0;
	var remainingCals = void 0;
	var remainingDailyCals = void 0;

	var populateFoodFromMeals = function populateFoodFromMeals(foodId) {
	  $('#breakfast-table', '#lunch-table', '#dinner-table', '#snack-table').html('');
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals').then(function (response) {
	    return response.json();
	  }).then(function (parsedResponse) {
	    parsedResponse.forEach(function (meal) {
	      meal.foods.forEach(function (food) {
	        totalCalCount += food.calories;
	        $('#' + meal.name.toLowerCase() + '-table').append('\n            <tr class="' + meal.name + '-list-item" id=\'' + food.id + '\'>\n            <td class="' + meal.name + '-name-field" id=\'' + food.id + '\'><p>' + food.name + '</p></td>\n            <td class="' + meal.name + '-calorie-field" id=\'' + food.id + '\'><p>' + food.calories + '</p></td>\n            <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id=\'' + food.id + '\'></td>\n            </tr>\n            ');
	      });
	      remainingCals = mealTotalCalories[meal.name.toLowerCase()] - toatsCals(meal);
	      $('.' + meal.name.toLowerCase() + '-table-calories').append('\n          <tr>\n          <td> Total Calories </td>\n          <td> ' + toatsCals(meal) + ' </td>\n          </tr>\n          <tr>\n          <td> Remaining Calories </td>\n          <td id="' + meal.name.toLowerCase() + '-remaining-calories"> ' + remainingCals + '</td>\n          </tr>\n          ');
	      colorCals(remainingCals, '#' + meal.name.toLowerCase() + '-remaining-calories');
	    });
	    remainingDailyCals = 2000 - totalCalCount;
	    $("#toats-table").append('\n      <tr id="goal-calories">\n        <td><p>Goal Calories</p></td>\n        <td><p>2000</p></td>\n      </tr>\n      <tr id="consumed-calories">\n        <td><p>Consumed Calories</p></td>\n        <td id="total-consumed-cals"><p>' + totalCalCount + '</p></td>\n      </tr>\n      <tr id="remaining-total-calories">\n        <td><p>Remaining Calories</p></td>\n        <td id="total-remaining-cals"><p>' + remainingDailyCals + '</p></td>\n      </tr>\n      ');
	    colorCals(remainingDailyCals, "#total-consumed-cals");
	    colorCals(remainingDailyCals, "#total-remaining-cals");
	  });
	};

	var colorCals = function colorCals(calories, cssElement) {
	  if (calories < 0) {
	    $(cssElement).css('color', 'red');
	  } else {
	    $(cssElement).css('color', 'green');
	  }
	};

	var toatsCals = function toatsCals(meal) {
	  var total = meal.foods.reduce(function (sum, food) {
	    return sum += food.calories;
	  }, 0);
	  return total;
	};

	var getFoodList = function getFoodList() {
	  $('#food-list-meals').html('');
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods').then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    myJson.sort(orderById).forEach(function (obj) {
	      $('#food-list-meals').append('\n      <tr class="food-list-item" id=\'' + obj.id + '\'>\n        <td><input type="checkbox" name=\'' + obj.id + '\'></td>\n        <td class="food-name-field" id=\'' + obj.id + '\'><p>' + obj.name + '</p></td>\n        <td class="food-calorie-field" id=\'' + obj.id + '\'><p>' + obj.calories + '</p></td>\n      </tr>\n      ');
	    });
	  });
	};

	$("#new-food-btn").click(function (event) {
	  event.preventDefault();
	  window.location = "/foods.html";
	});

	// vvv Duplicate event listener from foods.html vvv
	$('#food-filter').on('keyup', function (event) {
	  var input = event.currentTarget.value.toUpperCase();
	  var i = input.length;
	  var listItems = Array.from($("#food-list").find("tr"));

	  listItems.forEach(function (item) {
	    if (item.firstElementChild.textContent.toUpperCase().substr(0, i) != input) {
	      item.style.display = 'none';
	    } else {
	      item.style.display = '';
	    }
	  });
	});

	var orderById = function orderById(a, b) {
	  if (a.id < b.id) return -1;
	  if (a.id > b.id) return 1;
	  return 0;
	};

	var mealTotalCalories = {
	  snack: 200,
	  breakfast: 400,
	  lunch: 600,
	  dinner: 800
	};

	populateFoodFromMeals();
	getFoodList();

/***/ })
/******/ ]);