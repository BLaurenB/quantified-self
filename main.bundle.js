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

	'use strict';

	var listener = __webpack_require__(1);
	var fetchMeals = __webpack_require__(2);
	var fetchFoods = __webpack_require__(4);
	var functions = __webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _fetchMeals = __webpack_require__(2);

	var _fetchFoods = __webpack_require__(4);

	var _shared = __webpack_require__(3);

	var counter = 0;

	$('#food-list').on('click', '.delete-food-button', function (event) {
	  event.preventDefault();
	  var parent = event.target.parentElement.parentElement;
	  (0, _fetchMeals.findFoodsInMeals)(event.target.id, parent);
	});

	$('.meal-table').on('click', '.delete-meal-food-button', function (event) {
	  event.preventDefault();
	  var foodId = event.target.id;
	  var mealId = event.currentTarget.parentElement.id;
	  event.target.parentElement.parentElement.remove();
	  (0, _fetchMeals.deleteFoodFromMeals)(mealId, foodId);
	});

	$("#new-food-btn").click(function (event) {
	  event.preventDefault();
	  window.location = "./foods.html";
	});

	$('#food-list').on('click', '.food-name-field', function (event) {
	  (0, _fetchFoods.editAndUpdateCell)('name', event);
	});

	$('#food-list').on('click', '.food-calories-field', function (event) {
	  (0, _fetchFoods.editAndUpdateCell)('calories', event);
	});

	$('form').submit(function (event) {
	  event.preventDefault();
	  var name = $('#food-name-field').val();
	  var calories = $('#calories-field').val();
	  var foodInfo = { food: { name: name, calories: calories } };
	  (0, _fetchFoods.postNewFood)(foodInfo);
	  this.reset();
	});

	$('#food-filter').on('keyup', function (event) {
	  var input = event.currentTarget.value.toUpperCase();
	  var i = input.length;
	  var listItems = Array.from($('#food-list').find('tr'));

	  listItems.forEach(function (item) {
	    if (item.firstElementChild.textContent.toUpperCase().substr(0, i) != input) {
	      item.style.display = 'none';
	    } else {
	      item.style.display = '';
	    }
	  });
	});

	$("#calories-header").on('click', function (event) {
	  $('#food-list-meals').html('');
	  counter++;
	  if (counter === 1) {
	    (0, _fetchMeals.tableSorter)((0, _fetchMeals.foodListFunc)(), _shared.orderByAsc);
	  } else if (counter === 2) {
	    (0, _fetchMeals.tableSorter)((0, _fetchMeals.foodListFunc)(), _shared.orderByDesc);
	  } else {
	    (0, _fetchMeals.tableSorter)((0, _fetchMeals.foodListFunc)(), _shared.orderById);
	    counter = 0;
	  }
	});

	$('.add-to-meal-btn').on('click', function (event) {
	  event.preventDefault();
	  var mealId = event.currentTarget.id;
	  var foods = [];
	  (0, _shared.createFoodListFromCheckbox)($('.food-checkbox'), foods);
	  (0, _fetchMeals.pushFoodToMeals)(foods, mealId);
	  $('.food-checkbox').prop('checked', false);
	  $('.add-to-meal-btn').blur();
	});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _shared = __webpack_require__(3);

	var remainingCals = void 0;
	var remainingDailyCals = void 0;
	var totalCalCount = void 0;
	var foodList = void 0;
	var foodReference = void 0;

	// Delete foods from table and from meals

	var findFoodsInMeals = function findFoodsInMeals(foodId, parent) {
	  foodReference = false;
	  fetch('https://qs-backend-express.herokuapp.com/api/v1/meals').then(function (response) {
	    return response.json();
	  }).then(function (parsedResponse) {
	    parsedResponse.forEach(function (meal) {
	      meal.foods.forEach(function (food) {
	        if (food.id == foodId) {
	          foodReference = true;
	        }
	      });
	    });
	    if (foodReference) {
	      alert("This food is in a meal! \n \n \n Remove the food from all meals before deleting");
	    } else {
	      deleteFood(foodId);
	      parent.remove();
	    }
	  });
	};

	var deleteFood = function deleteFood(id) {
	  fetch('https://qs-backend-express.herokuapp.com/api/v1/foods/' + id, {
	    method: 'DELETE'
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var deleteFoodFromMeals = function deleteFoodFromMeals(mealID, foodId) {
	  fetch('https://qs-backend-express.herokuapp.com/api/v1/meals/' + mealID + '/foods/' + foodId, { method: 'DELETE' }).then(function () {
	    return populateFoodFromMeals();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	// Add Foods rows to Meal tables on Meal page

	var populateFoodFromMeals = function populateFoodFromMeals() {
	  fetch('https://qs-backend-express.herokuapp.com/api/v1/meals').then(function (response) {
	    return response.json();
	  }).then(function (parsedResponse) {
	    totalCalCount = 0;
	    parseMealsAndAppendFoods(parsedResponse);
	    remainingDailyCals = 2000 - totalCalCount;
	    $("#toats-table").html('');
	    $("#toats-table").append(totalCaloriesDiaryHtml(totalCalCount, remainingDailyCals));
	    (0, _shared.colorCals)(remainingDailyCals, "#total-consumed-cals");
	    (0, _shared.colorCals)(remainingDailyCals, "#total-remaining-cals");
	  });
	};

	var parseMealsAndAppendFoods = function parseMealsAndAppendFoods(mealCollection) {
	  mealCollection.forEach(function (meal) {
	    $('#' + meal.name.toLowerCase() + '-table').html('');
	    appendFoodRow(meal);
	    remainingCals = _shared.mealTotalCalories[meal.name.toLowerCase()] - (0, _shared.toatsCals)(meal);
	    $('.' + meal.name.toLowerCase() + '-table-calories').html('');
	    $('.' + meal.name.toLowerCase() + '-table-calories').append(totalCaloriesMealHtml(meal));
	    (0, _shared.colorCals)(remainingCals, '#' + meal.name.toLowerCase() + '-remaining-calories');
	  });
	};

	var appendFoodRow = function appendFoodRow(meal) {
	  meal.foods.forEach(function (food) {
	    totalCalCount += food.calories;
	    $('#' + meal.name.toLowerCase() + '-table').append(mealTableRowHtml(meal, food));
	  });
	};

	// Create Food list at the bottom of Meal Page

	var getFoodListMeal = function getFoodListMeal() {
	  $('#food-list-meals').html('');
	  return fetch('https://qs-backend-express.herokuapp.com/api/v1/foods').then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    return foodListAssigner(myJson);
	  }).then(function () {
	    return tableSorter(foodList, _shared.orderById);
	  });
	};

	var tableSorter = function tableSorter(foodCollection, order) {

	  foodCollection.sort(order).forEach(function (food) {
	    $('#food-list-meals').append(foodTableRowIndexHtml(food));
	  });
	};

	var foodListAssigner = function foodListAssigner(myJson) {
	  foodList = myJson;
	};

	var foodListFunc = function foodListFunc() {
	  return foodList;
	};

	var pushFoodToMeals = function pushFoodToMeals(foods, mealId) {
	  foods.forEach(function (foodId) {
	    fetch('https://qs-backend-express.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, {
	      method: 'POST'
	    }).then(function () {
	      return populateFoodFromMeals();
	    });
	  });
	};

	// Html for Meals page

	var totalCaloriesDiaryHtml = function totalCaloriesDiaryHtml(totalCalCount, remainingDailyCals) {
	  return ' <tr id="goal-calories">\n              <td><p>Goal Calories</p></td>\n              <td><p>2000</p></td>\n            </tr>\n            <tr id="consumed-calories">\n              <td><p>Consumed Calories</p></td>\n              <td id="total-consumed-cals"><p>' + totalCalCount + '</p></td>\n            </tr>\n            <tr id="remaining-total-calories">\n              <td><p>Remaining Calories</p></td>\n              <td id="total-remaining-cals"><p>' + remainingDailyCals + '</p></td>\n            </tr>\n';
	};

	var totalCaloriesMealHtml = function totalCaloriesMealHtml(meal) {
	  return '<tr>\n            <td> Total Calories </td>\n            <td> ' + (0, _shared.toatsCals)(meal) + ' </td>\n          </tr>\n          <tr>\n            <td> Remaining Calories </td>\n            <td id="' + meal.name.toLowerCase() + '-remaining-calories"> ' + remainingCals + '</td>\n          </tr>\n          ';
	};

	var mealTableRowHtml = function mealTableRowHtml(meal, food) {
	  return '<tr class="' + meal.name + '-list-item" id=\'' + meal.id + '\'>\n            <td class="' + meal.name + '-name-field" id=\'' + food.id + '\'><p>' + food.name + '</p></td>\n            <td class="' + meal.name + '-calorie-field" id=\'' + food.id + '\'><p>' + food.calories + '</p></td>\n            <td class="delete-meal-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id=\'' + food.id + '\'></td>\n          </tr>\n         ';
	};

	var foodTableRowIndexHtml = function foodTableRowIndexHtml(food) {
	  return '<tr class="food-list-item" id=\'' + food.id + '\'>\n            <td><input type="checkbox" class=\'food-checkbox\' name=\'' + food.id + '\'></td>\n            <td class="food-name-field" id=\'' + food.id + '\'><p>' + food.name + '</p></td>\n            <td class="food-calories-field" id=\'' + food.id + '\'><p>' + food.calories + '</p></td>\n          </tr>\n          ';
	};
	module.exports = {
	  deleteFood: deleteFood,
	  findFoodsInMeals: findFoodsInMeals,
	  deleteFoodFromMeals: deleteFoodFromMeals,
	  populateFoodFromMeals: populateFoodFromMeals,
	  foodList: foodList,
	  foodListAssigner: foodListAssigner,
	  foodListFunc: foodListFunc,
	  tableSorter: tableSorter,
	  pushFoodToMeals: pushFoodToMeals
	};

	populateFoodFromMeals();
	getFoodListMeal();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	var mealTotalCalories = {
	  snack: 200,
	  breakfast: 400,
	  lunch: 600,
	  dinner: 800
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

	var orderById = function orderById(a, b) {
	  if (a.id < b.id) {
	    return -1;
	  } else if (a.id > b.id) {
	    return 1;
	  } else {
	    return 0;
	  }
	};
	var orderByAsc = function orderByAsc(a, b) {
	  if (a.calories < b.calories) {
	    return -1;
	  } else if (a.calories > b.calories) {
	    return 1;
	  } else {
	    return 0;
	  }
	};
	var orderByDesc = function orderByDesc(a, b) {
	  if (a.calories < b.calories) {
	    return 1;
	  } else if (a.calories > b.calories) {
	    return -1;
	  } else {
	    return 0;
	  }
	};

	var createFoodListFromCheckbox = function createFoodListFromCheckbox(list, foods) {
	  list.each(function () {
	    if ($(this).is(":checked")) {
	      foods.push($(this).attr('name'));
	    }
	  });
	};

	module.exports = { mealTotalCalories: mealTotalCalories,
	  colorCals: colorCals,
	  toatsCals: toatsCals,
	  orderById: orderById,
	  orderByAsc: orderByAsc,
	  orderByDesc: orderByDesc,
	  createFoodListFromCheckbox: createFoodListFromCheckbox };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _shared = __webpack_require__(3);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// Get foods for initial page load

	var getFoodList = function getFoodList() {
	  $('#food-list').html('');
	  fetch('https://qs-backend-express.herokuapp.com/api/v1/foods').then(function (response) {
	    return response.json();
	  }).then(parseAndAppendFoods);
	};

	var parseAndAppendFoods = function parseAndAppendFoods(foodList) {
	  foodList.sort(_shared.orderById).forEach(function (food) {
	    $('#food-list').append(foodTableRowFoodsHtml(food));
	  });
	};

	// Update foods
	var editAndUpdateCell = function editAndUpdateCell(attribute, event) {
	  editCell(attribute, event);
	  $('#food-list').find('#food-' + attribute + '-edit').focus();
	  $('#food-' + attribute + '-edit').on('focusout', function (exitEvent) {
	    updateCellAndDB(attribute, exitEvent);
	  });
	};

	var editCell = function editCell(attribute, event) {
	  $('td#' + event.currentTarget.id + '.food-' + attribute + '-field').html(tableCellHTML(attribute, event));
	};

	var updateCellAndDB = function updateCellAndDB(attribute, exitEvent) {
	  var value = $('#food-' + attribute + '-edit').val();
	  var foodInfo = { food: _defineProperty({}, attribute, value) };
	  updateExistingFood(foodInfo, exitEvent.target.parentElement.id);
	  exitEvent.stopImmediatePropagation();
	};

	var updateExistingFood = function updateExistingFood(foodInfo, foodId) {
	  fetch('https://qs-backend-express.herokuapp.com/api/v1/foods/' + foodId, fetchConfig(foodInfo, "PATCH")).then(processResponse).then(getFoodList).catch(errorLog);
	};

	//Post New Food

	var postNewFood = function postNewFood(foodInfo) {
	  fetch('https://qs-backend-express.herokuapp.com/api/v1/foods', fetchConfig(foodInfo, "POST")).then(processResponse).then(getFoodList).catch(errorLog);
	};

	// Configs

	var fetchConfig = function fetchConfig(foodInfo, verb) {
	  return {
	    method: verb,
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(foodInfo)
	  };
	};

	// Procesing and Error Handling

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

	// HTML for Food Page

	var foodTableRowFoodsHtml = function foodTableRowFoodsHtml(food) {
	  return '<tr class="food-list-item" id=\'' + food.id + '\'>\n  <td class="food-name-field" id=\'' + food.id + '\'><p>' + food.name + '</p></td>\n  <td class="food-calories-field" id=\'' + food.id + '\'><p>' + food.calories + '</p></td>\n  <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id=\'' + food.id + '\'></td>\n  </tr>\n  ';
	};

	var tableCellHTML = function tableCellHTML(attribute, event) {
	  return $('<td class="food-' + attribute + '-field" id=\'' + event.currentTarget.id + '\'>\n  <input type="text" ' + attribute + '="food-' + attribute + '" value="' + event.target.textContent + '"\n  id="food-' + attribute + '-edit" required >\n  </td>');
	};

	getFoodList();

	module.exports = {
	  getFoodList: getFoodList,
	  editAndUpdateCell: editAndUpdateCell,
	  editCell: editCell,
	  updateCellAndDB: updateCellAndDB,
	  updateExistingFood: updateExistingFood,
	  postNewFood: postNewFood
	};

/***/ })
/******/ ]);
