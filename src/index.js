var today = new Date();


class Step {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }

    performAction(data, done) {
        this.action(data, done);
    }
}

class Workflow {
    constructor(steps, initialData) {
        this.steps = steps;
        this.data = {
            variables: {},
            errors: {}
        }
        this.pos = 0;
        this.errorHandler = () => {
            console.log('this is some default error handler');
        }

        if (initialData) {
            this.setInitialData(initialData);
        }
    }

    setInitialData(data) {
        this.data.variables = {...this.data.variables, ...data};
    }

    addStep(step) {
        this.steps.push(step);
    }

    setErrorHandler(handler) {
        this.errorHandler = handler;
    }

    startWorkflow() {
        this.startNextStep();
    }

    startNextStep() {
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        console.log(`[${dateTime} | step: ${this.steps[this.pos].name}]`);
        this.steps[this.pos].performAction(this.data, (nextPos) => {
            if (Object.keys(this.data.errors).length === 0) {
                this.pos = nextPos || this.pos + 1;
                this.startNextStep();
            } else {
                console.log(`[${dateTime} | error]`);
                this.errorHandler(this.data);
            }
        });
    }
}

module.exports = {
    Step, Workflow
}
