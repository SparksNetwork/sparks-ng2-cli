import {StreamTransform} from "../../lib/StreamTransform";
import {dataRemove} from "../../helpers/dataRemove";
import Schemas from 'schemas'

const schemas = Schemas();
const schema = schemas.getSchema('data.Profiles.rmeove');

export const profileRemove = StreamTransform(schema, async function(message:DataRemove) {

  return [dataRemove('GatewayCustomers', message.key, message.key)];
});

