
var lytekDirectives = angular.module("lytekDirectives", []);

// A directive to include networks rendered by the vis.js framework.

lytekDirectives.directive("visnetwork", function() {
    return {
      require: "^ngModel",
      restrict: "E",
      template: "<div></div>",
      replace: true,
      scope: {
        ngModel: "=",
        onSelect: "&",
        options: "="
      },
      link: function (scope, element, attrs) {
        var network = new vis.Network(element[0], scope.ngModel, scope.options || {});

        var onSelect = scope.onSelect() || function(prop) {};
        network.on("select", function(properties) {
          onSelect(properties);
        });
      }
    };
});