"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoActor = void 0;
const observable_1 = require("@anderjason/observable");
const skytree_1 = require("skytree");
class DemoActor extends skytree_1.Actor {
    constructor() {
        super(...arguments);
        this.parentElement = observable_1.Observable.ofEmpty();
        this.isVisible = observable_1.Observable.ofEmpty();
        this.exampleCode = observable_1.Observable.ofEmpty();
    }
}
exports.DemoActor = DemoActor;
//# sourceMappingURL=index.js.map