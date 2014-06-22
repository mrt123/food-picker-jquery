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
                    this.setAmountSelectorValue(amount);
                    this.enableAmountSelector();
                },

                createDisplayScope: function(food, weight){
                    var data = {
                        carbs: {},
                        fat: {
                            polyUnsaturated: {}
                        }
                    };

                    data.amount = weight;
                    data.protein = this.applyWeight(food.protein, weight);
                    data.carbs.complex = this.applyWeight(food.carbs.complex, weight);
                    data.carbs.sugar = this.applyWeight(food.carbs.sugar, weight);
                    data.fat.polyUnsaturated.o3 = this.applyWeight(food.fat.polyUnsaturated.o3, weight);
                    data.fat.polyUnsaturated.o6 = this.applyWeight(food.fat.polyUnsaturated.o6, weight);
                    data.fat.monoUnsaturated = this.applyWeight(food.fat.monoUnsaturated, weight);
                    data.fat.saturated = this.applyWeight(food.fat.saturated, weight);
                    data.calories = this.applyWeight(food.calories, weight);
                    data.gi = food.gi;
                    data.gl = this.applyWeight(food.gi, weight);

                    data.all =  data.protein + data.carbs.complex +  data.carbs.sugar +
                        data.fat.polyUnsaturated.o3 + data.fat.polyUnsaturated.o6 + data.fat.monoUnsaturated +
                        data.fat.saturated;

                    data.proteinVsAll = 100 / data.all * data.protein / 100;
                    return data;
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