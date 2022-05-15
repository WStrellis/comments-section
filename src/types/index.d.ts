import { GraphQLResolveInfo } from "graphql"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type AddUserResponse = Response & {
    __typename?: "AddUserResponse"
    message: Scalars["String"]
    success: Scalars["Boolean"]
    user?: Maybe<User>
}

export type Comment = {
    __typename?: "Comment"
    replies: Array<Maybe<Reply>>
    text: Scalars["String"]
    timestamp: Scalars["Int"]
    user?: Maybe<Scalars["ID"]>
}

export type Mutation = {
    __typename?: "Mutation"
    addUser: AddUserResponse
}

export type MutationAddUserArgs = {
    name: Scalars["String"]
}

export type Query = {
    __typename?: "Query"
    thread?: Maybe<Thread>
    user?: Maybe<User>
    users: QueryUsersResponse
}

export type QueryThreadArgs = {
    id: Scalars["ID"]
}

export type QueryUserArgs = {
    id: Scalars["ID"]
}

export type QueryUsersResponse = Response & {
    __typename?: "QueryUsersResponse"
    message: Scalars["String"]
    success: Scalars["Boolean"]
    users: Array<Maybe<User>>
}

export type Reply = {
    __typename?: "Reply"
    text: Scalars["String"]
    timestamp: Scalars["Int"]
    user?: Maybe<Scalars["ID"]>
}

export type Response = {
    message: Scalars["String"]
    success: Scalars["Boolean"]
}

export type Thread = {
    __typename?: "Thread"
    _id?: Maybe<Scalars["ID"]>
    comments: Array<Maybe<Comment>>
    title: Scalars["String"]
}

export type User = {
    __typename?: "User"
    _id?: Maybe<Scalars["ID"]>
    name?: Maybe<Scalars["String"]>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {},
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {},
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    AddUserResponse: ResolverTypeWrapper<AddUserResponse>
    Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
    Comment: ResolverTypeWrapper<Comment>
    ID: ResolverTypeWrapper<Scalars["ID"]>
    Int: ResolverTypeWrapper<Scalars["Int"]>
    Mutation: ResolverTypeWrapper<{}>
    Query: ResolverTypeWrapper<{}>
    QueryUsersResponse: ResolverTypeWrapper<QueryUsersResponse>
    Reply: ResolverTypeWrapper<Reply>
    Response:
        | ResolversTypes["AddUserResponse"]
        | ResolversTypes["QueryUsersResponse"]
    String: ResolverTypeWrapper<Scalars["String"]>
    Thread: ResolverTypeWrapper<Thread>
    User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    AddUserResponse: AddUserResponse
    Boolean: Scalars["Boolean"]
    Comment: Comment
    ID: Scalars["ID"]
    Int: Scalars["Int"]
    Mutation: {}
    Query: {}
    QueryUsersResponse: QueryUsersResponse
    Reply: Reply
    Response:
        | ResolversParentTypes["AddUserResponse"]
        | ResolversParentTypes["QueryUsersResponse"]
    String: Scalars["String"]
    Thread: Thread
    User: User
}

export type AddUserResponseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["AddUserResponse"] = ResolversParentTypes["AddUserResponse"],
> = {
    message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
    success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
    user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CommentResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
    replies?: Resolver<
        Array<Maybe<ResolversTypes["Reply"]>>,
        ParentType,
        ContextType
    >
    text?: Resolver<ResolversTypes["String"], ParentType, ContextType>
    timestamp?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
    user?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
    addUser?: Resolver<
        ResolversTypes["AddUserResponse"],
        ParentType,
        ContextType,
        RequireFields<MutationAddUserArgs, "name">
    >
}

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
    thread?: Resolver<
        Maybe<ResolversTypes["Thread"]>,
        ParentType,
        ContextType,
        RequireFields<QueryThreadArgs, "id">
    >
    user?: Resolver<
        Maybe<ResolversTypes["User"]>,
        ParentType,
        ContextType,
        RequireFields<QueryUserArgs, "id">
    >
    users?: Resolver<
        ResolversTypes["QueryUsersResponse"],
        ParentType,
        ContextType
    >
}

export type QueryUsersResponseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["QueryUsersResponse"] = ResolversParentTypes["QueryUsersResponse"],
> = {
    message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
    success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
    users?: Resolver<
        Array<Maybe<ResolversTypes["User"]>>,
        ParentType,
        ContextType
    >
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ReplyResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Reply"] = ResolversParentTypes["Reply"],
> = {
    text?: Resolver<ResolversTypes["String"], ParentType, ContextType>
    timestamp?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
    user?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ResponseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Response"] = ResolversParentTypes["Response"],
> = {
    __resolveType: TypeResolveFn<
        "AddUserResponse" | "QueryUsersResponse",
        ParentType,
        ContextType
    >
    message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
    success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
}

export type ThreadResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Thread"] = ResolversParentTypes["Thread"],
> = {
    _id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
    comments?: Resolver<
        Array<Maybe<ResolversTypes["Comment"]>>,
        ParentType,
        ContextType
    >
    title?: Resolver<ResolversTypes["String"], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
    _id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>
    name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
    AddUserResponse?: AddUserResponseResolvers<ContextType>
    Comment?: CommentResolvers<ContextType>
    Mutation?: MutationResolvers<ContextType>
    Query?: QueryResolvers<ContextType>
    QueryUsersResponse?: QueryUsersResponseResolvers<ContextType>
    Reply?: ReplyResolvers<ContextType>
    Response?: ResponseResolvers<ContextType>
    Thread?: ThreadResolvers<ContextType>
    User?: UserResolvers<ContextType>
}
