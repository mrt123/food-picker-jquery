/**
 * Static Class
 */

define(
    [],
    function () {

        return  {

            /**
             * @param number 999 max
             * @returns {number}
             */

            roundUp: function (number) {
                var rounded;
                if (number < 10) {
                    rounded = Math.round(number * 1000) / 1000;  // round up to 3 decimal places!
                }
                else if (number < 100) {
                    rounded = Math.round(number * 100) / 100;  // round up to 2 decimal places!
                }
                else if (number >= 100) {
                    rounded = Math.round(number * 10) / 10;  // round up to 1 decimal places!
                }
                return rounded;
            }
        }
    }
);