import * as apex from 'apex.js';
import {StreamTransform} from "../../lib/StreamTransform";
import {RemoveTransform} from "../../helpers/CommandToDataTransform";
import {dataCreate} from "../../helpers/dataCreate";
import {spread} from "../../lib/spread";

const create = StreamTransform('command.Assignments.create', async function({domain, uid, payload: {values}}:CommandAssignmentsCreate) {
  return [dataCreate(domain, [values.oppKey, values.shiftKey].join('-'), uid, values)]
});

export default apex(spread(create, RemoveTransform('command.Assignments.remove')));
