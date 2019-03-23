const { Step, Workflow } = require('./classes');

const step = new Step('firstStep');
const workflow = new Workflow([new Step('second', (data) => {
    console.log(data.variables.test);
    data.errors['test2'] = 'some funky error!';
})]);

workflow.setInitialData({'other': 'wow'});
workflow.startWorkflow();