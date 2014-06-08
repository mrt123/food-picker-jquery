define(
    [
        "jquery",
        "handlebars",
        "text!./FoodSelector.html",
        "mealPlanner/FoodItem/FoodItemDOM"
    ],
    function ($, handlebars, html, DOM) {
        /**
         * Attaches selector to parentElement!
         * @param parentElement : element to attach this Class to.
         * @param displayData : data to populate selector options
         * @param callback : callback to execute when option is matched.
         * @param context : context in which callback is executed.
        */
        return function (parentElement, displayData, callback, context) {

            var self = {
                init: function (parentElement, displayData, callback, context) {
                    this.element = null;

                    this.loadTemplate(parentElement, displayData);
                    this.onDOMReady(parentElement, displayData, callback, context);
                },

                loadTemplate: function (parentElement, displayData) {
                    var template = Handlebars.compile(html);
                    var htmlWithData = template(displayData);
                    parentElement.append(htmlWithData);
                },

                onDOMReady: function (parentElement, displayData, callback, context) {
                    this.element = parentElement.find(".chosenFoodSelector");
                    if ($('.chosenFoodSelector').length > 1) {
                        this.element.chosen({ placeholder_text_single : "add more" });
                    }
                    else {
                        this.element.chosen({ placeholder_text_single : "choose your food" });
                    }

                    this.element.on('change mousemove', function(evt, params){
                        this.matchFood(evt, params, displayData, callback, context)
                    }.bind(this));
                },

                matchFood: function(evt, params, displayData, callback, context){
                    var matchedIndex = displayData.FOOD_OPTIONS.indexOf(params.selected.toLowerCase());
                    if (matchedIndex != -1) {
                        callback.bind(context, matchedIndex).call();
                    }
                },

                setInputPlaceHolder: function(text){
                    this.element.attr('data-placeholder', text);
                    this.element.trigger('chosen:updated');
                },

                remove: function(){
                    // chosen API does not remove DOM elements on closure! Remove to avoid memory leaks!
                    this.element.next().remove();
                }
            };

            self.init(parentElement, displayData, callback, context);
            return self;
        }
    }
);