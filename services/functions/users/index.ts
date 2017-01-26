import * as apex from 'apex.js';
import {StreamTransform} from "../../lib/StreamTransform";
import {dataCreate} from "../../helpers/dataCreate";
import {dataUpdate} from "../../helpers/dataUpdate";

/**
 * Migration command is for whne a user has changed uid
 */
const migrate = StreamTransform<any,any>('command.Users.migrate', async function({uid, payload: {toUid, profileKey}}:CommandUsersMigrate) {
  return [
    dataCreate('Users', toUid, uid, profileKey),
    dataUpdate('Profiles', profileKey, uid, {uid: toUid})
  ]
});

export default apex(migrate);
