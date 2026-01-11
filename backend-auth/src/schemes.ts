import {SchemaObject} from '@loopback/rest';

//signUp için schema-request
export const SignupSchema: SchemaObject = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string', minLength: 8},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
  },
  required: ['email', 'password', 'firstName', 'lastName'],
};

//login için schema-request
export const LoginSchema: SchemaObject = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string'},
  },
  required: ['email', 'password'],
};
