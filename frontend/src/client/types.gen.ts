// This file is auto-generated by @hey-api/openapi-ts

export type BodyLoginLoginAccessToken = {
	grant_type?: string | null;
	username: string;
	password: string;
	scope?: string;
	client_id?: string | null;
	client_secret?: string | null;
};

export type HttpValidationError = {
	detail?: Array<ValidationError>;
};

export type Message = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	message: string;
};

export type Post = {
	_id?: string;
	title?: string;
	body?: string;
	owner:
		| {
				id: string;
				collection: string;
		  }
		| {
				[key: string]: unknown;
		  };
	owner_id: string;
};

export type PostCreate = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	title?: string;
	body?: string;
	owner:
		| {
				id: string;
				collection: string;
		  }
		| {
				[key: string]: unknown;
		  };
	owner_id: string;
};

export type PostPublic = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	title?: string;
	body?: string;
	owner?: UserPublic | null;
	owner_id?: string | null;
	data: Array<Post>;
	total_count: number;
};

export type PostUpdate = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	title?: string | null;
	body?: string | null;
	owner:
		| {
				id: string;
				collection: string;
		  }
		| {
				[key: string]: unknown;
		  };
	owner_id?: string | null;
};

export type PrivateUserCreate = {
	email: string;
	password: string;
	username: string;
	is_verified?: boolean;
};

export type Token = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	access_token: string;
	token_type?: string;
};

export type UpdatePassword = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	current_password: string;
	new_password: string;
};

export type UserCreate = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	username: string;
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	password: string;
};

export type UserPublic = {
	_id: string;
	username: string;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
};

export type UserRegister = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	email: string;
	password: string;
	username: string;
};

export type UserUpdate = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	email?: string | null;
	password?: string | null;
	is_active?: boolean | null;
	is_superuser?: boolean | null;
	username?: string | null;
};

export type UserUpdateMe = {
	/**
	 * MongoDB document ObjectID
	 */
	_id?: string | null;
	username?: string | null;
	email?: string | null;
};

export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};

export type LoginLoginAccessTokenData = {
	body: BodyLoginLoginAccessToken;
	path?: never;
	query?: never;
	url: "/api/v1/login/access-token";
};

export type LoginLoginAccessTokenErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type LoginLoginAccessTokenError =
	LoginLoginAccessTokenErrors[keyof LoginLoginAccessTokenErrors];

export type LoginLoginAccessTokenResponses = {
	/**
	 * Successful Response
	 */
	200: Token;
};

export type LoginLoginAccessTokenResponse =
	LoginLoginAccessTokenResponses[keyof LoginLoginAccessTokenResponses];

export type LoginTestTokenData = {
	body?: never;
	path?: never;
	query?: never;
	url: "/api/v1/login/test-token";
};

export type LoginTestTokenResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type LoginTestTokenResponse =
	LoginTestTokenResponses[keyof LoginTestTokenResponses];

export type UsersReadUsersData = {
	body?: never;
	path?: never;
	query?: {
		skip?: number;
		limit?: number;
	};
	url: "/api/v1/users/";
};

export type UsersReadUsersErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersReadUsersError =
	UsersReadUsersErrors[keyof UsersReadUsersErrors];

export type UsersReadUsersResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type UsersCreateUserData = {
	body: UserCreate;
	path?: never;
	query?: never;
	url: "/api/v1/users/";
};

export type UsersCreateUserErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersCreateUserError =
	UsersCreateUserErrors[keyof UsersCreateUserErrors];

export type UsersCreateUserResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type UsersCreateUserResponse =
	UsersCreateUserResponses[keyof UsersCreateUserResponses];

export type UsersDeleteUserMeData = {
	body?: never;
	path?: never;
	query?: never;
	url: "/api/v1/users/me";
};

export type UsersDeleteUserMeResponses = {
	/**
	 * Successful Response
	 */
	200: Message;
};

export type UsersDeleteUserMeResponse =
	UsersDeleteUserMeResponses[keyof UsersDeleteUserMeResponses];

export type UsersReadUserMeData = {
	body?: never;
	path?: never;
	query?: never;
	url: "/api/v1/users/me";
};

export type UsersReadUserMeResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type UsersReadUserMeResponse =
	UsersReadUserMeResponses[keyof UsersReadUserMeResponses];

export type UsersUpdateUserMeData = {
	body: UserUpdateMe;
	path?: never;
	query?: never;
	url: "/api/v1/users/me";
};

export type UsersUpdateUserMeErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersUpdateUserMeError =
	UsersUpdateUserMeErrors[keyof UsersUpdateUserMeErrors];

export type UsersUpdateUserMeResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type UsersUpdateUserMeResponse =
	UsersUpdateUserMeResponses[keyof UsersUpdateUserMeResponses];

export type UsersUpdatePasswordMeData = {
	body: UpdatePassword;
	path?: never;
	query?: never;
	url: "/api/v1/users/me/password";
};

export type UsersUpdatePasswordMeErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersUpdatePasswordMeError =
	UsersUpdatePasswordMeErrors[keyof UsersUpdatePasswordMeErrors];

export type UsersUpdatePasswordMeResponses = {
	/**
	 * Successful Response
	 */
	200: Message;
};

export type UsersUpdatePasswordMeResponse =
	UsersUpdatePasswordMeResponses[keyof UsersUpdatePasswordMeResponses];

export type UsersRegisterUserData = {
	body: UserRegister;
	path?: never;
	query?: never;
	url: "/api/v1/users/signup";
};

export type UsersRegisterUserErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersRegisterUserError =
	UsersRegisterUserErrors[keyof UsersRegisterUserErrors];

export type UsersRegisterUserResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type UsersRegisterUserResponse =
	UsersRegisterUserResponses[keyof UsersRegisterUserResponses];

export type UsersDeleteUserData = {
	body?: never;
	path: {
		user_id: string;
	};
	query?: never;
	url: "/api/v1/users/{user_id}";
};

export type UsersDeleteUserErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersDeleteUserError =
	UsersDeleteUserErrors[keyof UsersDeleteUserErrors];

export type UsersDeleteUserResponses = {
	/**
	 * Successful Response
	 */
	200: Message;
};

export type UsersDeleteUserResponse =
	UsersDeleteUserResponses[keyof UsersDeleteUserResponses];

export type UsersReadUserByIdData = {
	body?: never;
	path: {
		user_id: string;
	};
	query?: never;
	url: "/api/v1/users/{user_id}";
};

export type UsersReadUserByIdErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersReadUserByIdError =
	UsersReadUserByIdErrors[keyof UsersReadUserByIdErrors];

export type UsersReadUserByIdResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type UsersReadUserByIdResponse =
	UsersReadUserByIdResponses[keyof UsersReadUserByIdResponses];

export type UsersUpdateUserData = {
	body: UserUpdate;
	path: {
		user_id: string;
	};
	query?: never;
	url: "/api/v1/users/{user_id}";
};

export type UsersUpdateUserErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UsersUpdateUserError =
	UsersUpdateUserErrors[keyof UsersUpdateUserErrors];

export type UsersUpdateUserResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type UsersUpdateUserResponse =
	UsersUpdateUserResponses[keyof UsersUpdateUserResponses];

export type PostsReadPostsData = {
	body?: never;
	path?: never;
	query?: {
		skip?: number;
		limit?: number;
	};
	url: "/api/v1/posts/";
};

export type PostsReadPostsErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type PostsReadPostsError =
	PostsReadPostsErrors[keyof PostsReadPostsErrors];

export type PostsReadPostsResponses = {
	/**
	 * Successful Response
	 */
	200: PostPublic;
};

export type PostsReadPostsResponse =
	PostsReadPostsResponses[keyof PostsReadPostsResponses];

export type PostsCreatePostData = {
	body: PostCreate;
	path?: never;
	query?: never;
	url: "/api/v1/posts/";
};

export type PostsCreatePostErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type PostsCreatePostError =
	PostsCreatePostErrors[keyof PostsCreatePostErrors];

export type PostsCreatePostResponses = {
	/**
	 * Successful Response
	 */
	200: PostPublic;
};

export type PostsCreatePostResponse =
	PostsCreatePostResponses[keyof PostsCreatePostResponses];

export type PostsDeletePostData = {
	body?: never;
	path: {
		id: string;
	};
	query?: never;
	url: "/api/v1/posts/{id}";
};

export type PostsDeletePostErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type PostsDeletePostError =
	PostsDeletePostErrors[keyof PostsDeletePostErrors];

export type PostsDeletePostResponses = {
	/**
	 * Successful Response
	 */
	200: Message;
};

export type PostsDeletePostResponse =
	PostsDeletePostResponses[keyof PostsDeletePostResponses];

export type PostsUpdatePostData = {
	body: PostUpdate;
	path: {
		id: string;
	};
	query?: never;
	url: "/api/v1/posts/{id}";
};

export type PostsUpdatePostErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type PostsUpdatePostError =
	PostsUpdatePostErrors[keyof PostsUpdatePostErrors];

export type PostsUpdatePostResponses = {
	/**
	 * Successful Response
	 */
	200: PostPublic;
};

export type PostsUpdatePostResponse =
	PostsUpdatePostResponses[keyof PostsUpdatePostResponses];

export type PrivateCreateUserData = {
	body: PrivateUserCreate;
	path?: never;
	query?: never;
	url: "/api/v1/private/users/";
};

export type PrivateCreateUserErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type PrivateCreateUserError =
	PrivateCreateUserErrors[keyof PrivateCreateUserErrors];

export type PrivateCreateUserResponses = {
	/**
	 * Successful Response
	 */
	200: UserPublic;
};

export type PrivateCreateUserResponse =
	PrivateCreateUserResponses[keyof PrivateCreateUserResponses];

export type ClientOptions = {
	baseUrl: `${string}://${string}` | (string & {});
};
