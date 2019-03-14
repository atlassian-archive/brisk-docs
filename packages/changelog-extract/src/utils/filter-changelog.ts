import * as semver from 'semver';
import {Logs} from '../types/changeLog';

const filterChangelog = (rawLogs: Logs, range?: string): Logs => {
    return range
        ? rawLogs.filter(e => semver.satisfies(e.version, range))
        : rawLogs;
};

export default filterChangelog;