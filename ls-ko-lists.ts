import ko = require("knockout");
import $ = require("jquery");
import Types = require("ls-ko-lists");
import ListOptions = Types.ListOptions;

class List<T extends Types.Model> implements Types.ListViewModel {
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
        
    }

    loadModels = (models: any[]) => {
        var VM = <T>this.options.model;
        var newModels = models.map(model => new VM(model));
        this.models(newModels);
    }

    saveToModels = () => {
        return this.models().map(model => model.saveToModel());
    }
}

export var leet = n => n * 1234;