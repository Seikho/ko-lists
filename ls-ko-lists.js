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
            var allModels = _this.models();
            var created = allModels.filter(function (m) { return m.isCreated(); });
            var updated = allModels.filter(function (m) { return m.isUpdated(); });
            var deleted = allModels.filter(function (m) { return m.isDeleted(); });
            return $.post(_this.options.url, { created: created, updated: updated, deleted: deleted });
        };
        this.loadModels = function (models) {
            var newModels = models.map(function (model) { return _this.options.createModel(model); });
            _this.models(newModels);
        };
        this.saveToModels = function () {
            return _this.models().map(function (model) { return model.saveToModel(); });
        };
        this.options = options;
    }
    return List;
})();
exports.List = List;
var Model = (function () {
    function Model(model) {
        var _this = this;
        /**
         * Fallback when a custom loadModel function is not provided
         */
        this.loadModel = function (model) {
            Object.keys(model)
                .forEach(function (key) {
                _this.modelKeys.push(key);
                _this[key] = ko.observable(model[key]);
            });
        };
        /**
         * Fallback when a custom saveToModel function is not provided
         */
        this.saveToModel = function () {
            var model = {};
            _this.modelKeys.forEach(function (key) {
                model[key] = _this[key]();
            });
            return model;
        };
        this.isNew = ko.computed(function () { return false; });
        this.isDirty = ko.computed(function () { return false; });
        this.isDeleted = ko.computed(function () { return false; });
        this.modelKeys = [];
        this.originalModel = model;
        if (model)
            this.loadModel(model);
    }
    return Model;
})();
exports.Model = Model;
