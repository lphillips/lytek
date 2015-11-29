
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

lytekDirectives.directive("dots", function() {
  return {
    restrict: "E",
    require: "^ngModel",
    template: "<div></div>",
    replace: true,
    scope: {
      ngModel: "=",
    },
    link: function(scope, element, attrs) {
      for (var i = 0; i < 5; i++) {
        var imgElem = document.createElement("img");
        imgElem.setAttribute("data-dotindex", i);
        if (i < scope.ngModel) {
          imgElem.setAttribute("src", "img/dot.png"); 
        }
        else {
          imgElem.setAttribute("src", "img/dot_empty.png");
        }

        imgElem.setAttribute("width", "12");
        imgElem.setAttribute("height", "12");
        
        imgElem.onclick = (function(properties) {
          var childNodes = this.parentNode.childNodes;
          
          var selectedIndex = this.getAttribute("data-dotindex");
          scope.ngModel = Number(selectedIndex) + 1;
          scope.$apply();
          var newVal = scope.ngModel;
          
          for (var index = 0; index < childNodes.length; index++) {
            var dotElem = childNodes[index];
            
            if (index < newVal) {
              dotElem.setAttribute("src", "img/dot.png");
            }
            else {
              dotElem.setAttribute("src", "img/dot_empty.png");
            }
          }
        });
        
        element[0].appendChild(imgElem);
      };
    }
  }
});