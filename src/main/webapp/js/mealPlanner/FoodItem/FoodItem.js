define(
    [
        "jquery",
        "handlebars",
        "text!./FoodItem.html",
        "mealPlanner/FoodItem/FoodItemDOM",
        "mealPlanner/FoodSelector/FoodSelector",
    ],
    function ($, handlebars, html, DOM, FoodSelector) {

        return function (parentElement, foodSelection, data, stateChangeCallback) {

            var self = {
                CHANGE: function(changeType){

                    var CHANGE = {
                        firstSelect: false,
                        updatedSelect: false,
                        remove: false
                    };

                    for (var key in CHANGE) {
                        if (key === changeType){
                            CHANGE[key] = true;
                        }
                    }

                    return CHANGE;
                },

                init: function (parentElement, foodSelection, data, stateChangeCallback) {
                    this.parentElement = parentElement;
                    this.foodSelection = foodSelection;
                    this.data = data;
                    this.stateChangeCallback = stateChangeCallback;

                    this.id = this.getUniqueId();
                    this.DISPLAY_DATA = this.createDisplayScope(this.id);

                    this.loadTemplate(this.DISPLAY_DATA);
                    this.onDOMReady();
                    this.DOM = new DOM(this.element);

                    this.matchedIndex = -1;
                    this.amount = 100;
                },

                getUniqueId: function(){
                    // traverse DOM for existing ID's, to find next available ID!
                    var id = 0;
                    while ($('#foodItem_' + id).length !== 0) {
                        id++;
                    }
                    return id;
                },

                createDisplayScope: function (id) {
                    return {
                        FOOD_OPTIONS: this.foodSelection,
                        id: "foodItem_" + id
                    };
                },

                loadTemplate: function (displayData) {
                    var template = Handlebars.compile(html);
                    var htmlWithData = template(displayData);
                    this.parentElement.children().last().before(htmlWithData);
                },

                onDOMReady: function () {
                    this.element = $('#' + this.DISPLAY_DATA.id);
                    this.element.stop().show(200, 'swing');

                    var foodSelectorParentEl = this.element.find('.firstColumnCell');
                    this.foodSelector = new FoodSelector(foodSelectorParentEl, this.DISPLAY_DATA, this.loadFood, this);

                    this.element.find(".amountSelector").on('input', function (event) {
                        this.amount = event.target.value;
                        this.stateChangeCallback(this, this.CHANGE('updatedSelect'));

                        this.DOM.loadFood(this.data[this.matchedIndex], this.amount);
                    }.bind(this));

                    this.deleteFoodEl = this.element.find(".deleteFood");
                    this.deleteFoodEl.on('click', function (e) {
                        this.remove();
                    }.bind(this));
                } ,

                loadFood: function(index){
                    var currentFood = this.data[index];

                    this.DOM.loadFood(currentFood, this.amount);

                    // if this item was previously empty!
                    if(this.matchedIndex == -1){
                        this.matchedIndex = index;   // update index before callback!
                        this.stateChangeCallback(this, this.CHANGE('firstSelect')); // callback to parent!
                    }
                    else {
                        this.matchedIndex = index;
                        this.stateChangeCallback(this, this.CHANGE('updatedSelect')); // callback to parent!
                    }

                    this.deleteFoodEl.removeClass('hidden');

                },

                setInputPlaceHolder: function(text){
                    this.foodSelector.setInputPlaceHolder(text);
                },

                getDisplayData: function(){
                    if(this.matchedIndex > -1) {
                        return this.DOM.createDisplayScope(this.data[this.matchedIndex], this.amount);
                    }
                    else return null;
                },

                remove: function() {
                    this.element.stop().hide(200, this.element.remove);
                    this.foodSelector.remove();
                    this.stateChangeCallback(this, this.CHANGE('remove'))
                }
            };

            self.init(parentElement, foodSelection, data, stateChangeCallback);
            return self;
        }
    }
);