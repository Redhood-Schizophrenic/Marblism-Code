/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.FacilityInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.createMany(input as any))),

        create: procedure.input($Schema.FacilityInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.create(input as any))),

        deleteMany: procedure.input($Schema.FacilityInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.deleteMany(input as any))),

        delete: procedure.input($Schema.FacilityInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.delete(input as any))),

        findFirst: procedure.input($Schema.FacilityInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).facility.findFirst(input as any))),

        findMany: procedure.input($Schema.FacilityInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).facility.findMany(input as any))),

        findUnique: procedure.input($Schema.FacilityInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).facility.findUnique(input as any))),

        updateMany: procedure.input($Schema.FacilityInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.updateMany(input as any))),

        update: procedure.input($Schema.FacilityInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.update(input as any))),

        count: procedure.input($Schema.FacilityInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).facility.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.FacilityCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FacilityCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FacilityCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FacilityCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.FacilityCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FacilityCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FacilityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FacilityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FacilityCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FacilityCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FacilityGetPayload<T>, Context>) => Promise<Prisma.FacilityGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.FacilityDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FacilityDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FacilityDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FacilityDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.FacilityDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FacilityDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FacilityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FacilityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FacilityDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FacilityDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FacilityGetPayload<T>, Context>) => Promise<Prisma.FacilityGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.FacilityFindFirstArgs, TData = Prisma.FacilityGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.FacilityFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FacilityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FacilityFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FacilityFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FacilityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FacilityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.FacilityFindManyArgs, TData = Array<Prisma.FacilityGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.FacilityFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.FacilityGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FacilityFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FacilityFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.FacilityGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.FacilityGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.FacilityFindUniqueArgs, TData = Prisma.FacilityGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FacilityFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FacilityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FacilityFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FacilityFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FacilityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FacilityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.FacilityUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FacilityUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FacilityUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FacilityUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.FacilityUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FacilityUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FacilityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FacilityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FacilityUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FacilityUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FacilityGetPayload<T>, Context>) => Promise<Prisma.FacilityGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.FacilityCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FacilityCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.FacilityCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.FacilityCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.FacilityCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.FacilityCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.FacilityCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FacilityCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
