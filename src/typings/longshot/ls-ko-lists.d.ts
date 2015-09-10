/// <reference path="../kncokout/knockout.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />


declare module "ls-ko-lists" {
    class List<T extends Model> implements ListViewModel {
        new(options: ListOptions);
        options: ListOptions;
        models: KnockoutObservableArray<Model>

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

    interface Model {
        new (model?: any);
        originalModel: any;

        loadModel(model: any): void;
        saveToModel(): any;

        isNew: KnockoutComputed<boolean>;
        isDirty: KnockoutComputed<boolean>;
        isDeleted: KnockoutComputed<boolean>;
    }

    interface ListOptions {
        url: string;
        model: Model;
    }
}