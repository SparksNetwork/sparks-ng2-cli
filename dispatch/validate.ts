import {omit} from 'ramda';
import {QueueMessage} from "./types";
import Schemas from '../schemas';

const schemas = Schemas();
const commandValidator = schemas.getSchema('Command');

export interface Validation {
  valid:boolean;
  errors:any | undefined;
  message: string;
}

export async function validate(message:QueueMessage):Promise<Validation> {
  const messageWithoutKey = omit(['key'], message);
  const {domain, action} = messageWithoutKey;

  const payloadValidator = schemas.getSchema([domain, action].join('.'));

  if (!commandValidator(messageWithoutKey)) {
    return {
      valid: false,
      errors: commandValidator.errors,
      message: schemas.errorsText(commandValidator.errors)
    };
  }

  if (!payloadValidator) {
    return {
      valid: false,
      errors: ['No schema found'],
      message: 'No schema found'
    };
  }

  if (!payloadValidator(messageWithoutKey.payload)) {
    return {
      valid: false,
      errors: payloadValidator.errors,
      message: schemas.errorsText(payloadValidator.errors)
    };
  }

  return {valid: true, errors: [], message: ''};
}
