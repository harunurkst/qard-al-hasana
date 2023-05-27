import { AxiosRequestConfig, Method } from 'axios';

import http from '@/utils/http';
import invariant from 'tiny-invariant';
import { ZodSchema, z } from 'zod';

function zodSafeQuery<
    ParamsSchema extends ZodSchema = any,
    ResponseSchema extends ZodSchema = any,
    PayloadSchema extends ZodSchema = any
>(
    url: string,
    config?:
        | (Omit<AxiosRequestConfig, 'params' | 'baseURL'> & {
              method?: Method;
              params?: z.infer<ParamsSchema>;
              payloadSchema?: PayloadSchema;
              responseSchema?: ResponseSchema;
              paramsSchema?: ParamsSchema;
              safeParse?: boolean;
              baseURL?: string;
          })
        | undefined
) {
    return async () => {
        if (config?.safeParse && config.payloadSchema) {
            const safePayload = config.payloadSchema.safeParse(config.data);
            invariant(safePayload.success, 'Invalid payload');
        }

        if (config?.safeParse && config.paramsSchema) {
            const safeParams = config.paramsSchema.safeParse(config.params);
            invariant(safeParams.success, 'Invalid Schema');
        }

        const response = await http(url, {
            ...config,
            method: config?.method || 'GET',
        });

        if (config?.safeParse && config.responseSchema) {
            const safeResponse = config.responseSchema.safeParse(response.data);
            invariant(safeResponse.success, 'Not relevent result from server');
            return {
                statusCode: safeResponse.data,
                result: response.data,
            } as { statusCode: number; result: z.infer<ResponseSchema> };
        }

        return {
            statusCode: response.status,
            result: response.data,
        } as {
            statusCode: number;
            result: z.infer<ResponseSchema>;
        };
    };
}

export default zodSafeQuery;
