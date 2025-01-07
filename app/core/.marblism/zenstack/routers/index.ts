/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createCategoryRouter from "./Category.router";
import createProductRouter from "./Product.router";
import createServiceRouter from "./Service.router";
import createInquiryRouter from "./Inquiry.router";
import createPartnerRouter from "./Partner.router";
import createCertificationRouter from "./Certification.router";
import createContactRouter from "./Contact.router";
import createFacilityRouter from "./Facility.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as CategoryClientType } from "./Category.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as ServiceClientType } from "./Service.router";
import { ClientType as InquiryClientType } from "./Inquiry.router";
import { ClientType as PartnerClientType } from "./Partner.router";
import { ClientType as CertificationClientType } from "./Certification.router";
import { ClientType as ContactClientType } from "./Contact.router";
import { ClientType as FacilityClientType } from "./Facility.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        category: createCategoryRouter(router, procedure),
        product: createProductRouter(router, procedure),
        service: createServiceRouter(router, procedure),
        inquiry: createInquiryRouter(router, procedure),
        partner: createPartnerRouter(router, procedure),
        certification: createCertificationRouter(router, procedure),
        contact: createContactRouter(router, procedure),
        facility: createFacilityRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    category: CategoryClientType<AppRouter>;
    product: ProductClientType<AppRouter>;
    service: ServiceClientType<AppRouter>;
    inquiry: InquiryClientType<AppRouter>;
    partner: PartnerClientType<AppRouter>;
    certification: CertificationClientType<AppRouter>;
    contact: ContactClientType<AppRouter>;
    facility: FacilityClientType<AppRouter>;
}
