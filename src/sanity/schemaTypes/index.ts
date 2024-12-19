import { type SchemaTypeDefinition } from 'sanity'
import testDocument from './document/testDocument'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testDocument],
}
