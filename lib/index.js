var listener = require('./event-listeners')
var fetchMeals = require('./fetch-meals')
var fetchFoods = require('./fetch-foods')
var functions = require('./shared')

import {getFoodListMeal,
        populateFoodFromMeals} from './fetch-meals'
import {getFoodList} from './fetch-foods'

const loadFunctionsByPage = () => {
  let page = window.location.pathname
  if (page === "/foods.html") {
    getFoodList()
  } else if (page === "/index.html" || page === "/") {
      populateFoodFromMeals()
      getFoodListMeal()
    }
  }


loadFunctionsByPage()
