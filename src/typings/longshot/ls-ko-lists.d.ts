/// <reference path="../knockout/knockout.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />

declare module "ls-ko-lists" {
    class List<T extends ModelViewModel> implements ListViewModel {
        constructor(options: ListOptions);
        options: ListOptions;
        models: KnockoutObservableArray<ModelViewModel>

        loadFromServer(): void;
        saveToServer(): any;

        loadModels(models: any[]): void;
        saveToModels(): any;
        
        deleteModel(model: ModelViewModel);
        unDeleteModel(model: ModelViewModel);
    }
    
    interface ListViewModel {
        loadFromServer(): void;
        saveToServer(): any;

        loadModels(models: any[]): void;
        saveToModels(): any;
        
        deleteModel(model: ModelViewModel);
        unDeleteModel(model: ModelViewModel);
    }
    
    class Model implements ModelViewModel {
        constructor(model?: any);
        
        originalModel: any;
        loadModel(model: any): void;
        saveToModel(): any;
        
        isCreated: KnockoutComputed<boolean>;
        isUpdated: KnockoutComputed<boolean>;
        isDeleted: KnockoutComputed<boolean>;
        
        deletedFlag: KnockoutObservable<boolean>;
    }

    interface ModelViewModel {
        
        loadModel(model: any): void;
        saveToModel(): any;
        
        isCreated: KnockoutComputed<boolean>;
        isUpdated: KnockoutComputed<boolean>;
        isDeleted: KnockoutComputed<boolean>;
        
        deletedFlag: KnockoutObservable<boolean>;
    }

    interface ListOptions {
        url: string;
        createModel: (model?: any) => ModelViewModel;
    }
}