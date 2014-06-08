require(
    [
        "jquery",
        "jquery",
        "mealPlanner/plate/plate"
    ],
    function ($, jQuery, plate) {

        var app = {

            currentProduct: plate,
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

                        this.data = data;
                        this.keys = keys;
                        plate.init(this);
                    }.bind(this)
                });
            }
        };

        $("#discount_credits").change(function(){
            var newValue = this.value;
            $('#newValue').html(newValue);
        });

        app.init();
    }
);