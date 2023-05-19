import removeNullOrEmpty from '@/utils/removeNullOrEmpty';
import { Resolver, zodResolver } from '@hookform/resolvers/zod';

const zodSchemaResolver: Resolver = (schema, schemaOptions, resolverOptions = {}) => {
    return (value, _, option) =>
        zodResolver(schema, schemaOptions, resolverOptions)(removeNullOrEmpty(value), _, option);
};

export default zodSchemaResolver;
