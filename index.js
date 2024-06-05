const core = require('@actions/core');
const github = require('@actions/github');
const { calculateNextVersion, queryLatest } = require('./functions');

try {
    const action    = core.getInput('action');
    const doCounter = core.getInput('counter');

    let result = '';

    if (action == 'generate') {
        result = calculateNextVersion(!!doCounter);
    } else if (action == 'query') {
        result = queryLatest();
    }
    
    core.setOutput('version', result);
    
} catch (error) {

    core.setFailed(error.message);
}
