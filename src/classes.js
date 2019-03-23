class Step {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }

    performAction() {
        this.action();
    }

    printName() {
        console.log(this.name);
    }
}

class Workflow {
    constructor(step) {
        this.step = step;
    }

    startWorkflow() {
        this.step.performAction();
    }

    printName() {
        this.step.printName();
    }
}

module.exports = {
    Step, Workflow
}