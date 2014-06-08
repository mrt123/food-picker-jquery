define(
    [
        "jquery",
        "mealPlanner/util/AmountCalculator/AmountCalculator"
    ],
    function ($, AmountCalculator) {

        return function(element) {

            var self = {
                DEFAULT_TOTAL_DISPLAY_SCOPE:  function(){

                    return {
                        "amount": 0,
                        "protein": 0,
                        "carbs": {
                            "complex": 0,
                            "sugar": 0
                        },
                        "fat": {
                            "polyUnsaturated": {
                                "o3": 0,
                                "o6": 0
                            },
                            "monoUnsaturated": 0,
                            "saturated": 0
                        },
                        "calories": 0
                    }
                },

                init: function(element){
                    this.element = element;
                },

                updateSummary: function (total) {
                    this.setProteinSummaryValue(total.protein);
                    this.setComplexSummaryValue(total.carbs.complex);
                    this.setSugarSummaryValue(total.carbs.sugar);
                    this.setO3SummaryValue(total.fat.polyUnsaturated.o3);
                    this.setO6SummaryValue(total.fat.polyUnsaturated.o6);
                    this.setMonoUnsaturatedSummaryValue(total.fat.monoUnsaturated);
                    this.setSaturatedSummaryValue(total.fat.saturated);
                    this.setCaloriesSummaryValue(total.calories);
                    this.setGiSummaryValue(total.gi);
                    this.setGlSummaryValue(total.gl);
                },

                getTotalDisplayScope: function(foodItems){
                    // TODO: use closure to remember the total?
                    var total = new this.DEFAULT_TOTAL_DISPLAY_SCOPE();

                    for (var i = 0; i < foodItems.length; i++) {

                        var foodData = foodItems[i].getDisplayData();
                        if (foodData !== null) {
                            total.protein = AmountCalculator.roundUp(total.protein + foodData.protein);
                            total.carbs.complex = AmountCalculator.roundUp(total.carbs.complex + foodData.carbs.complex);
                            total.carbs.sugar = AmountCalculator.roundUp(total.carbs.sugar + foodData.carbs.sugar);
                            total.fat.polyUnsaturated.o3 = AmountCalculator.roundUp(total.fat.polyUnsaturated.o3 + foodData.fat.polyUnsaturated.o3);
                            total.fat.polyUnsaturated.o6 = AmountCalculator.roundUp(total.fat.polyUnsaturated.o6 + foodData.fat.polyUnsaturated.o6);
                            total.fat.monoUnsaturated = AmountCalculator.roundUp(total.fat.monoUnsaturated + foodData.fat.monoUnsaturated);
                            total.fat.saturated = AmountCalculator.roundUp(total.fat.saturated + foodData.fat.saturated);
                            total.calories = AmountCalculator.roundUp(total.calories + foodData.calories);
                        }
                    }
                    return total;
                },

                setProteinSummaryValue: function(value) {
                    this.element.find('.proteinSummaryValue').text(value);
                },

                setComplexSummaryValue: function(value) {
                    this.element.find('.complexSummaryValue').text(value);
                },

                setSugarSummaryValue: function(value) {
                    this.element.find('.sugarSummaryValue').text(value);
                },

                setO3SummaryValue: function(value) {
                    this.element.find('.o3SummaryValue').text(value);
                },

                setO6SummaryValue: function(value) {
                    this.element.find('.o6SummaryValue').text(value);
                },

                setMonoUnsaturatedSummaryValue: function(value) {
                    this.element.find('.monoUnsaturatedSummaryValue').text(value);
                },

                setSaturatedSummaryValue: function(value) {
                    this.element.find('.saturatedSummaryValue').text(value);
                },

                setCaloriesSummaryValue: function(value) {
                    this.element.find('.caloriesSummaryValue').text(value);
                },

                setGiSummaryValue: function(value) {
                    this.element.find('.giSummaryValue').text(value);
                },

                setGlSummaryValue: function(value) {
                    this.element.find('.glSummaryValue').text(value);
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