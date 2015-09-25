
export class List<T extends ModelViewModel> implements ListViewModel {
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

export interface ListViewModel {
    loadFromServer(): void;
    saveToServer(): any;

    loadModels(models: any[]): void;
    saveToModels(): any;

    deleteModel(model: ModelViewModel);
    unDeleteModel(model: ModelViewModel);
}

export class Model implements ModelViewModel {
    constructor();

    originalModel: any;
    loadModel(model: any): void;
    saveToModel(): any;

    isCreated: KnockoutComputed<boolean>;
    isUpdated: KnockoutComputed<boolean>;
    isDeleted: KnockoutComputed<boolean>;

    deletedFlag: KnockoutObservable<boolean>;
}

export interface ModelViewModel {

    loadModel(model: any): void;
    saveToModel(): any;

    isCreated: KnockoutComputed<boolean>;
    isUpdated: KnockoutComputed<boolean>;
    isDeleted: KnockoutComputed<boolean>;

    deletedFlag: KnockoutObservable<boolean>;
}

export interface ListOptions {
    url: string;
    createModel: (model?: any) => ModelViewModel;
}
