--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-05-25 16:15:49 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3361 (class 1262 OID 16399)
-- Name: play-accounting; Type: DATABASE; Schema: -; Owner: -
-- Data Pos: 0
--

DROP DATABASE IF EXISTS "play-accounting";
CREATE DATABASE "play-accounting" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc;


\connect -reuse-previous=on "dbname='play-accounting'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16401)
-- Name: donors; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public.donors (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    address character varying(255),
    postcode character varying(255),
    phone character varying(255),
    email character varying(255),
    donor_area integer,
    donor_group integer,
    promised_amount numeric,
    promised_date date
);


--
-- TOC entry 214 (class 1259 OID 16400)
-- Dependencies: 215
-- Name: donors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public.donors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 214
-- Name: donors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public.donors_id_seq OWNED BY public.donors.id;


--
-- TOC entry 219 (class 1259 OID 16424)
-- Name: expenses; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    expense_name character varying(255),
    payment_method character varying(255),
    expense_category character varying(255),
    payee_information character varying(255),
    expense_amount numeric,
    expense_date date,
    expense_description text
);


--
-- TOC entry 218 (class 1259 OID 16423)
-- Dependencies: 219
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 218
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- TOC entry 217 (class 1259 OID 16410)
-- Name: incomes; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public.incomes (
    id integer NOT NULL,
    income_category character varying(255),
    payment_method character varying(255),
    income_amount numeric,
    income_date date,
    income_source_name character varying(255),
    donor_id integer,
    description text
);


--
-- TOC entry 216 (class 1259 OID 16409)
-- Dependencies: 217
-- Name: incomes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public.incomes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 216
-- Name: incomes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public.incomes_id_seq OWNED BY public.incomes.id;


--
-- TOC entry 222 (class 1259 OID 16445)
-- Dependencies: 217 217 217
-- Name: monthly_donations; Type: VIEW; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE VIEW public.monthly_donations AS
 SELECT date_trunc('month'::text, (incomes.income_date)::timestamp with time zone) AS month,
    sum(incomes.income_amount) AS total_donations
   FROM public.incomes
  WHERE ((incomes.income_category)::text = 'donation'::text)
  GROUP BY (date_trunc('month'::text, (incomes.income_date)::timestamp with time zone))
  ORDER BY (date_trunc('month'::text, (incomes.income_date)::timestamp with time zone));


--
-- TOC entry 221 (class 1259 OID 16441)
-- Dependencies: 219 219
-- Name: monthly_expense; Type: VIEW; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE VIEW public.monthly_expense AS
 SELECT date_trunc('month'::text, (expenses.expense_date)::timestamp with time zone) AS month,
    sum(expenses.expense_amount) AS total_expense
   FROM public.expenses
  GROUP BY (date_trunc('month'::text, (expenses.expense_date)::timestamp with time zone))
  ORDER BY (date_trunc('month'::text, (expenses.expense_date)::timestamp with time zone));


--
-- TOC entry 220 (class 1259 OID 16432)
-- Dependencies: 217 217
-- Name: monthly_income; Type: VIEW; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE VIEW public.monthly_income AS
 SELECT date_trunc('month'::text, (incomes.income_date)::timestamp with time zone) AS month,
    sum(incomes.income_amount) AS total_income
   FROM public.incomes
  GROUP BY (date_trunc('month'::text, (incomes.income_date)::timestamp with time zone));


--
-- TOC entry 3195 (class 2604 OID 16404)
-- Dependencies: 215 214 215
-- Name: donors id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public.donors ALTER COLUMN id SET DEFAULT nextval('public.donors_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 16427)
-- Dependencies: 219 218 219
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 16413)
-- Dependencies: 216 217 217
-- Name: incomes id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public.incomes ALTER COLUMN id SET DEFAULT nextval('public.incomes_id_seq'::regclass);


--
-- TOC entry 3351 (class 0 OID 16401)
-- Dependencies: 215
-- Data for Name: donors; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 9283
--

