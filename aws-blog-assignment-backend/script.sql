-- public.user_roles definition

-- Drop table

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	role_name varchar NOT NULL,
	CONSTRAINT user_roles_pk PRIMARY KEY (id)
);


-- public.blog_category definition

-- Drop table

-- DROP TABLE public.blog_category;

CREATE TABLE public.blog_category (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	category_name varchar NOT NULL,
	CONSTRAINT blog_category_pk PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	email varchar NOT NULL,
	"role" int4 NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_fk FOREIGN KEY (role) REFERENCES user_roles(id)
);


-- public.blogs definition

-- Drop table

-- DROP TABLE public.blogs;

CREATE TABLE public.blogs (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	blog_title varchar NOT NULL,
	blog_description varchar NOT NULL,
	blog_image varchar NOT NULL,
	blog_date timestamp(0) NOT NULL DEFAULT now(),
	blog_category int4 NOT NULL,
	blog_tags varchar NOT NULL,
	blog_author int4 NOT NULL,
	CONSTRAINT blogs_pk PRIMARY KEY (id),
	CONSTRAINT blogs_category_fk FOREIGN KEY (blog_category) REFERENCES blog_category(id),
	CONSTRAINT blogs_fk FOREIGN KEY (blog_author) REFERENCES users(id)
);