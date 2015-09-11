import ko = require("knockout");
import $ = require("jquery");
import Types = require("ls-ko-lists");
import ListOptions = Types.ListOptions;

export class List<T extends Types.Model> implements Types.ListViewModel {
    constructor(public options: Types.ListOptions) {
        this.options = options;
    }

    models: KnockoutObservableArray<T> = ko.observableArray([]);

    loadFromServer = () => {
        $.get(this.options.url)
            .then((models: any[]) => models)
            .then(this.loadModels);
    }

    saveToServer = () => {
        var allModels = this.models();
        var created = allModels.filter(m => m.isNew());
        var updated = allModels.filter(m => m.isDirty());
        var deleted = allModels.filter(m => m.isDeleted());
        
        return $.post(this.options.url, { created, updated, deleted })
    }

    loadModels = (models: any[]) => {
        var newModels = models.map(model => <T>this.options.createModel(model));
        this.models(newModels);
    }

    saveToModels = () => {
        return this.models().map(model => model.saveToModel());
    }
}

export class Model implements Types.ModelViewModel {
    constructor(model?: any) {
        this.originalModel = model;
        if (model) this.loadModel(model);
    }

    originalModel: any;
    
    /**
     * Fallback when a custom loadModel function is not provided
     */
    loadModel = (model: any) => {
        Object.keys(model)
            .forEach(key => {
                this.modelKeys.push(key);
                this[key] = ko.observable(model[key]);
            });
    }

    /**
     * Fallback when a custom saveToModel function is not provided
     */    
    saveToModel = () => {
        var model: any = {};

        this.modelKeys.forEach(key => {
            model[key] = this[key]();
        });

        return model;
    }

    isNew = ko.computed(() => false);
    isDirty = ko.computed(() => false);
    isDeleted = ko.computed(() => false);

    modelKeys = [];
}