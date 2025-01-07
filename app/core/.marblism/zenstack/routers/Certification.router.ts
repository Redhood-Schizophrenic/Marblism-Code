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

        createMany: procedure.input($Schema.CertificationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.createMany(input as any))),

        create: procedure.input($Schema.CertificationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.create(input as any))),

        deleteMany: procedure.input($Schema.CertificationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.deleteMany(input as any))),

        delete: procedure.input($Schema.CertificationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.delete(input as any))),

        findFirst: procedure.input($Schema.CertificationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).certification.findFirst(input as any))),

        findMany: procedure.input($Schema.CertificationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).certification.findMany(input as any))),

        findUnique: procedure.input($Schema.CertificationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).certification.findUnique(input as any))),

        updateMany: procedure.input($Schema.CertificationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.updateMany(input as any))),

        update: procedure.input($Schema.CertificationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.update(input as any))),

        count: procedure.input($Schema.CertificationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).certification.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CertificationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CertificationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CertificationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CertificationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CertificationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CertificationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CertificationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CertificationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CertificationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CertificationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CertificationGetPayload<T>, Context>) => Promise<Prisma.CertificationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CertificationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CertificationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CertificationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CertificationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CertificationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CertificationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CertificationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CertificationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CertificationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CertificationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CertificationGetPayload<T>, Context>) => Promise<Prisma.CertificationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CertificationFindFirstArgs, TData = Prisma.CertificationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CertificationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CertificationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CertificationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CertificationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CertificationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CertificationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CertificationFindManyArgs, TData = Array<Prisma.CertificationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CertificationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CertificationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CertificationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CertificationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CertificationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CertificationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CertificationFindUniqueArgs, TData = Prisma.CertificationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CertificationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CertificationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CertificationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CertificationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CertificationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CertificationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CertificationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CertificationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CertificationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CertificationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CertificationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CertificationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CertificationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CertificationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CertificationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CertificationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CertificationGetPayload<T>, Context>) => Promise<Prisma.CertificationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CertificationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CertificationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CertificationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CertificationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CertificationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CertificationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CertificationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CertificationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
