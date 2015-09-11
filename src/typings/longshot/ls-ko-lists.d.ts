/// <reference path="../knockout/knockout.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />

declare module "ls-ko-lists" {
    class List<T extends ModelViewModel> implements ListViewModel {
        new(options: ListOptions);
        options: ListOptions;
        models: KnockoutObservableArray<ModelViewModel>

        loadFromServer(): void;
        saveToServer(): any;

        loadModels(models: any[]): void;
        saveToModels(): any[];
    }
    
    interface ListViewModel {
        loadFromServer(): void;
        saveToServer(): any;

        loadModels(models: any[]): void;
        saveToModels(): any[];
    }
    
    class Model implements ModelViewModel {
        new(model: any);
        
        originalModel: any;
        loadModel(model: any): void;
        saveToModel(): any;
        
        isNew: KnockoutComputed<boolean>;
        isDirty: KnockoutComputed<boolean>;
        isDeleted: KnockoutComputed<boolean>;
    }

    interface ModelViewModel {
        loadModel(model: any): void;
        saveToModel(): any;
    }

    interface ListOptions {
        url: string;
        createModel: (model?: any) => ModelViewModel;
    }
}