import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  ObjectID: string;
};

export enum ActionType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Read = 'READ',
  Update = 'UPDATE'
}

export type Comment = {
  __typename?: 'Comment';
  replies: Array<Maybe<Reply>>;
  text: Scalars['String'];
  timestamp: Scalars['DateTime'];
  user?: Maybe<Scalars['ObjectID']>;
};

export type CommentResponse = Response & {
  __typename?: 'CommentResponse';
  action: ActionType;
  data?: Maybe<Comment>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
  threadId: Scalars['String'];
};

export type CommentsResponse = Response & {
  __typename?: 'CommentsResponse';
  action: ActionType;
  data: Array<Maybe<Comment>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
  threadId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: UserResponse;
  createComment: CommentResponse;
  createReply: ReplyResponse;
  createThread: ThreadResponse;
};


export type MutationAddUserArgs = {
  name: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  text: Scalars['String'];
  threadId: Scalars['String'];
  user: Scalars['ObjectID'];
};


export type MutationCreateReplyArgs = {
  commentIdx: Scalars['Int'];
  text: Scalars['String'];
  threadId: Scalars['String'];
  user: Scalars['ObjectID'];
};


export type MutationCreateThreadArgs = {
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  thread: ThreadResponse;
  threads: ThreadsResponse;
  user: UserResponse;
  users: UsersResponse;
};


export type QueryThreadArgs = {
  id: Scalars['ObjectID'];
};


export type QueryUserArgs = {
  id: Scalars['ObjectID'];
};

export type RepliesResponse = Response & {
  __typename?: 'RepliesResponse';
  action: ActionType;
  commentIndex: Scalars['Int'];
  data: Array<Maybe<Reply>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
  threadId: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  text: Scalars['String'];
  timestamp: Scalars['DateTime'];
  user?: Maybe<Scalars['ObjectID']>;
};

export type ReplyResponse = Response & {
  __typename?: 'ReplyResponse';
  action: ActionType;
  commentIndex: Scalars['Int'];
  data?: Maybe<Reply>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
  threadId: Scalars['String'];
};

export type Response = {
  action: ActionType;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Thread = {
  __typename?: 'Thread';
  _id?: Maybe<Scalars['ObjectID']>;
  comments: Array<Maybe<Comment>>;
  created: Scalars['DateTime'];
  title: Scalars['String'];
};

export type ThreadResponse = Response & {
  __typename?: 'ThreadResponse';
  action: ActionType;
  data?: Maybe<Thread>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type ThreadsResponse = Response & {
  __typename?: 'ThreadsResponse';
  action: ActionType;
  data: Array<Maybe<Thread>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ObjectID']>;
  name?: Maybe<Scalars['String']>;
};

export type UserResponse = Response & {
  __typename?: 'UserResponse';
  action: ActionType;
  data?: Maybe<User>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UsersResponse = Response & {
  __typename?: 'UsersResponse';
  action: ActionType;
  data: Array<Maybe<User>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ActionType: ActionType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentResponse: ResolverTypeWrapper<CommentResponse>;
  CommentsResponse: ResolverTypeWrapper<CommentsResponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  Query: ResolverTypeWrapper<{}>;
  RepliesResponse: ResolverTypeWrapper<RepliesResponse>;
  Reply: ResolverTypeWrapper<Reply>;
  ReplyResponse: ResolverTypeWrapper<ReplyResponse>;
  Response: ResolversTypes['CommentResponse'] | ResolversTypes['CommentsResponse'] | ResolversTypes['RepliesResponse'] | ResolversTypes['ReplyResponse'] | ResolversTypes['ThreadResponse'] | ResolversTypes['ThreadsResponse'] | ResolversTypes['UserResponse'] | ResolversTypes['UsersResponse'];
  String: ResolverTypeWrapper<Scalars['String']>;
  Thread: ResolverTypeWrapper<Thread>;
  ThreadResponse: ResolverTypeWrapper<ThreadResponse>;
  ThreadsResponse: ResolverTypeWrapper<ThreadsResponse>;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UsersResponse: ResolverTypeWrapper<UsersResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentResponse: CommentResponse;
  CommentsResponse: CommentsResponse;
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Query: {};
  RepliesResponse: RepliesResponse;
  Reply: Reply;
  ReplyResponse: ReplyResponse;
  Response: ResolversParentTypes['CommentResponse'] | ResolversParentTypes['CommentsResponse'] | ResolversParentTypes['RepliesResponse'] | ResolversParentTypes['ReplyResponse'] | ResolversParentTypes['ThreadResponse'] | ResolversParentTypes['ThreadsResponse'] | ResolversParentTypes['UserResponse'] | ResolversParentTypes['UsersResponse'];
  String: Scalars['String'];
  Thread: Thread;
  ThreadResponse: ThreadResponse;
  ThreadsResponse: ThreadsResponse;
  User: User;
  UserResponse: UserResponse;
  UsersResponse: UsersResponse;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  replies?: Resolver<Array<Maybe<ResolversTypes['Reply']>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentResponse'] = ResolversParentTypes['CommentResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threadId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentsResponse'] = ResolversParentTypes['CommentsResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  data?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threadId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'name'>>;
  createComment?: Resolver<ResolversTypes['CommentResponse'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'text' | 'threadId' | 'user'>>;
  createReply?: Resolver<ResolversTypes['ReplyResponse'], ParentType, ContextType, RequireFields<MutationCreateReplyArgs, 'commentIdx' | 'text' | 'threadId' | 'user'>>;
  createThread?: Resolver<ResolversTypes['ThreadResponse'], ParentType, ContextType, RequireFields<MutationCreateThreadArgs, 'title'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  thread?: Resolver<ResolversTypes['ThreadResponse'], ParentType, ContextType, RequireFields<QueryThreadArgs, 'id'>>;
  threads?: Resolver<ResolversTypes['ThreadsResponse'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<ResolversTypes['UsersResponse'], ParentType, ContextType>;
};

export type RepliesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RepliesResponse'] = ResolversParentTypes['RepliesResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  commentIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Array<Maybe<ResolversTypes['Reply']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threadId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reply'] = ResolversParentTypes['Reply']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReplyResponse'] = ResolversParentTypes['ReplyResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  commentIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Reply']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threadId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  __resolveType: TypeResolveFn<'CommentResponse' | 'CommentsResponse' | 'RepliesResponse' | 'ReplyResponse' | 'ThreadResponse' | 'ThreadsResponse' | 'UserResponse' | 'UsersResponse', ParentType, ContextType>;
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadResponse'] = ResolversParentTypes['ThreadResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadsResponse'] = ResolversParentTypes['ThreadsResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  data?: Resolver<Array<Maybe<ResolversTypes['Thread']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersResponse'] = ResolversParentTypes['UsersResponse']> = {
  action?: Resolver<ResolversTypes['ActionType'], ParentType, ContextType>;
  data?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CommentResponse?: CommentResponseResolvers<ContextType>;
  CommentsResponse?: CommentsResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RepliesResponse?: RepliesResponseResolvers<ContextType>;
  Reply?: ReplyResolvers<ContextType>;
  ReplyResponse?: ReplyResponseResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Thread?: ThreadResolvers<ContextType>;
  ThreadResponse?: ThreadResponseResolvers<ContextType>;
  ThreadsResponse?: ThreadsResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UsersResponse?: UsersResponseResolvers<ContextType>;
};

