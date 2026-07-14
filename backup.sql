--
-- PostgreSQL database dump
--

\restrict BTqYToBMV2O3s1Iju12GaIe9inKNB4TLraQGhdIjLbSkGrnsdZ5hbiovK6hvNqE

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO postgres;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: postgres
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: postgres
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: postgres
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id text NOT NULL,
    account_id text NOT NULL,
    user_id text NOT NULL,
    provider_id text NOT NULL,
    password text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.account OWNER TO postgres;

--
-- Name: billing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.billing (
    id integer NOT NULL,
    next_payment_date text NOT NULL,
    last_billed_date text NOT NULL,
    amount_due text NOT NULL,
    status text NOT NULL,
    invoice_url text NOT NULL
);


ALTER TABLE public.billing OWNER TO postgres;

--
-- Name: billing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.billing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.billing_id_seq OWNER TO postgres;

--
-- Name: billing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.billing_id_seq OWNED BY public.billing.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name text NOT NULL,
    company text NOT NULL,
    city text NOT NULL,
    progress integer DEFAULT 0,
    created timestamp without time zone DEFAULT now(),
    avatar text NOT NULL,
    via text NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: financetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financetable (
    id integer NOT NULL,
    amount numeric(15,2) NOT NULL,
    date timestamp without time zone NOT NULL,
    via text NOT NULL,
    account text NOT NULL,
    action text NOT NULL,
    icon text NOT NULL
);


ALTER TABLE public.financetable OWNER TO postgres;

--
-- Name: financetable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financetable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.financetable_id_seq OWNER TO postgres;

--
-- Name: financetable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financetable_id_seq OWNED BY public.financetable.id;


--
-- Name: financial_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financial_stats (
    id integer NOT NULL,
    label text NOT NULL,
    value text NOT NULL,
    icon text NOT NULL,
    color text NOT NULL
);


ALTER TABLE public.financial_stats OWNER TO postgres;

--
-- Name: financial_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financial_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.financial_stats_id_seq OWNER TO postgres;

--
-- Name: financial_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financial_stats_id_seq OWNED BY public.financial_stats.id;


