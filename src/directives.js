import vis from 'vis';


var lytekDirectives = angular.module('lytekDirectives', []);
export
default lytekDirectives;

// A directive to include networks rendered by the vis.js framework.

lytekDirectives.directive('visnetwork', function() {
    return {
        require: '^ngModel',
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        scope: {
            ngModel: '=',
            onSelect: '&',
            onSelectNode: '&',
            options: '='
        },
        link: function link(scope, element, attrs) {
            let network = new vis.Network(element[0]);
            scope.ngModel = network;
        }
    };
});

lytekDirectives.directive("dots", function() {
    return {
        restrict: "E",
        require: "^ngModel",
        template: "<div></div>",
        replace: true,
        scope: {
            ngModel: "=",
            allowedValues: "="
        },
        link: function link(scope, element, attrs) {
            // The allowedValues array should be sorted into ascending order, if it is present.
            if (scope.allowedValues) {
                scope.allowedValues.sort();
            }

            //=========================================================
            // closestLegalValue(targetValue, values)
            // Selects the value in the values array that is closest to
            // targetValue without going over.
            // targetValue - The value we're comparing against.
            // values - An array of integers in ascending order.
            // RETURNS: targetValue if values is null or undefined,
            //   the closest value to targetValue without going over, or
            //   the first element of values if targetValue is less than
            //   everything in the array.
            //=========================================================
            var closestLegalValue = function closestLegalValue(targetValue, values) {
                if (!values) {
                    return targetValue;
                }

                for (var i = values.length - 1; i > 0; i--) {
                    if (values[i] <= targetValue) {
                        return values[i];
                    }
                }

                return values[0];
            };

            //=========================================================
            // redraw(dotVal)
            // Redraw the dot widget with every dot less than or equal
            // to dotVal filled, and the rest are left empty.
            // dotVal - The value of last dot to fill, starting from 1.
            //=========================================================
            var redraw = function redraw(dotVal) {
                var childNodes = element[0].childNodes;
                for (var index = 0; index < childNodes.length; index++) {
                    var dotElem = childNodes[index];

                    if (index < dotVal) {
                        dotElem.setAttribute("src", "img/dot.png");
                    } else {
                        dotElem.setAttribute("src", "img/dot_empty.png");
                    }
                }
            };

            //=========================================================
            // ngModel watch
            // Observe changes to the ngModel value so we can constrain
            // it to legal values and redraw when it changes.
            //=========================================================
            scope.$watch("ngModel", function() {
                var legalValue = closestLegalValue(scope.ngModel, scope.allowedValues);
                if (legalValue == scope.ngModel) {
                    redraw(scope.ngModel);
                } else {
                    scope.ngModel = legalValue;
                }
            });

            // Create the img element nodes for drawing the widget.
            let imgElemOnClick = function(properties) {
                var selectedIndex = Number(this.getAttribute("data-dotindex"));
                if (selectedIndex + 1 === scope.ngModel) {
                    scope.ngModel = selectedIndex;
                } else {
                    scope.ngModel = selectedIndex + 1;
                }
                scope.$apply();
            };

            for (var i = 0; i < 5; i++) {
                var imgElem = document.createElement("img");

                // The data-dotindex attribute is used to track the position
                // of each image element in the widget when it is clicked.
                imgElem.setAttribute("data-dotindex", i);
                if (i < scope.ngModel) {
                    imgElem.setAttribute("src", "img/dot.png");
                } else {
                    imgElem.setAttribute("src", "img/dot_empty.png");
                }

                imgElem.setAttribute("width", "12");
                imgElem.setAttribute("height", "12");

                //=========================================================
                // onClick(properties)
                // Determine the value of the dot that was clicked and
                // update ngModel accordingly.  If the last filled dot is
                // clicked, we treat that as setting the dot widget to the
                // value of the previous dot.  In other words, if the widget
                // is set to 4 and the fourth dot is clicked, we set the
                // widget to 3 instead of leaving it at 4.
                //=========================================================
                imgElem.onclick = imgElemOnClick;

                element[0].appendChild(imgElem);
            }
        }
    };
});