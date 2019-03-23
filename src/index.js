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
    constructor(steps, initialData, res) {
        this.steps = steps || [];
        this.data = {
            variables: {},
            errors: {},
            response: {
                status: 200,
                body: {}
            }
        }
        this.res = res;
        this.pos = 0;

        this.errorHandler = (data) => {
            console.log('this is some default error handler ' + JSON.stringify(data));
        }
        this.responseHandler = () => {
            this.res.json({});
        }

        if (initialData) {
            this.setInitialData(initialData);
        }
    }

    setInitialData(data) {
        this.data.variables = {...this.data.variables, ...data};
    }

    setResponse(response) {
        this.response = response;
    }

    setPromise(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }

    addStep(step) {
        this.steps.push(step);
    }

    setErrorHandler(handler) {
        this.errorHandler = handler;
    }

    setResponseHandler(handler) {
        this.responseHandler = handler;
    }

    startWorkflow() {
        this.startNextStep();
    }

    startNextStep() {
        var date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        var dateTime = `${date} ${time}`;

        console.log(`[${dateTime} | step: ${this.steps[this.pos].name}]`);
        this.steps[this.pos].performAction(this.data, (nextPos) => {
            if (Object.keys(this.data.errors).length === 0) {
                this.pos = nextPos || this.pos + 1;
                if (this.pos === this.steps.length) {
                    this.responseHandler(this.data, this.resolve, this.reject);
                } else {
                    this.startNextStep();
                }

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
