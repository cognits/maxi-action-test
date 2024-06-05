const moment = require('moment');
const exec   = require('child_process').execSync;
const debug = require('debug')('action');


const calculateNextVersion = (doCounter) => {
    // calendar version
    const todaykey = moment().format('YYYYMM');
    debug('base date: ', todaykey);

    // sub-counter
    const allTags = exec('git tag').toString('utf-8').trim().split('\n');
    const currentTags = allTags.filter(v => v.includes(todaykey));
    const count = currentTags.length;
    debug('current tags: ', currentTags);
    debug('max         : ', count);
    debug('next        : ', count+1);

    // hash commit
    const shortHash = exec("git rev-parse --short HEAD").toString('utf-8').trim();

    let next = '';
    if (doCounter) {
        next = `${todaykey}.${count+1}.${shortHash}`;
    } else {
        next = `${todaykey}.${shortHash}`;
    }
    debug('next        : ', next);
    return next;
}

const getTags = () => exec("git tag --sort version:refname --merged").toString('utf-8').trim().split('\n');

const versionSort = (a, b) => {
    const partsA = a.split('.');
    const partsB = b.split('.');

    for(let i=0; i < partsA.length && i < partsB.length; i++) {
        let apart = partsA[i];
        let bpart = partsB[i];
        
        // try to convert to numbers
        try {
            apart = parseInt(apart, 10);
            bpart = parseInt(bpart, 10);
        } catch(e) {}
        
        if (apart < bpart) {
            debug(`compare: ${a}, ${b}, ${apart} < ${bpart}, -1`);
            return -1;
        } else if (bpart < apart) {
            debug(`compare: ${a}, ${b}, ${bpart} < ${apart},  1`);
            return 1;
        }
    }

    debug(`compare: ${a}, ${b},  0`);
    return 0;
}

const queryLatest = (getTagsFn = getTags) => {
    // current branch tags
    const shortHash = getTagsFn();

    if (shortHash.length == 0) {
        return null;
    }

    // extract the latest
    const sorted = shortHash.sort(versionSort);
    debug(sorted);

    return sorted[ sorted.length - 1 ];
}

module.exports = {
    queryLatest,
    calculateNextVersion,
}
