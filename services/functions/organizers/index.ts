import {merge} from 'ramda';
import {RemoveTransform} from "../../helpers/CommandToDataTransform";
import {StreamTransform} from "../../lib/StreamTransform";
import {lookup, firebaseUid} from '../../lib/ExternalFactories/Firebase';
import {dataUpdate} from "../../helpers/dataUpdate";
import {λ} from "../../lib/lambda";

const DOMAIN = process.env['DOMAIN'];

const create = StreamTransform<any,any>('command.Organizers.create', async function({action, uid, payload: {values}}:CommandOrganizersCreate) {

  const invitedByProfileKey = await lookup('Users', uid);
  const projectName = await lookup('Projects', values.projectKey, 'name');
  const key = firebaseUid();

  const data:DataOrganizersCreate = {
    domain: 'Organizers',
    action,
    key,
    values: merge(values, {invitedByProfileKey})
  };

  const email:EmailsOrganizerInvite = {
    templateId: 'a005f2a2-74b0-42f4-8ac6-46a4b137b7f1',
    toEmail: values.inviteEmail,
    substitutions: {
      project_name: projectName,
      inviteUrl: `${DOMAIN}/organize/${key}`
    }
  };

  return [
    {
      streamName: 'data.firebase',
      partitionKey: values.projectKey,
      data
    },
    {
      streamName: 'email',
      partitionKey: values.projectKey,
      data: email
    }
  ]
});

const accept = StreamTransform('command.Organizers.accept', async function({domain, uid, payload: {key}}:CommandOrganizersAccept) {
  const profileKey = await lookup('Users', uid);

  return [dataUpdate(domain, key, uid, {
    isAccepted: true,
    acceptedAt: Date.now(),
    profileKey
  })];
});

export default λ(
  'organizers',
  create,
  accept,
  RemoveTransform('command.Organizers.remove')
);
