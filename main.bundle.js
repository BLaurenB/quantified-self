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

	var _fetchMeals = __webpack_require__(1);

	var _fetchFoods = __webpack_require__(3);

	var listener = __webpack_require__(4);
	var fetchMeals = __webpack_require__(1);
	var fetchFoods = __webpack_require__(3);
	var functions = __webpack_require__(2);
	var css = __webpack_require__(5);

	var loadFunctionsByPage = function loadFunctionsByPage() {
	  var page = window.location.pathname;
	  if (page === "/foods.html") {
	    (0, _fetchFoods.getFoodList)();
	  } else if (page === "/index.html" || page === "/") {
	    (0, _fetchMeals.populateFoodFromMeals)();
	    (0, _fetchMeals.getFoodListMeal)();
	  }
	};

	loadFunctionsByPage();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _shared = __webpack_require__(2);

	var remainingCals = void 0;
	var remainingDailyCals = void 0;
	var totalCalCount = void 0;
	var foodList = void 0;
	var foodReference = void 0;

	// Delete foods from table and from meals

	var findFoodsInMeals = function findFoodsInMeals(foodId, parent) {
	  foodReference = false;
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals').then(function (response) {
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
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods/' + id, {
	    method: 'DELETE'
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var deleteFoodFromMeals = function deleteFoodFromMeals(mealID, foodId) {
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals/' + mealID + '/foods/' + foodId, { method: 'DELETE' }).then(function () {
	    return populateFoodFromMeals();
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	// Add Foods rows to Meal tables on Meal page

	var populateFoodFromMeals = function populateFoodFromMeals() {
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals').then(function (response) {
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
	  return fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods').then(function (response) {
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
	    fetch('https://vast-retreat-17218.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, {
	      method: 'POST'
	    }).then(function () {
	      return populateFoodFromMeals();
	    });
	  });
	};

	// Html for Meals page

	var totalCaloriesDiaryHtml = function totalCaloriesDiaryHtml(totalCalCount, remainingDailyCals) {
	  return ' <thead>\n              <tr id="goal-calories">\n                <td><p>Goal Calories</p></td>\n                <td> </td>\n                <td><p>2000</p></td>\n              </tr>\n            </thead>\n            <tbody>\n              <tr id="consumed-calories">\n                <td><p>Consumed Calories</p></td>\n                <td></td>\n                <td id="total-consumed-cals"><p>' + totalCalCount + '</p></td>\n              </tr>\n            <tfoot>\n              <tf id="remaining-total-calories">\n                <td><p>Remaining Calories</p></td>\n                <td></td>\n                <td id="total-remaining-cals"><p>' + remainingDailyCals + '</p></td>\n              </tf>\n            </tfoot>\n';
	};

	var totalCaloriesMealHtml = function totalCaloriesMealHtml(meal) {
	  return '<tr>\n            <td> Total Calories </td>\n            <td> ' + (0, _shared.toatsCals)(meal) + ' </td>\n            <td></td>\n            </tr>\n            <tr>\n            <td> Remaining Calories </td>\n            <td id="' + meal.name.toLowerCase() + '-remaining-calories"> ' + remainingCals + '</td>\n            <td></td>\n          </tr>\n          ';
	};

	var mealTableRowHtml = function mealTableRowHtml(meal, food) {
	  return '<tr class="' + meal.name + '-list-item" id=\'' + meal.id + '\'>\n            <td class="' + meal.name + '-name-field" id=\'' + food.id + '\'><p>' + food.name + '</p></td>\n            <td class="' + meal.name + '-calorie-field" id=\'' + food.id + '\'><p>' + food.calories + '</p></td>\n            <td class="delete-meal-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id=\'' + food.id + '\'></td>\n          </tr>\n         ';
	};

	var foodTableRowIndexHtml = function foodTableRowIndexHtml(food) {
	  return '<tr class="food-list-item" id=\'' + food.id + '\'>\n            <td><input type="checkbox" class=\'food-checkbox\' name=\'' + food.id + '\'></td>\n            <td class="food-name-field" id=\'' + food.id + '\'><p>' + food.name + '</p></td>\n            <td class="food-calories-field" id=\'' + food.id + '\'><p>' + food.calories + '</p></td>\n            <td></td>\n          </tr>\n          ';
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
	  pushFoodToMeals: pushFoodToMeals,
	  getFoodListMeal: getFoodListMeal
	};

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _shared = __webpack_require__(2);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// Get foods for initial page load

	var getFoodList = function getFoodList() {
	  $('#food-list').html('');
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods').then(function (response) {
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
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods/' + foodId, fetchConfig(foodInfo, "PATCH")).then(processResponse).then(getFoodList).catch(errorLog);
	};

	//Post New Food

	var postNewFood = function postNewFood(foodInfo) {
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods', fetchConfig(foodInfo, "POST")).then(processResponse).then(getFoodList).catch(errorLog);
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
	  return '<tr class="food-list-item" id=\'' + food.id + '\'>\n  <td class="food-name-field" id=\'' + food.id + '\'><p>' + food.name + '</p></td>\n  <td class="food-calories-field" id=\'' + food.id + '\'><p>' + food.calories + '</p></td>\n  <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id=\'' + food.id + '\' alt=\'delete\'></td>\n  </tr>\n  ';
	};

	var tableCellHTML = function tableCellHTML(attribute, event) {
	  return $('<td class="food-' + attribute + '-field" id=\'' + event.currentTarget.id + '\'>\n  <input type="text" ' + attribute + '="food-' + attribute + '" value="' + event.target.textContent + '"\n  id="food-' + attribute + '-edit" required >\n  </td>');
	};

	module.exports = {
	  getFoodList: getFoodList,
	  editAndUpdateCell: editAndUpdateCell,
	  editCell: editCell,
	  updateCellAndDB: updateCellAndDB,
	  updateExistingFood: updateExistingFood,
	  postNewFood: postNewFood
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _fetchMeals = __webpack_require__(1);

	var _fetchFoods = __webpack_require__(3);

	var _shared = __webpack_require__(2);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./stylesheets.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./stylesheets.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "/*\n*= require main\n*/\n\n\nbody {\nfont-family: \"Aldrich\", sans-serif;}\n\ntable {\n  border: 1px black solid;\n  border-collapse: collapse;\n}\ntd {\n  padding: 50px;\n}\n\ntable thead tr {\n  background-color:#ffdb11;\n}\ntable tfoot tr {\n  background-color:#ffdb1149;\n}\n\n#meal-foods-container {\n  display: flex;\n  flex-flow:row;\n  justify-content: space-around;\n  width: 75%;\n  margin-left: 10%;\n}\n\n.add-to-meal-btns {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  width: 250px;\n  justify-content: space-between;\n}\n\n.add-to-meal-btn {\n  margin: 8px 0px;\n  width: 105px;\n}\n\n#new-food-btn {\n  justify-content: center;\n}\n\n#food-main-page-container {\n  align-items: center;\n}\n\n.link-and-filter-container {\n  display: inline-flex;\n  justify-content: space-around;\n  width: 250px;\n}\n\n#food-filter {\n  background-color: #b1e5ef\n}\n\n#nav-bar-foods {\n  display: flex;\n  justify-content: flex-end;\n}\n\nbutton {\n  border-radius: 15px;\n  font-family: ‘Josefin Sans’, sans-serif;\n}\n\n.add-to-meal-btn-breakfast {\n  padding: 5px 7px;\n  background-color: #FFF7A5;\n  margin: 8px 0px;\n  width: 105px;\n}\n\n.add-to-meal-btn-lunch {\n  padding: 5px 7px;\n  background-color: #89C1AF;\n  margin: 8px 0px;\n  width: 105px;\n}\n\n.add-to-meal-btn-dinner {\n  padding: 5px 7px;\n  background-color: #80B3DD;\n  margin: 8px 0px;\n  width: 105px;\n}\n\n.add-to-meal-btn-snack {\n  padding: 5px 7px;\n  background-color: #E1BC29;\n  margin: 8px 0px;\n  width: 105px;\n}", ""]);

	// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);