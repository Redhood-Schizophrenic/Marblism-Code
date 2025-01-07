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

        createMany: procedure.input($Schema.InquiryInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.createMany(input as any))),

        create: procedure.input($Schema.InquiryInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.create(input as any))),

        deleteMany: procedure.input($Schema.InquiryInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.deleteMany(input as any))),

        delete: procedure.input($Schema.InquiryInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.delete(input as any))),

        findFirst: procedure.input($Schema.InquiryInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).inquiry.findFirst(input as any))),

        findMany: procedure.input($Schema.InquiryInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).inquiry.findMany(input as any))),

        findUnique: procedure.input($Schema.InquiryInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).inquiry.findUnique(input as any))),

        updateMany: procedure.input($Schema.InquiryInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.updateMany(input as any))),

        update: procedure.input($Schema.InquiryInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.update(input as any))),

        count: procedure.input($Schema.InquiryInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).inquiry.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.InquiryCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InquiryCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InquiryCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InquiryCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.InquiryCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InquiryCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InquiryGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InquiryGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InquiryCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InquiryCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InquiryGetPayload<T>, Context>) => Promise<Prisma.InquiryGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.InquiryDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InquiryDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InquiryDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InquiryDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.InquiryDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InquiryDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InquiryGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InquiryGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InquiryDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InquiryDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InquiryGetPayload<T>, Context>) => Promise<Prisma.InquiryGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.InquiryFindFirstArgs, TData = Prisma.InquiryGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.InquiryFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InquiryGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InquiryFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.InquiryFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InquiryGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InquiryGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.InquiryFindManyArgs, TData = Array<Prisma.InquiryGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.InquiryFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.InquiryGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InquiryFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.InquiryFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.InquiryGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.InquiryGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.InquiryFindUniqueArgs, TData = Prisma.InquiryGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.InquiryFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InquiryGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InquiryFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InquiryFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InquiryGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InquiryGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.InquiryUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InquiryUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InquiryUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InquiryUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.InquiryUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InquiryUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InquiryGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InquiryGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InquiryUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InquiryUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InquiryGetPayload<T>, Context>) => Promise<Prisma.InquiryGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.InquiryCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.InquiryCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.InquiryCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.InquiryCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.InquiryCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.InquiryCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.InquiryCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.InquiryCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
