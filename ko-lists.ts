import ko = require("knockout");
import $ = require("jquery");
import * as Types from './index.d.ts';
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
        var created = allModels.filter(m => m.isCreated());
        var updated = allModels.filter(m => m.isUpdated());
        var deleted = allModels.filter(m => m.isDeleted());
        
        return $.post(this.options.url, { created, updated, deleted })
    }

    loadModels = (models: any[]) => {
        var newModels = models.map(model => {
            var newModel = <T>this.options.createModel();
            newModel.loadModel(model);
            return newModel;
        });
        this.models(newModels);
    }

    saveToModels = () => {
        return this.models().map(model => model.saveToModel());
    }
    
    deleteModel = (model: T) => {
        if (model.isCreated()) this.models.remove(model);
        else model.deletedFlag(true);
    }
    
    unDeleteModel = (model: T) => {
        model.deletedFlag(false);
    }
}

export class Model implements Types.ModelViewModel {
    constructor(model?: any) {
        if (!model) return;
        this.loadModel(model);
    }

    originalModel: any;
    modelKeys = [];
    deletedFlag = ko.observable(false);
    
    /**
     * Fallback when a custom loadModel function is not provided
     */
    loadModel = (model: any) => {
        this.originalModel = model;
        this.modelKeys = Object.keys(model);
        
        this.modelKeys.forEach(key => {
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

    isCreated = ko.computed(() => {
        if (this.originalModel == null) return true;
        if (this.modelKeys.length === 0) return true;
        if (Object.keys(this.originalModel).length === 0) return true;
        
        var hasAnyValues = Object.keys(this.originalModel)
            .every(key => this.originalModel[key] != null);        
        if (!hasAnyValues) return true;
        
        return false;
    });
    
    /**
     * Return true if the model is not new and has deviated from the original model
     */
    isUpdated = ko.computed(() => {
        if (!this.isCreated()) return false;

        var areAllOriginal = this.modelKeys.every(key => {
           var original = this.originalModel[key];
           var current = this[key]();
           return original === current; 
        });
        
        return areAllOriginal;
    });
        
    isDeleted = ko.computed(() => this.deletedFlag());    
}