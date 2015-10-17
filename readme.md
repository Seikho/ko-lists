# Knockout List Components
Work in progress, currently usable with TypeScript

### Installation
```
npm install ko-lists --save
```
or add `ko-lists.js` to your browser via a script tag.  
```html
<script src="scripts/ko-lists.js"></script>
<!-- Or use the github CDN -->
<script src="https://rawgit.com/longshot-io/ko-lists/v0.4.4/ko-lists.js"></script>
``` 
or load it with [RequireJS/Cajon](https://github.com/requirejs/cajon).
```javascript
require.config({
    // rest of your config ...
    paths: {
        'ko-lists': ['//rawgit.com/longshot-io/ko-lists/v0.4.1/ko-lists.js']
    }
});
```

### Usage

**NB:** Knockout must be available either globally or through RequireJS.
```javascript
// TypeScript
import * as KoLists from 'ko-lists';

class MyModel extends KoLists.Model {
    // ...
}

class MyList extends KoLists.List {
    constructor(opts: any) {
        super(opts);
    }
    
    ...
}

var opts = {
    url: '/my-end-point',
    createModel: (model?: any) => new MyModel(model);
}

```
