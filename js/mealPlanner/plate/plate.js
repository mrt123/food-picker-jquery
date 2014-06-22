define(
    [
        "jquery",
        "handlebars",
        "text!./plate.html",
        "mealPlanner/plate/PlateDOM",
        "mealPlanner/FoodItem/FoodItem"
    ],
    function ($, handlebars, html, DOM, FoodItem) {

        return function(parentEl, data, foodSelection) {
            var self =  {

                init: function(parentEl, data, foodSelection){

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
                    parentEl.append(htmlWithData);
                },

                addNewFoodItem: function(){
                    var foodItem = new FoodItem(
                        this.element.find(".summary").first(),
                        foodSelection,
                        data,
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
            self.init(parentEl, data, foodSelection);
            return self;
        };
    }
);