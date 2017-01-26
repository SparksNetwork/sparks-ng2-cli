import {ref} from '../../lib/ExternalFactories/Firebase';
import {StreamFunction} from "../../lib/StreamFunction";
import Schemas from 'schemas'
import {λ} from "../../lib/lambda";

const schemas = Schemas();
const schema = schemas.getSchema('data');
const validateCreate = message => schema(message) && message.action === 'create';
const validateUpdate = message => schema(message) && message.action === 'update';
const validateRemove = message => schema(message) && message.action === 'remove';

export const create = StreamFunction(validateCreate, async function create(message: DataCreate) {
  const childRef = ref(message.domain, message.key);
  return await childRef.set(message.values);
});

export const update = StreamFunction(validateUpdate, async function update(message: DataUpdate) {
  const childRef = ref(message.domain, message.key);
  return await childRef.update(message.values);
});

export const remove = StreamFunction(validateRemove, async function remove(message: DataRemove) {
  const childRef = ref(message.domain, message.key);
  return await childRef.remove();
});

export default λ('firebase-service', create, update, remove);
