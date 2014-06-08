define(
    [
        "jquery",
        "mealPlanner/util/AmountCalculator/AmountCalculator"

    ],
    function ($, AmountCalculator) {

        return function(element) {

            var self = {
                init: function(element){
                    this.element = element;
                },

                loadFood: function (food, amount) {
                    var displayData = this.createDisplayScope(food, amount);
                    this.setProteinValue(displayData.protein);
                    this.setComplexValue(displayData.carbs.complex);
                    this.setSugarValue(displayData.carbs.sugar);
                    this.setO3Value(displayData.fat.polyUnsaturated.o3);
                    this.setO6Value(displayData.fat.polyUnsaturated.o6);
                    this.setMonoUnsaturatedValue(displayData.fat.monoUnsaturated);
                    this.setSaturatedValue(displayData.fat.saturated);
                    this.setCaloriesValue(displayData.calories);
                    this.setGiValue(displayData.gi);
                    this.setGlValue(displayData.gl);
                    this.setAmountSelectorValue(100);
                    this.enableAmountSelector();
                },

                createDisplayScope: function(food, weight){
                    var displayData = {
                        carbs: {},
                        fat: {
                            polyUnsaturated: {}
                        }
                    };

                    displayData.amount = weight;
                    displayData.protein = this.applyWeight(food.protein, weight);
                    displayData.carbs.complex = this.applyWeight(food.carbs.complex, weight);
                    displayData.carbs.sugar = this.applyWeight(food.carbs.sugar, weight);
                    displayData.fat.polyUnsaturated.o3 = this.applyWeight(food.fat.polyUnsaturated.o3, weight);
                    displayData.fat.polyUnsaturated.o6 = this.applyWeight(food.fat.polyUnsaturated.o6, weight);
                    displayData.fat.monoUnsaturated = this.applyWeight(food.fat.monoUnsaturated, weight);
                    displayData.fat.saturated = this.applyWeight(food.fat.saturated, weight);
                    displayData.calories = this.applyWeight(food.calories, weight);
                    displayData.gi = food.gi;
                    displayData.gl = this.applyWeight(food.gi, weight);
                    return displayData;
                },

                /**
                 * Applies weight to as single entry!
                 * @param entry
                 * @param weight
                 */
                applyWeight: function(entry, weight){
                    if (entry === "") return entry; //leave empty Strings unprocessed.
                    return AmountCalculator.roundUp(entry * 0.01 * weight);
                },

                setAmountSelectorValue: function(value) {
                    this.element.find('.amountSelector').attr('value', value);
                },

                setProteinValue: function(value) {
                    this.element.find('.proteinValue').text(value);
                },

                setComplexValue: function(value) {
                    this.element.find('.complexValue').text(value);
                },

                setSugarValue: function(value) {
                    this.element.find('.sugarValue').text(value);
                },

                setO3Value: function(value) {
                    this.element.find('.o3Value').text(value);
                },

                setO6Value: function(value) {
                    this.element.find('.o6Value').text(value);
                },

                setMonoUnsaturatedValue: function(value) {
                    this.element.find('.monoUnsaturatedValue').text(value);
                },

                setSaturatedValue: function(value) {
                    this.element.find('.saturatedValue').text(value);
                },

                setCaloriesValue: function(value) {
                    this.element.find('.caloriesValue').text(value);
                },

                setGiValue: function(value) {
                    this.element.find('.giValue').text(value);
                },

                setGlValue: function(value) {
                    this.element.find('.glValue').text(value);
                },

                enableAmountSelector: function () {
                    this.element.find('.amountSelector').attr('disabled', false);
                }
            };

            self.init(element);
            return self;
        }
    }
);