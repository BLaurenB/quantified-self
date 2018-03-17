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
	// var deleteStuff = require("./crud/delete")

	// import deleteStuff from 'path'

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	// Fetch call to get current API data
	// parse it
	// the append the DOM with new rows per element of JSON Hash

	var getFoodList = function getFoodList() {
	  $('#food-list').html('');
	  fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods').then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    myJson.reverse().forEach(function (obj) {
	      $('#food-list').append('\n      <tr>\n        <td>' + obj.name + '</td>\n        <td>' + obj.calories + '</td>\n        <td class="delete-food-button"><img src="./public/assets/gradient-x.png" width="30" height="auto" id=\'' + obj.id + '\'></td>\n      </tr>\n      ');
	    });
	  });
	};

	$('#food-list').on('click', '.delete-food-button', function (event) {
	  event.preventDefault();
	  event.target.parentElement.parentElement.remove();
	  getMeals(event.target.id);
	  deleteCall(event.target.id);
	});

	function deleteCall(id) {
	  return fetch('https://vast-retreat-17218.herokuapp.com/api/v1/foods/' + id, {
	    method: 'DELETE'
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	}

	var getMeals = function getMeals(foodId) {
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

	var postConfig = function postConfig(foodInfo) {
	  return {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(foodInfo)
	  };
	};

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

/***/ })
/******/ ]);