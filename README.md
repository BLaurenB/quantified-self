# Quantified-Self: The Front End

This project is based on the following assignment from Turing School of Software and Design:
https://backend.turing.io/module4/projects/quantified-self/quantified-self

The starter repo contained some files which were mostly empty. HTML files had empty <body> elements, and .js files were empty.

 This project is a calorie tracker that allows the user to add, edit, and remove foods from the /foods.html page, and add foods to a meal on the /meal.html page.

## The Back End
 Data is called from and saved to a back end hosted at: https://qs-backend-express.herokuapp.com/api/v1/meals


## Project Development and Highlights
HTML has a limited structure; the majority of page elements are created as a result of fetch calls and which are used to append data and structure to the DOM without reloading the page.

#### Foods.html
* Users can create a new food
* Users can edit a food's name or caloric content by clicking on the text. Clicking away from the appended edit-able field will save the value (both on the page and in the database).
* Users can search for foods per keystroke to see an updated list

#### Index.html
* Users can search for foods per keystroke
* Users can select foods and add them to a meal
* Meal calorie totals are dynamically calculated and updated as foods are added or removed

#### AXE Accessibility
* HTML and CSS contain no accessibility violations

## Fork and Run this repo 












.
