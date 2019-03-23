class Step {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }

    performAction(data) {
        this.action(data);
    }

    printName() {
        console.log(this.name);
    }
}

class Workflow {
    constructor(steps, initialData) {
        this.steps = steps;
        this.data = {
            variables: {},
            errors: {}
        }

        if (initialData) {
            this.setInitialData(initialData);
        }
    }

    setInitialData(data) {
        this.data.variables = {...this.data.variables, ...data};
    }

    startWorkflow() {
        this.steps.forEach(step => {
            step.performAction(this.data);
            console.log(this.data);
        });
    }

    printName() {
        this.step.printName();
    }
}

module.exports = {
    Step, Workflow
}