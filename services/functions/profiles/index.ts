import {StreamTransform} from "../../lib/StreamTransform";
import {search} from "../../lib/ExternalFactories/Firebase";
import {merge} from 'ramda'
import {dataCreate} from "../../helpers/dataCreate";
import {dataUpdate} from "../../helpers/dataUpdate";
import {λ} from "../../lib/lambda";

const create = StreamTransform<CommandProfilesCreate,any>('command.Profiles.create', async function ({uid, payload: {values}}: CommandProfilesCreate) {
  const matchingProfiles = await search(['uid', uid], 'Profiles');
  const profileKeys = Object.keys(matchingProfiles);

  if (profileKeys.length > 0) {
    return [
      dataCreate('Users', uid, uid, profileKeys[0])
    ];
  } else {
    return [
      dataCreate('Users', uid, uid, uid),
      dataCreate('Profiles', uid, uid, merge(values, {
        uid: uid,
        isAdmin: false,
        isEAP: false
      }))
    ]
  }
});

const update = StreamTransform('command.Profiles.update', async function ({uid, payload: {key, values}}: CommandProfilesUpdate) {
  return [dataUpdate('Profiles', key, uid, values)];
});

export default λ('profiles', create, update);
