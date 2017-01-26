import * as apex from 'apex.js';
import {
  UpdateTransform, RemoveTransform
} from "../../helpers/CommandToDataTransform";
import {StreamTransform} from "../../lib/StreamTransform";
import {spread} from "../../lib/spread";
import {dataCreate} from "../../helpers/dataCreate";

const create = StreamTransform('command.Memberships.create', async function ({domain, uid, payload: {values}}:CommandMembershipsCreate) {

  return [dataCreate(domain, [values.engagementKey, values.teamKey, values.oppKey].join('-'), uid, values)];
});

export default apex(spread(
  create,
  UpdateTransform('command.Memberships.update'),
  RemoveTransform('command.Memberships.remove')
));
