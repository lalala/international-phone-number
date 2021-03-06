// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  angular.module("internationalPhoneNumber", []).directive('internationalPhoneNumber', function() {
    return {
      restrict: 'A',
      require: '^ngModel',
      scope: {
        ngModel: '=',
        defaultCountry: '@'
      },
      link: function(scope, element, attrs, ctrl) {
        var handleWhatsSupposedToBeAnArray, options, read, watchOnce;
        read = function() {
          return ctrl.$setViewValue(element.val());
        };
        handleWhatsSupposedToBeAnArray = function(value) {
          if (value instanceof Array) {
            return value;
          } else {
            return value.toString().replace(/[ ]/g, '').split(',');
          }
        };
        options = {
          autoFormat: true,
          autoHideDialCode: true,
          defaultCountry: '',
          nationalMode: false,
          numberType: '',
          onlyCountries: void 0,
          preferredCountries: ['us', 'gb'],
          responsiveDropdown: false,
          utilsScript: "",
          formatOutput: true
        };
        angular.forEach(options, function(value, key) {
          var option;
          if (!(attrs.hasOwnProperty(key) && angular.isDefined(attrs[key]))) {
            return;
          }
          option = attrs[key];
          if (key === 'preferredCountries') {
            return options.preferredCountries = handleWhatsSupposedToBeAnArray(option);
          } else if (key === 'onlyCountries') {
            return options.onlyCountries = handleWhatsSupposedToBeAnArray(option);
          } else if (typeof value === "boolean") {
            return options[key] = option === "true";
          } else {
            return options[key] = option;
          }
        });
        watchOnce = scope.$watch('ngModel', function(newValue) {
          return scope.$$postDigest(function() {
            options.defaultCountry = scope.defaultCountry;
            if (newValue !== null && newValue !== void 0 && newValue !== '') {
              element.val(newValue);
            }
            element.intlTelInput(options);
            if (!(attrs.skipUtilScriptDownload !== void 0 || options.utilsScript)) {
              element.intlTelInput('loadUtils', '/bower_components/intl-tel-input/lib/libphonenumber/build/utils.js');
            }
            return watchOnce();
          });
        });
        ctrl.$parsers.push(function(value) {
          if (!value || !options.formatOutput) {
            return value;
          }
          return value.replace(/[^\d]/g, '');
        });
        ctrl.$parsers.push(function(value) {
          var validity;
          if (value) {
            validity = element.intlTelInput("isValidNumber");
            ctrl.$setValidity('international-phone-number', validity);
            ctrl.$setValidity('', validity);
          } else {
            value = '';
            delete ctrl.$error['international-phone-number'];
          }
          return value;
        });
        element.on('blur keyup change', function(event) {
          return scope.$apply(read);
        });
        return element.on('$destroy', function() {
          return element.off('blur keyup change');
        });
      }
    };
  });

}).call(this);
