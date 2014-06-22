require(
    [
        "jquery",
        "mealPlanner/plate/plate"
    ],
    function ($, Plate) {

        var app = {

            data: null,
            // array of keys for fast data traversal!
            keys: null,

            init: function() {
                this.fetchData();

            },

            fetchData: function() {
                // fetch all food data upfront!
                $.ajax({
                    type: "GET",
                    url: "food_data.json",
                    success: function(data){
                        /**
                         * construct array of keys for fast data traversal!
                         * all necessary formatting of data should be done here!
                         */
                        var keys = [];
                        for (var i = 0; i < data.length; i++) {
                            var name = data[i].name;
                            keys.push(name.toLowerCase());
                        }

                        new Plate($("#plateHolder"), data, keys);
                    }.bind(this)
                });
            }
        };

        app.init();
    }
);