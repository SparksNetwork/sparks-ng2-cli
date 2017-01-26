import * as apex from 'apex.js';
import {RemoveTransform} from "../../helpers/CommandToDataTransform";
import {spread} from "../../lib/spread";
import {StreamTransform} from "../../lib/StreamTransform";
import {dataCreate} from "../../helpers/dataCreate";

const create = StreamTransform('command.Fulfillers.create', async function({domain, uid, payload: {values}}:CommandFulfillersCreate) {

  return [dataCreate(domain, [values.oppKey, values.teamKey].join('-'), uid, values)];
});

export default apex(spread(
  create,
  RemoveTransform('command.Fulfillers.remove')
));
