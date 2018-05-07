# Quantified-Self

Quantified Self is a calorie tracker that allows the user to add, edit, and remove foods from the /foods.html page, and add foods to a meal on the /meal.html page.


## Front End Development and Highlights
Please visit the [interactive version] (https://blaurenb.github.io/quantified-self/)

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


## The Back End
 Data is called from and saved to a back end hosted at: https://qs-backend-express.herokuapp.com/api/v1/meals
 
 The API was created from scratch in Express to mimic an existing Rails Back End. 
 See repo for more: [BackEnd](https://github.com/abarnes26/quantified-self-express-backend)

## Fork and Run this repo 
Start by forking and cloning this repo, then cd into the project directory.

### Set up and View via GitHub Pages 
In your terminal, run the following:
* `npm install` to install dependencies
* `npm run build` to create your main.bundle.js file
* `git push origin master` to push to your repo's master. 
* navigate to your repo's Settings Tab and scroll down to GitHubPages. Set your source as the master branch and save. This will load the pages via GitHub

### Run in development
To run this app locally, you will need to update any occurance of window.path in the project. Remove "quanitified-self" from the path name, but remember that you'll need to change it back when running in production.

In your terminal, run the following:
* `npm start` to start the development server
* navigate to http://localhost:8080 to checkout your nifty local version!


# Credits

## Front End Built With

* [Javascript](https://www.javascript.com/) 
* [jQuery](https://jquery.com/) 
* HTML5 and CSS


## Authors

* **Alex Barnes** [contact](https://github.com/abarnes26)
* **Lauren Billington** [contact](https://github.com/blaurenb)

## Original Assignment Details
This project is based on the following assignment from Turing School of Software and Design:

https://backend.turing.io/module4/projects/quantified-self/quantified-self


## License

This project is licensed under the MIT License 
















.
