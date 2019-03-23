const { Step, Workflow } = require('./classes');

const step = new Step('firstStep');
const workflow = new Workflow(new Step('second', () => {
    console.log('here1');
}));

workflow.startWorkflow();