--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form_submissions (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text,
    phone text,
    currency text DEFAULT 'USD'::text,
    ip text,
    dropdown text,
    custom_dropdown text,
    date text,
    textarea text,
    checkbox text[],
    radio text,
    radio_warning text,
    switch_one boolean DEFAULT true,
    switch_two boolean DEFAULT false,
    switch_danger_one boolean DEFAULT true,
    switch_danger_two boolean DEFAULT false,
    file text,
    email_state text DEFAULT 'normal'::text,
    textarea_state text DEFAULT 'normal'::text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.form_submissions OWNER TO postgres;

--
-- Name: form_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.form_submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.form_submissions_id_seq OWNER TO postgres;

--
-- Name: form_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.form_submissions_id_seq OWNED BY public.form_submissions.id;


--
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoices (
    id integer NOT NULL,
    date text NOT NULL,
    amount text NOT NULL,
    status text NOT NULL,
    invoice_url text NOT NULL
);


ALTER TABLE public.invoices OWNER TO postgres;

--
-- Name: invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invoices_id_seq OWNER TO postgres;

--
-- Name: invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invoices_id_seq OWNED BY public.invoices.id;


--
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id text NOT NULL,
    user_id text NOT NULL,
    organization_id text NOT NULL,
    role text DEFAULT 'member'::text,
    joined_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.members OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.members_id_seq OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id text NOT NULL,
    name text NOT NULL,
    slug text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- Name: overview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.overview (
    id integer NOT NULL,
    title text NOT NULL,
    value text NOT NULL,
    icon text NOT NULL,
    icon_color text NOT NULL,
    trend_value real NOT NULL
);


ALTER TABLE public.overview OWNER TO postgres;

--
-- Name: overview_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.overview_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.overview_id_seq OWNER TO postgres;

--
-- Name: overview_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.overview_id_seq OWNED BY public.overview.id;


--
-- Name: payment_methods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_methods (
    id integer NOT NULL,
    card_type text NOT NULL,
    last_four text NOT NULL,
    expiry_date text NOT NULL,
    cardholder_name text NOT NULL,
    is_primary boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payment_methods OWNER TO postgres;

--
-- Name: payment_methods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_methods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_methods_id_seq OWNER TO postgres;

--
-- Name: payment_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_methods_id_seq OWNED BY public.payment_methods.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    date text NOT NULL,
    tags text[] NOT NULL,
    price text NOT NULL,
    avatar text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    company text NOT NULL,
    city text NOT NULL,
    avatar text NOT NULL,
    likes integer DEFAULT 0,
    posts integer DEFAULT 0,
    media integer DEFAULT 0,
    links integer DEFAULT 0,
    files integer DEFAULT 0
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_id_seq OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_id_seq OWNED BY public.profile.id;


--
-- Name: profile_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_settings (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    avatar text NOT NULL,
    notifications_enabled boolean DEFAULT false NOT NULL,
    last_login_at timestamp without time zone,
    last_login_ip text,
    is_verified boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profile_settings OWNER TO postgres;

--
-- Name: profile_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_settings_id_seq OWNER TO postgres;

--
-- Name: profile_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_settings_id_seq OWNED BY public.profile_settings.id;


--
-- Name: security; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.security (
    id integer NOT NULL,
    last_login text NOT NULL,
    ip text NOT NULL,
    api_status boolean DEFAULT false NOT NULL,
    two_factor_auth boolean DEFAULT false NOT NULL,
    password_changed_at text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.security OWNER TO postgres;

--
-- Name: security_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.security_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.security_id_seq OWNER TO postgres;

--
-- Name: security_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.security_id_seq OWNED BY public.security.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    id text NOT NULL,
    user_id text NOT NULL,
    ip_address text,
    created_at timestamp without time zone DEFAULT now(),
    expires_at timestamp without time zone NOT NULL,
    organization_id text,
    token text NOT NULL,
    user_agent text,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id text NOT NULL,
    organization_id text NOT NULL,
    plan text DEFAULT 'free'::text,
    status text DEFAULT 'active'::text,
    current_period_end timestamp without time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    tran_id text
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscriptions_id_seq OWNER TO postgres;

--
-- Name: subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscriptions_id_seq OWNED BY public.subscriptions.id;


--
-- Name: support_conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_conversations (
    id integer NOT NULL,
    user_id integer,
    email character varying(255),
    status character varying(20) DEFAULT 'open'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.support_conversations OWNER TO postgres;

--
-- Name: support_conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_conversations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.support_conversations_id_seq OWNER TO postgres;

--
-- Name: support_conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_conversations_id_seq OWNED BY public.support_conversations.id;


--
-- Name: support_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_messages (
    id integer NOT NULL,
    conversation_id integer NOT NULL,
    role character varying(20) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.support_messages OWNER TO postgres;

--
-- Name: support_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.support_messages_id_seq OWNER TO postgres;

--
-- Name: support_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_messages_id_seq OWNED BY public.support_messages.id;


--
-- Name: trends_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trends_data (
    id integer NOT NULL,
    graph jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.trends_data OWNER TO postgres;

--
-- Name: trends_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trends_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trends_data_id_seq OWNER TO postgres;

--
-- Name: trends_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trends_data_id_seq OWNED BY public.trends_data.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text,
    avatar text,
    email_verified boolean DEFAULT false,
    last_login_at timestamp without time zone,
    last_login_ip text,
    notifications_enabled boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: users_custom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_custom (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    avatar character varying(255),
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    last_login_at timestamp without time zone,
    last_login_ip character varying(45),
    notifications_enabled boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users_custom OWNER TO postgres;

--
-- Name: users_custom_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_custom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_custom_id_seq OWNER TO postgres;

--
-- Name: users_custom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_custom_id_seq OWNED BY public.users_custom.id;


--
-- Name: usersprofile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usersprofile (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    avatar text,
    password text NOT NULL,
    amount integer DEFAULT 0 NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    is_verified boolean DEFAULT false NOT NULL,
    last_login_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.usersprofile OWNER TO postgres;

--
-- Name: usersprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usersprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usersprofile_id_seq OWNER TO postgres;

--
-- Name: usersprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usersprofile_id_seq OWNED BY public.usersprofile.id;


--
-- Name: verification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    type text,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.verification OWNER TO postgres;

--
-- Name: verification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.verification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.verification_id_seq OWNER TO postgres;

--
-- Name: verification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.verification_id_seq OWNED BY public.verification.id;


--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Name: billing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing ALTER COLUMN id SET DEFAULT nextval('public.billing_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: financetable id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financetable ALTER COLUMN id SET DEFAULT nextval('public.financetable_id_seq'::regclass);


--
-- Name: financial_stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financial_stats ALTER COLUMN id SET DEFAULT nextval('public.financial_stats_id_seq'::regclass);


--
-- Name: form_submissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_submissions ALTER COLUMN id SET DEFAULT nextval('public.form_submissions_id_seq'::regclass);


--
-- Name: invoices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices ALTER COLUMN id SET DEFAULT nextval('public.invoices_id_seq'::regclass);


--
-- Name: overview id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.overview ALTER COLUMN id SET DEFAULT nextval('public.overview_id_seq'::regclass);


--
-- Name: payment_methods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_methods ALTER COLUMN id SET DEFAULT nextval('public.payment_methods_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile ALTER COLUMN id SET DEFAULT nextval('public.profile_id_seq'::regclass);


--
-- Name: profile_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_settings ALTER COLUMN id SET DEFAULT nextval('public.profile_settings_id_seq'::regclass);


--
-- Name: security id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.security ALTER COLUMN id SET DEFAULT nextval('public.security_id_seq'::regclass);


--
-- Name: support_conversations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_conversations ALTER COLUMN id SET DEFAULT nextval('public.support_conversations_id_seq'::regclass);


--
-- Name: support_messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_messages ALTER COLUMN id SET DEFAULT nextval('public.support_messages_id_seq'::regclass);


--
-- Name: trends_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trends_data ALTER COLUMN id SET DEFAULT nextval('public.trends_data_id_seq'::regclass);


--
-- Name: users_custom id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_custom ALTER COLUMN id SET DEFAULT nextval('public.users_custom_id_seq'::regclass);


--
-- Name: usersprofile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usersprofile ALTER COLUMN id SET DEFAULT nextval('public.usersprofile_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
2	98cd67fe91f1a32d87920eb9821fffbf002e71479551aa79517731994b2078b2	1773423263963
3	5e384c7040f1cae78dd9a2a6d818cbba155ee8ba93d20e26df44597b1077c539	1773423826377
4	75c005ba1f8ff7740ae4f7801f66b29e087acf5a3b71048758ae7a7fa685e9c1	1773510468963
5	48104bbb6228c827db1b3569fbd818185fb257d098f42c827063cb8d413a6f10	1775317680685
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (id, account_id, user_id, provider_id, password, created_at, updated_at) FROM stdin;
tdVfKAiKQqmmf57VlaVoNquHsk6rCJKF	isRxzoKgBLTCdeHbAlmJg6JYwgbegXRp	isRxzoKgBLTCdeHbAlmJg6JYwgbegXRp	credential	89b4a734ef765ba770233d08813832e5:a13611d83d31c2ff7b8a9b65c7b05d413892a337b2dd311a509460681bbba3ec223df2cd3644717a73a9f33125e1f85bfc9bdf76544e5dd9589a0dc4034154e5	2026-03-14 17:50:02.739	2026-03-14 17:50:02.739
VWyi3HVePv9xxBeiqOWuPGaaN1RnBWsE	4EsMxvyLGUSMzShsdnqa5UPlFzaibI4c	4EsMxvyLGUSMzShsdnqa5UPlFzaibI4c	credential	39e822c9a9d519aaed1bfb2c51e86da4:01839baba5207e8d6954f9ec297f1727f6f9d83a34fc600bedfbee8fecdac89026618b237f4413b95abef8194c4682eabb6e5026d96440f9fc1f993d7c953b2f	2026-03-18 17:33:48.958	2026-03-18 17:33:48.958
\.


--
-- Data for Name: billing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.billing (id, next_payment_date, last_billed_date, amount_due, status, invoice_url) FROM stdin;
1	Sun, Feb 1, 2026	Thu, Jan 1, 2026	$24.99	Paid	#
2	Sun, Feb 1, 2026	Thu, Jan 1, 2026	$24.99	Paid	#
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, name, company, city, progress, created, avatar, via) FROM stdin;
\.


--
-- Data for Name: financetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.financetable (id, amount, date, via, account, action, icon) FROM stdin;
\.


--
-- Data for Name: financial_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.financial_stats (id, label, value, icon, color) FROM stdin;
\.


--
-- Data for Name: form_submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.form_submissions (id, name, email, password, phone, currency, ip, dropdown, custom_dropdown, date, textarea, checkbox, radio, radio_warning, switch_one, switch_two, switch_danger_one, switch_danger_two, file, email_state, textarea_state, created_at) FROM stdin;
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoices (id, date, amount, status, invoice_url) FROM stdin;
1	Thu, Jan 1, 2026	$24.99	Paid	#
2	Mon, Dec 1, 2025	$24.99	Paid	#
3	Sat, Nov 1, 2025	$24.99	Paid	#
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.members (id, user_id, organization_id, role, joined_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizations (id, name, slug, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: overview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.overview (id, title, value, icon, icon_color, trend_value) FROM stdin;
1	Clients	512	mdi:account-group	text-green-500	12
2	Sales	$7,770	mdi:cart-outline	text-blue-500	-12
3	Performance	256%	mdi:chart-line	text-red-500	8
4	Alerts	24	mdi:bell-outline	text-yellow-500	0
57	Test Metric	50	i-heroicons-chart-bar	blue	5
58	Test Metric	100	i-heroicons-chart-bar	blue	15
\.


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_methods (id, card_type, last_four, expiry_date, cardholder_name, is_primary, created_at) FROM stdin;
1	MasterCard	4575	04/24	JOHN DOE	f	2026-01-19 22:27:59.838084
2	Visa	0785	06/26	JOHN DOE	t	2026-01-19 22:27:59.838084
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, date, tags, price, avatar) FROM stdin;
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, name, role, company, city, avatar, likes, posts, media, links, files) FROM stdin;
\.


--
-- Data for Name: profile_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_settings (id, name, email, password, avatar, notifications_enabled, last_login_at, last_login_ip, is_verified, created_at) FROM stdin;
1	farzana	farzanap1531994@gmail.com	$2b$10$ih5X9QnY/EoV89QQfSTRhuUS/4vKstZWJrvVGir7.IWyRsyh1DaNG	https://res.cloudinary.com/difzbwxap/image/upload/v1769137501/avatars/pwdk2eeqalwkggiyywix.jpg	t	2026-01-25 17:16:10.532	\N	t	2026-01-23 09:05:16.611036
\.


--
-- Data for Name: security; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.security (id, last_login, ip, api_status, two_factor_auth, password_changed_at, created_at) FROM stdin;
1	Thu, Jan 1, 2026	192.168.100.99	t	t	long time ago	2026-01-20 21:27:22.059025
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (id, user_id, ip_address, created_at, expires_at, organization_id, token, user_agent, updated_at) FROM stdin;
E1l3yRSZz8IrNp31csE28snoXH7C6ba2	isRxzoKgBLTCdeHbAlmJg6JYwgbegXRp	0000:0000:0000:0000:0000:0000:0000:0000	2026-03-14 17:50:02.746	2026-03-21 17:50:02.746	\N	TKAg3TVDb00KxuE9K9hBSbFLC1PQZgsP	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-14 17:50:02.746
R02HsstCrzaEw3aHtQQr2TxJKHk6glz3	isRxzoKgBLTCdeHbAlmJg6JYwgbegXRp	0000:0000:0000:0000:0000:0000:0000:0000	2026-03-14 17:50:12.578	2026-03-21 17:50:12.578	\N	cYelECYjle2ejnbQCw4QuX3DeI0EZ9fm	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-14 17:50:12.578
3pG2cOrDuUojyxyfrqTE4HlCoFaJvFZP	4EsMxvyLGUSMzShsdnqa5UPlFzaibI4c	0000:0000:0000:0000:0000:0000:0000:0000	2026-03-18 17:33:48.966	2026-03-29 15:15:40.132	\N	Ix5zhiekrIFT6yBNfXycZQkDOtgS1Lhb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-22 15:15:40.132
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, organization_id, plan, status, current_period_end, created_at, updated_at, tran_id) FROM stdin;
\.


--
-- Data for Name: support_conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_conversations (id, user_id, email, status, created_at) FROM stdin;
1	\N	\N	open	2026-02-15 20:52:09.952518
2	\N	\N	open	2026-02-15 21:09:21.600974
3	\N	\N	open	2026-02-15 21:25:49.669827
4	\N	\N	open	2026-02-15 22:09:50.577236
5	\N	\N	open	2026-02-15 22:10:42.133201
6	\N	\N	open	2026-02-15 22:26:32.431433
7	\N	\N	open	2026-02-15 22:33:48.631465
8	\N	\N	open	2026-02-17 00:38:16.10183
9	\N	\N	open	2026-02-17 10:42:38.542268
10	\N	\N	open	2026-02-17 11:36:58.46619
11	\N	\N	open	2026-02-17 20:44:20.682846
12	\N	\N	open	2026-02-18 02:49:41.555672
13	\N	\N	open	2026-02-18 10:39:27.00132
14	\N	\N	open	2026-02-20 00:17:59.739743
15	\N	\N	open	2026-02-20 13:25:55.399866
16	\N	\N	open	2026-02-20 18:51:52.084242
17	\N	\N	open	2026-02-21 23:21:51.914302
18	\N	\N	open	2026-02-22 11:43:29.401587
19	\N	\N	open	2026-02-26 12:54:04.248468
20	\N	\N	open	2026-03-01 23:08:21.683368
21	\N	\N	open	2026-03-08 22:18:26.976748
22	\N	\N	open	2026-03-10 03:16:28.128065
23	\N	\N	open	2026-03-10 03:16:47.190371
24	\N	\N	open	2026-03-22 21:15:55.49264
\.


--
-- Data for Name: support_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_messages (id, conversation_id, role, content, created_at, updated_at) FROM stdin;
1	1	user	hi	2026-02-15 20:52:09.961662	2026-02-15 20:52:09.961662
2	1	assistant	Sorry, we are unable to respond right now.	2026-02-15 20:52:11.525725	2026-02-15 20:52:11.525725
3	2	user	hi	2026-02-15 21:09:21.633674	2026-02-15 21:09:21.633674
4	2	assistant	Sorry, we are unable to respond right now.	2026-02-15 21:09:23.115917	2026-02-15 21:09:23.115917
5	3	user	hi	2026-02-15 21:25:49.70437	2026-02-15 21:25:49.70437
6	3	assistant	Sorry, we are unable to respond right now.	2026-02-15 21:25:52.419445	2026-02-15 21:25:52.419445
7	4	user	hi	2026-02-15 22:09:50.613679	2026-02-15 22:09:50.613679
8	4	assistant	Hello there! How can I help you today?	2026-02-15 22:09:57.510744	2026-02-15 22:09:57.510744
9	4	user	how are	2026-02-15 22:10:06.266368	2026-02-15 22:10:06.266368
10	4	assistant	How are you? 😊	2026-02-15 22:10:08.058377	2026-02-15 22:10:08.058377
11	4	user	you are ok?	2026-02-15 22:10:17.293486	2026-02-15 22:10:17.293486
12	4	assistant	Yes, I’m doing well, thank you for asking! How about you?	2026-02-15 22:10:20.295238	2026-02-15 22:10:20.295238
13	5	user	http?	2026-02-15 22:10:42.137639	2026-02-15 22:10:42.137639
14	5	assistant	I understand you’re looking for assistance. However, the URL “http?” doesn’t provide any context or clear request. \n\nI’m going to respond as a professional customer support assistant. \n\nPlease tell me what you need help with?	2026-02-15 22:10:47.255535	2026-02-15 22:10:47.255535
15	6	user	hellow how are you?	2026-02-15 22:26:32.457076	2026-02-15 22:26:32.457076
16	6	assistant	I’m doing well, thank you for asking! How can I help you today?	2026-02-15 22:26:42.075017	2026-02-15 22:26:42.075017
17	7	user	hi	2026-02-15 22:33:48.656665	2026-02-15 22:33:48.656665
18	7	assistant	Hello! How can I help you today?	2026-02-15 22:33:57.399413	2026-02-15 22:33:57.399413
19	8	user	hi	2026-02-17 00:38:16.133069	2026-02-17 00:38:16.133069
20	8	assistant	Sorry, we are unable to respond right now.	2026-02-17 00:38:16.243796	2026-02-17 00:38:16.243796
21	9	user	hi	2026-02-17 10:42:38.570329	2026-02-17 10:42:38.570329
22	9	assistant	Sorry, we are unable to respond right now.	2026-02-17 10:42:38.636202	2026-02-17 10:42:38.636202
23	9	user	hi	2026-02-17 11:28:42.164132	2026-02-17 11:28:42.164132
24	9	assistant	Sorry, we are unable to respond right now.	2026-02-17 11:28:42.244934	2026-02-17 11:28:42.244934
25	10	user	hi	2026-02-17 11:36:58.479159	2026-02-17 11:36:58.479159
26	10	assistant	Hello! How can I help you today?	2026-02-17 11:37:04.662213	2026-02-17 11:37:04.662213
27	11	user	hi	2026-02-17 20:44:20.694774	2026-02-17 20:44:20.694774
28	11	assistant	Hello there! How can I help you today?	2026-02-17 20:44:25.885789	2026-02-17 20:44:25.885789
29	12	user	hi	2026-02-18 02:49:41.579564	2026-02-18 02:49:41.579564
30	12	assistant	Hello there! How can I help you today?	2026-02-18 02:49:49.336266	2026-02-18 02:49:49.336266
31	13	user	hi	2026-02-18 10:39:27.024718	2026-02-18 10:39:27.024718
32	13	assistant	Hello! How can I help you today?	2026-02-18 10:39:33.246965	2026-02-18 10:39:33.246965
33	14	user	how are you?	2026-02-20 00:17:59.763288	2026-02-20 00:17:59.763288
34	14	assistant	I'm doing well, thank you for asking! 😊 How can I help you today?\n\nI’m still here, and I’ll follow up if I need more information.	2026-02-20 00:18:06.924961	2026-02-20 00:18:06.924961
35	14	user	are you know me?	2026-02-20 00:18:20.353418	2026-02-20 00:18:20.353418
36	14	assistant	I understand you’re asking a question, but I’m Gemma, an AI assistant. I don’t have memory of past conversations. 😊 \n\nI’m here to help you with your current request.	2026-02-20 00:18:24.762955	2026-02-20 00:18:24.762955
37	15	user	hi	2026-02-20 13:25:55.428608	2026-02-20 13:25:55.428608
38	15	assistant	Hello! How can I help you today?	2026-02-20 13:26:00.689681	2026-02-20 13:26:00.689681
39	16	user	hi	2026-02-20 18:51:52.097871	2026-02-20 18:51:52.097871
40	16	assistant	Hello! How can I help you today?	2026-02-20 18:51:56.706354	2026-02-20 18:51:56.706354
41	17	user	hellow	2026-02-21 23:21:51.941942	2026-02-21 23:21:51.941942
42	17	assistant	Hello there! How can I help you today?	2026-02-21 23:21:56.927884	2026-02-21 23:21:56.927884
43	18	user	hi	2026-02-22 11:43:29.428053	2026-02-22 11:43:29.428053
44	18	assistant	Hello there! How can I help you today?	2026-02-22 11:43:37.065116	2026-02-22 11:43:37.065116
45	18	user	how are you?	2026-02-22 11:43:50.739985	2026-02-22 11:43:50.739985
46	18	assistant	I’m doing well, thank you for asking! Just here and ready to assist. 😊 \n\nHow about you?	2026-02-22 11:43:53.795523	2026-02-22 11:43:53.795523
47	19	user	hi	2026-02-26 12:54:04.266309	2026-02-26 12:54:04.266309
48	19	assistant	Hello there! How can I help you today?	2026-02-26 12:54:09.674279	2026-02-26 12:54:09.674279
49	20	user	hi	2026-03-01 23:08:21.713028	2026-03-01 23:08:21.713028
50	20	assistant	Hello there! How can I help you today?	2026-03-01 23:08:27.280129	2026-03-01 23:08:27.280129
51	21	user	hi	2026-03-08 22:18:26.988908	2026-03-08 22:18:26.988908
52	21	assistant	Hello! How can I help you today?	2026-03-08 22:18:32.025681	2026-03-08 22:18:32.025681
53	22	user	hi	2026-03-10 03:16:28.15017	2026-03-10 03:16:28.15017
54	22	assistant	Hello! How can I help you today?	2026-03-10 03:16:36.974296	2026-03-10 03:16:36.974296
55	23	user	hi	2026-03-10 03:16:47.197884	2026-03-10 03:16:47.197884
56	23	assistant	Hello! How can I help you today?	2026-03-10 03:16:48.50141	2026-03-10 03:16:48.50141
57	24	user	hi	2026-03-22 21:15:55.514104	2026-03-22 21:15:55.514104
58	24	assistant	Sorry, we are unable to respond right now.	2026-03-22 21:15:58.31775	2026-03-22 21:15:58.31775
\.


--
-- Data for Name: trends_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trends_data (id, graph, created_at) FROM stdin;
1	{"labels": ["01", "02", "03", "04", "05", "06", "07", "08", "09"], "datasets": [{"data": [12000, 25000, 18000, 10000, 30000, 8000, 28000, 5000, 22000], "label": "Checking Account", "borderColor": "#10B981", "backgroundColor": "transparent"}, {"data": [20000, 15000, 22000, 30000, 10000, 25000, 18000, 35000, 28000], "label": "Auto Loan Account", "borderColor": "#3B82F6", "backgroundColor": "transparent"}]}	2026-01-25 20:25:35.925537
2	{"labels": ["01", "02", "03", "04", "05", "06", "07", "08", "09"], "datasets": [{"data": [12000, 25000, 18000, 10000, 30000, 8000, 28000, 5000, 22000], "label": "Checking Account", "borderColor": "#10B981", "backgroundColor": "transparent"}, {"data": [20000, 15000, 22000, 30000, 10000, 25000, 18000, 35000, 28000], "label": "Auto Loan Account", "borderColor": "#3B82F6", "backgroundColor": "transparent"}]}	2026-01-25 20:25:50.754433
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, email, password, avatar, email_verified, last_login_at, last_login_ip, notifications_enabled, created_at, updated_at) FROM stdin;
isRxzoKgBLTCdeHbAlmJg6JYwgbegXRp	farzanapoly	farzanaakterpoly15031994@gmail.com	\N	\N	f	\N	\N	t	2026-03-14 17:50:02.73	2026-03-14 17:50:02.73
4EsMxvyLGUSMzShsdnqa5UPlFzaibI4c	farzana	farzanap1531994@gmail.com	\N	\N	f	\N	\N	t	2026-03-18 17:33:48.945	2026-03-18 17:33:48.945
\.


--
-- Data for Name: users_custom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_custom (id, name, avatar, email, password, verified, last_login_at, last_login_ip, notifications_enabled, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: usersprofile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usersprofile (id, name, email, avatar, password, amount, verified, is_verified, last_login_at, created_at) FROM stdin;
1	Test User	test@example.com	https://picsum.photos/seed/test/100/100	$2a$10$N9qo8uLOickgxKfFOC9FZuBjzHiUHxR3Wkm2QKm7VJlYbT7wGqKHO	750	f	f	\N	2026-01-23 15:35:45
2	Hope Howe	dare.concepcion@example.com	https://picsum.photos/seed/hope/100/100	$2a$10$N9qo8uLOickgxKfFOC9FZuBjzHiUHxR3Wkm2QKm7VJlYbT7wGqKHO	680	f	f	\N	2025-12-01 00:00:00
3	Nelson Jerde	geovanni.kessler@example.com	https://picsum.photos/seed/nelson/100/100	$2a$10$N9qo8uLOickgxKfFOC9FZuBjzHiUHxR3Wkm2QKm7VJlYbT7wGqKHO	490	f	f	\N	2025-05-18 00:00:00
\.


--
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification (id, identifier, value, type, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 5, true);


--
-- Name: billing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.billing_id_seq', 2, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 1, false);


--
-- Name: financetable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financetable_id_seq', 1, false);


--
-- Name: financial_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financial_stats_id_seq', 1, false);


--
-- Name: form_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.form_submissions_id_seq', 1, false);


--
-- Name: invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoices_id_seq', 3, true);


--
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 1, false);


--
-- Name: overview_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.overview_id_seq', 58, true);


--
-- Name: payment_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_methods_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 1, false);


--
-- Name: profile_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_settings_id_seq', 1, true);


--
-- Name: security_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.security_id_seq', 1, true);


--
-- Name: subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscriptions_id_seq', 1, false);


--
-- Name: support_conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_conversations_id_seq', 24, true);


--
-- Name: support_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_messages_id_seq', 58, true);


--
-- Name: trends_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trends_data_id_seq', 4, true);


--
-- Name: users_custom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_custom_id_seq', 1, false);


--
-- Name: usersprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usersprofile_id_seq', 3, true);


--
-- Name: verification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.verification_id_seq', 1, false);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: billing billing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing
    ADD CONSTRAINT billing_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: financetable financetable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financetable
    ADD CONSTRAINT financetable_pkey PRIMARY KEY (id);


--
-- Name: financial_stats financial_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financial_stats
    ADD CONSTRAINT financial_stats_pkey PRIMARY KEY (id);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_slug_unique UNIQUE (slug);


--
-- Name: overview overview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.overview
    ADD CONSTRAINT overview_pkey PRIMARY KEY (id);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: profile_settings profile_settings_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_settings
    ADD CONSTRAINT profile_settings_email_unique UNIQUE (email);


--
-- Name: profile_settings profile_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_settings
    ADD CONSTRAINT profile_settings_pkey PRIMARY KEY (id);


--
-- Name: security security_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.security
    ADD CONSTRAINT security_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_tran_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_tran_id_unique UNIQUE (tran_id);


--
-- Name: support_conversations support_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_conversations
    ADD CONSTRAINT support_conversations_pkey PRIMARY KEY (id);


--
-- Name: support_messages support_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_messages
    ADD CONSTRAINT support_messages_pkey PRIMARY KEY (id);


--
-- Name: trends_data trends_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trends_data
    ADD CONSTRAINT trends_data_pkey PRIMARY KEY (id);


--
-- Name: user user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: users_custom users_custom_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_custom
    ADD CONSTRAINT users_custom_email_unique UNIQUE (email);


--
-- Name: users_custom users_custom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_custom
    ADD CONSTRAINT users_custom_pkey PRIMARY KEY (id);


--
-- Name: usersprofile usersprofile_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usersprofile
    ADD CONSTRAINT usersprofile_email_unique UNIQUE (email);


--
-- Name: usersprofile usersprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usersprofile
    ADD CONSTRAINT usersprofile_pkey PRIMARY KEY (id);


--
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- Name: conversation_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX conversation_id_idx ON public.support_messages USING btree (conversation_id);


--
-- Name: members_user_org_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX members_user_org_unique ON public.members USING btree (user_id, organization_id);


--
-- Name: provider_account_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX provider_account_unique ON public.account USING btree (provider_id, account_id);


--
-- Name: verification_expires_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX verification_expires_idx ON public.verification USING btree (expires_at);


--
-- Name: verification_identifier_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX verification_identifier_idx ON public.verification USING btree (identifier);


--
-- Name: verification_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX verification_unique ON public.verification USING btree (identifier, value);


--
-- Name: account account_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: members members_organization_id_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_organization_id_organizations_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: members members_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: session session_organization_id_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_organization_id_organizations_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- Name: session session_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: subscriptions subscriptions_organization_id_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_organization_id_organizations_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: support_messages support_messages_conversation_id_support_conversations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_messages
    ADD CONSTRAINT support_messages_conversation_id_support_conversations_id_fk FOREIGN KEY (conversation_id) REFERENCES public.support_conversations(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict BTqYToBMV2O3s1Iju12GaIe9inKNB4TLraQGhdIjLbSkGrnsdZ5hbiovK6hvNqE

