define(
    [
        "jquery",
        "handlebars",
        "text!./plate.html",
        "mealPlanner/plate/PlateDOM",
        "mealPlanner/FoodItem/FoodItem",
    ],
    function ($, handlebars, html, DOM, FoodItem) {

        return {

            parentEl: $("#plateHolder"),  // TODO: move to app!

            init: function(app){
                this.data = app.data;
                this.foodSelection = app.keys;

                this.loadTemplate();
                this.onDOMReady();
                this.DOM = new DOM(this.element);

                this.foodItems = [];   // tracks FoodItem instances visible in the table;
                this.addNewFoodItem();
            },

            onDOMReady: function() {
                this.element = $("#plate");
            },

            loadTemplate: function(){
                var template = Handlebars.compile(html);
                var htmlWithData = template();
                this.parentEl.append(htmlWithData);
            },

            addNewFoodItem: function(){
                var foodItem = new FoodItem(
                    this.element.find("tbody"),
                    this.foodSelection,
                    this.data,
                    this.onFoodUpdate.bind(this)
                );
                this.foodItems.push(foodItem);
            },

            onFoodUpdate: function(foodItem, change){
                if (change.firstSelect) {
                    this.addNewFoodItem();  // add another blank foodItem!
                }

                if (change.remove) {
                    this.removeFood(foodItem);
                }

                if (change.updatedSelect) {
                }

                this.updateSummary();
            },

            removeFood: function(foodItem) {
                this.foodItems.splice(this.foodItems.indexOf(foodItem), 1);
                if (this.foodItems.length === 1) {
                    this.foodItems[0].setInputPlaceHolder('choose your food');
                }
            },

            updateSummary: function () {
                var totalDisplayScope = this.DOM.getTotalDisplayScope(this.foodItems);
                this.DOM.updateSummary(totalDisplayScope);
            }
        };
    }
);