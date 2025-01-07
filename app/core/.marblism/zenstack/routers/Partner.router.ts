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

        createMany: procedure.input($Schema.PartnerInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.createMany(input as any))),

        create: procedure.input($Schema.PartnerInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.create(input as any))),

        deleteMany: procedure.input($Schema.PartnerInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.deleteMany(input as any))),

        delete: procedure.input($Schema.PartnerInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.delete(input as any))),

        findFirst: procedure.input($Schema.PartnerInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).partner.findFirst(input as any))),

        findMany: procedure.input($Schema.PartnerInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).partner.findMany(input as any))),

        findUnique: procedure.input($Schema.PartnerInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).partner.findUnique(input as any))),

        updateMany: procedure.input($Schema.PartnerInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.updateMany(input as any))),

        update: procedure.input($Schema.PartnerInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.update(input as any))),

        count: procedure.input($Schema.PartnerInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).partner.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PartnerCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PartnerCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PartnerCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PartnerCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PartnerCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PartnerCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PartnerGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PartnerGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PartnerCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PartnerCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PartnerGetPayload<T>, Context>) => Promise<Prisma.PartnerGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PartnerDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PartnerDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PartnerDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PartnerDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PartnerDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PartnerDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PartnerGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PartnerGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PartnerDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PartnerDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PartnerGetPayload<T>, Context>) => Promise<Prisma.PartnerGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PartnerFindFirstArgs, TData = Prisma.PartnerGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PartnerFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PartnerGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PartnerFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PartnerFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PartnerGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PartnerGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PartnerFindManyArgs, TData = Array<Prisma.PartnerGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PartnerFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PartnerGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PartnerFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PartnerFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PartnerGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PartnerGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PartnerFindUniqueArgs, TData = Prisma.PartnerGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PartnerFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PartnerGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PartnerFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PartnerFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PartnerGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PartnerGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PartnerUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PartnerUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PartnerUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PartnerUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PartnerUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PartnerUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PartnerGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PartnerGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PartnerUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PartnerUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PartnerGetPayload<T>, Context>) => Promise<Prisma.PartnerGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PartnerCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PartnerCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PartnerCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PartnerCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PartnerCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PartnerCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PartnerCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PartnerCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
