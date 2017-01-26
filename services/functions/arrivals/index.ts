import {StreamTransform} from "../../lib/StreamTransform";
import {lookup} from "../../lib/ExternalFactories/Firebase";
import {RemoveTransform} from "../../helpers/CommandToDataTransform";
import {dataCreate} from "../../helpers/dataCreate";
import {λ} from "../../lib/lambda";

/**
 * An arrival can only be marked as arrived once
 */
const create = StreamTransform<CommandArrivalsCreate, Arrival>('command.Arrivals.create', async function(message) {
  const payload = message.payload;
  const values = payload.values;
  const key = [values.projectKey, values.profileKey].join('-');

  const alreadyArrived = await lookup('Arrivals', key);

  // If already arrived then exit still consuming the message.
  if (alreadyArrived) { return [] }

  const profileKey = await lookup('Users', message.uid);

  return [dataCreate(message.domain, key, message.uid, {
    arrivedAt: Date.now(),
    ownerProfileKey: profileKey,
    projectKeyProfileKey: key,
    profileKey: values.profileKey,
    projectKey: values.projectKey
  })];
});

export default λ('arrivals', create, RemoveTransform('command.Arrivals.remove'));
