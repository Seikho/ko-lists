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
        this.deleteModel = function (model) {
            if (model.isCreated())
                _this.models.remove(model);
            else
                model.deletedFlag(true);
        };
        this.unDeleteModel = function (model) {
            model.deletedFlag(false);
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
        this.isCreated = ko.computed(function () {
            if (_this.originalModel == null)
                return true;
            if (_this.modelKeys.length === 0)
                return true;
            if (Object.keys(_this.originalModel).length === 0)
                return true;
            var hasAnyValues = Object.keys(_this.originalModel)
                .every(function (key) { return _this.originalModel[key] != null; });
            if (!hasAnyValues)
                return true;
            return false;
        });
        /**
         * Return true if the model is not new and has deviated from the original model
         */
        this.isUpdated = ko.computed(function () {
            if (!_this.isCreated())
                return false;
            var areAllOriginal = _this.modelKeys.every(function (key) {
                var original = _this.originalModel[key];
                var current = _this[key]();
                return original === current;
            });
            return areAllOriginal;
        });
        this.isDeleted = ko.computed(function () { return _this.deletedFlag(); });
        this.deletedFlag = ko.observable(false);
        this.modelKeys = [];
        if (!model)
            return;
        this.originalModel = model;
        this.loadModel(model);
    }
    return Model;
})();
exports.Model = Model;
