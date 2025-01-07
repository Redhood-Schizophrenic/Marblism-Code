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

        createMany: procedure.input($Schema.CategoryInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.createMany(input as any))),

        create: procedure.input($Schema.CategoryInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.create(input as any))),

        deleteMany: procedure.input($Schema.CategoryInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.deleteMany(input as any))),

        delete: procedure.input($Schema.CategoryInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.delete(input as any))),

        findFirst: procedure.input($Schema.CategoryInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).category.findFirst(input as any))),

        findMany: procedure.input($Schema.CategoryInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).category.findMany(input as any))),

        findUnique: procedure.input($Schema.CategoryInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).category.findUnique(input as any))),

        updateMany: procedure.input($Schema.CategoryInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.updateMany(input as any))),

        update: procedure.input($Schema.CategoryInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.update(input as any))),

        count: procedure.input($Schema.CategoryInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).category.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CategoryCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CategoryCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CategoryCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CategoryCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CategoryCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CategoryCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CategoryGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CategoryGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CategoryCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CategoryCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CategoryGetPayload<T>, Context>) => Promise<Prisma.CategoryGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CategoryDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CategoryDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CategoryDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CategoryDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CategoryDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CategoryDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CategoryGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CategoryGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CategoryDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CategoryDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CategoryGetPayload<T>, Context>) => Promise<Prisma.CategoryGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CategoryFindFirstArgs, TData = Prisma.CategoryGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CategoryFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CategoryGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CategoryFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CategoryFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CategoryGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CategoryGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CategoryFindManyArgs, TData = Array<Prisma.CategoryGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CategoryFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CategoryGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CategoryFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CategoryFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CategoryGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CategoryGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CategoryFindUniqueArgs, TData = Prisma.CategoryGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CategoryFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CategoryGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CategoryFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CategoryFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CategoryGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CategoryGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CategoryUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CategoryUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CategoryUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CategoryUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CategoryUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CategoryUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CategoryGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CategoryGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CategoryUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CategoryUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CategoryGetPayload<T>, Context>) => Promise<Prisma.CategoryGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CategoryCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CategoryCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CategoryCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CategoryCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CategoryCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CategoryCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CategoryCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CategoryCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
