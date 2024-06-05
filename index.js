const core = require('@actions/core');
const github = require('@actions/github');
const { calculateNextVersion, queryLatest } = require('./functions');

try {
    const action    = core.getInput('action');
    const doCounter = core.getInput('counter');
    const format    = core.getInput('format');

    let result = '';

    if (action == 'generate') {
        result = calculateNextVersion(format, !!doCounter);
    } else if (action == 'query') {
        result = queryLatest();
    } else {
        console.log(`Unknown action: ${action}`);
    }
    
    console.log('version', result);
    core.setOutput('version', result);
    
} catch (error) {

    core.setFailed(error.message);
}