COPY public.donors (id, first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date) FROM stdin;
7	David	Johnson	789 Oak St	34567	555-9012	david.johnson@example.com	3	1	150	2023-05-19
9	Michael	Taylor	567 Cedar St	12345	555-6789	michael.taylor@example.com	1	1	300	2023-05-21
12	Sophia	Wilson	456 Birch St	89012	555-8901	sophia.wilson@example.com	4	2	600	2023-05-24
13	James	Anderson	789 Spruce St	12345	555-2345	james.anderson@example.com	1	1	700	2023-05-25
14	Ava	Thomas	234 Ash St	67890	555-6789	ava.thomas@example.com	2	2	800	2023-05-26
15	William	Harris	567 Oak St	34567	555-0123	william.harris@example.com	3	1	900	2023-05-27
16	Mia	Clark	890 Elm St	89012	555-3456	mia.clark@example.com	4	2	1000	2023-05-28
6	Ihsan	Demir	144C Woodridge Crescent	K2B7S9	4386223603	ihsandemir.y@gmail.com	1	1	2000	2023-05-20
10	Olivia	Davis	890 Maple St	67890	555-0123	olivia.davis@example.com	2	2	400	2023-05-04
11	Daniel	Miller	123 Walnut St	34567	555-4567	daniel.miller@example.com	3	1	500	2023-05-05
8	Emily	Brown	234 Pine St	89012	555-3456	emily.brown@example.com	4	2	250	2023-05-04
5	John	Doe	123 Main Street	12345	1234567890	johndoe@example.com	2	3	200	2023-05-13
18	Osman	Kurunc	adress sdf	k1k1k1	4444444444	okuru@ggmail.com	1	2	700	2023-05-26
\.


--
-- TOC entry 3355 (class 0 OID 16424)
-- Dependencies: 219
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 9835
--

COPY public.expenses (id, expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description) FROM stdin;
3	Travel Expenses	Cash	Business Travel	John Doe	200.00	2023-05-03	Business trip expenses
4	Rent Payment	Bank	Rent	XYZ Real Estate	1000.00	2023-05-04	Monthly rent payment
6	Maintenance Service	Cash	Maintenance	XYZ Maintenance Company	150.00	2023-05-06	Equipment maintenance service
7	Software Subscription	Bank	Technology	ABC Software Company	50.00	2023-05-07	Monthly software subscription
8	Professional Fees	Cash	Consulting	John Smith Consulting	300.00	2023-05-08	Consulting services rendered
9	Repair Costs	Bank	Maintenance	XYZ Repair Shop	120.00	2023-05-09	Repair costs for equipment
10	Training Expenses	Cash	Training	ABC Training Center	250.00	2023-05-10	Training program fees
2	Internet Bill	Bank	Utilities	XYZ Internet Provider	99	2023-05-27	Monthly internet bill
11	Cleaning	Cash	Services	Person	120	2023-05-05	This payment for two weeks cleaning.
\.


--
-- TOC entry 3353 (class 0 OID 16410)
-- Dependencies: 217
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 10273
--

COPY public.incomes (id, income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description) FROM stdin;
1	governmental	bank	500	2023-05-29	Tax Refund	\N	Governmental income
2	donation	cash	1000	2023-05-30	John Doe	5	Donation income
4	governmental	cash	300	2023-06-01	Grant Funding	\N	Governmental income
5	donation	bank	1500	2023-06-02	Michael Taylor	9	Donation income
6	other	cash	800	2023-06-03	Royalties	\N	Other income
7	governmental	bank	400	2023-06-04	Sales Tax Refund	\N	Governmental income
8	donation	cash	200	2023-06-05	Ihsan Demir	6	Donation income
9	other	bank	900	2023-06-06	Rental Income	\N	Other income
10	governmental	cash	600	2023-06-07	Federal Grant	\N	Governmental income
3	other	bank	700	2023-05-19	Consulting Services	\N	Other income
14	Governmental	Bank	900	2023-05-19	CRA	\N	Wage subsidies
20	Other	Bank	300	2023-07-21	Morning School	\N	student fee
\.


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 214
-- Name: donors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public.donors_id_seq', 18, true);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 218
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public.expenses_id_seq', 11, true);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 216
-- Name: incomes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public.incomes_id_seq', 20, true);


--
-- TOC entry 3199 (class 2606 OID 16408)
-- Dependencies: 215
-- Name: donors donors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public.donors
    ADD CONSTRAINT donors_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 16431)
-- Dependencies: 219
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 16417)
-- Dependencies: 217
-- Name: incomes incomes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public.incomes
    ADD CONSTRAINT incomes_pkey PRIMARY KEY (id);


--
-- TOC entry 3204 (class 2606 OID 16418)
-- Dependencies: 215 3199 217
-- Name: incomes fk_donor_id; Type: FK CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public.incomes
    ADD CONSTRAINT fk_donor_id FOREIGN KEY (donor_id) REFERENCES public.donors(id);


-- Completed on 2023-06-05 13:01:17 UTC

--
-- PostgreSQL database dump complete
--

