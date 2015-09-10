var ko = require("knockout");
var $ = require("jquery");
var List = (function () {
    function List(options) {
        var _this = this;
        this.options = options;
        this.models = ko.observableArray([]);
        this.loadFromServer = function () {
            $.get(_this.options.url)
                .then(function (models) { return models; })
                .then(_this.loadModels);
        };
        this.saveToServer = function () {
        };
        this.loadModels = function (models) {
            var VM = _this.options.model;
            var newModels = models.map(function (model) { return new VM(model); });
            _this.models(newModels);
        };
        this.saveToModels = function () {
            return _this.models().map(function (model) { return model.saveToModel(); });
        };
        this.options = options;
    }
    return List;
})();
exports.leet = function (n) { return n * 1234; };
