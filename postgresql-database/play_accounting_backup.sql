--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

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
-- Name: donors; Type: TABLE; Schema: public; Owner: ihsan
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


ALTER TABLE public.donors OWNER TO ihsan;

--
-- Name: donors_id_seq; Type: SEQUENCE; Schema: public; Owner: ihsan
--

CREATE SEQUENCE public.donors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.donors_id_seq OWNER TO ihsan;

--
-- Name: donors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ihsan
--

ALTER SEQUENCE public.donors_id_seq OWNED BY public.donors.id;


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: ihsan
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


ALTER TABLE public.expenses OWNER TO ihsan;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: ihsan
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expenses_id_seq OWNER TO ihsan;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ihsan
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- Name: incomes; Type: TABLE; Schema: public; Owner: ihsan
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


ALTER TABLE public.incomes OWNER TO ihsan;

--
-- Name: incomes_id_seq; Type: SEQUENCE; Schema: public; Owner: ihsan
--

CREATE SEQUENCE public.incomes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.incomes_id_seq OWNER TO ihsan;

--
-- Name: incomes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ihsan
--

ALTER SEQUENCE public.incomes_id_seq OWNED BY public.incomes.id;


--
-- Name: monthly_donations; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_donations AS
 SELECT date_trunc('month'::text, (incomes.income_date)::timestamp with time zone) AS month,
    sum(incomes.income_amount) AS total_donations
   FROM public.incomes
  WHERE ((incomes.income_category)::text = 'Donation'::text)
  GROUP BY (date_trunc('month'::text, (incomes.income_date)::timestamp with time zone))
  ORDER BY (date_trunc('month'::text, (incomes.income_date)::timestamp with time zone));


ALTER TABLE public.monthly_donations OWNER TO ihsan;

--
-- Name: monthly_expense; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_expense AS
 SELECT date_trunc('month'::text, (expenses.expense_date)::timestamp with time zone) AS month,
    sum(expenses.expense_amount) AS total_expense
   FROM public.expenses
  GROUP BY (date_trunc('month'::text, (expenses.expense_date)::timestamp with time zone))
  ORDER BY (date_trunc('month'::text, (expenses.expense_date)::timestamp with time zone));


ALTER TABLE public.monthly_expense OWNER TO ihsan;

--
-- Name: monthly_income; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_income AS
 SELECT date_trunc('month'::text, (incomes.income_date)::timestamp with time zone) AS month,
    sum(incomes.income_amount) AS total_income
   FROM public.incomes
  GROUP BY (date_trunc('month'::text, (incomes.income_date)::timestamp with time zone));


ALTER TABLE public.monthly_income OWNER TO ihsan;

--
-- Name: monthly_incomes_by_category; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_incomes_by_category AS
 SELECT EXTRACT(month FROM incomes.income_date) AS month,
    incomes.income_category,
    sum(incomes.income_amount) AS total_income_amount
   FROM public.incomes
  GROUP BY (EXTRACT(month FROM incomes.income_date)), incomes.income_category;


ALTER TABLE public.monthly_incomes_by_category OWNER TO ihsan;

--
-- Name: monthly_incomes_by_income_source; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_incomes_by_income_source AS
 SELECT EXTRACT(month FROM incomes.income_date) AS month,
        CASE
            WHEN ((incomes.income_category)::text = 'Donation'::text) THEN 'Donation'::character varying
            ELSE incomes.income_source_name
        END AS income_source_name,
    sum(incomes.income_amount) AS total_income_amount
   FROM public.incomes
  GROUP BY (EXTRACT(month FROM incomes.income_date)),
        CASE
            WHEN ((incomes.income_category)::text = 'Donation'::text) THEN 'Donation'::character varying
            ELSE incomes.income_source_name
        END;


ALTER TABLE public.monthly_incomes_by_income_source OWNER TO ihsan;

--
-- Name: monthly_incomes_by_payment_method; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_incomes_by_payment_method AS
 SELECT EXTRACT(month FROM incomes.income_date) AS month,
    incomes.payment_method,
    sum(incomes.income_amount) AS total_income_amount
   FROM public.incomes
  GROUP BY (EXTRACT(month FROM incomes.income_date)), incomes.payment_method;


ALTER TABLE public.monthly_incomes_by_payment_method OWNER TO ihsan;

--
-- Name: donors id; Type: DEFAULT; Schema: public; Owner: ihsan
--

ALTER TABLE ONLY public.donors ALTER COLUMN id SET DEFAULT nextval('public.donors_id_seq'::regclass);


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: ihsan
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- Name: incomes id; Type: DEFAULT; Schema: public; Owner: ihsan
--

ALTER TABLE ONLY public.incomes ALTER COLUMN id SET DEFAULT nextval('public.incomes_id_seq'::regclass);


--
-- Data for Name: donors; Type: TABLE DATA; Schema: public; Owner: ihsan
--

COPY public.donors (id, first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date) FROM stdin;
9	Michael	Taylor	567 Cedar St	12345	555-6789	michael.taylor@example.com	1	1	300	2023-05-21
12	Sophia	Wilson	456 Birch St	89012	555-8901	sophia.wilson@example.com	4	2	600	2023-05-24
13	James	Anderson	789 Spruce St	12345	555-2345	james.anderson@example.com	1	1	700	2023-05-25
15	William	Harris	567 Oak St	34567	555-0123	william.harris@example.com	3	1	900	2023-05-27
16	Mia	Clark	890 Elm St	89012	555-3456	mia.clark@example.com	4	2	1000	2023-05-28
6	Ihsan	Demir	144C Woodridge Crescent	K2B7S9	4386223603	ihsandemir.y@gmail.com	1	1	2000	2023-05-20
10	Olivia	Davis	890 Maple St	67890	555-0123	olivia.davis@example.com	2	2	400	2023-05-04
11	Daniel	Miller	123 Walnut St	34567	555-4567	daniel.miller@example.com	3	1	500	2023-05-05
8	Emily	Brown	234 Pine St	89012	555-3456	emily.brown@example.com	4	2	250	2023-05-04
5	John	Doe	123 Main Street	12345	1234567890	johndoe@example.com	2	3	200	2023-05-13
18	Osman	Kurunc	adress sdf	k1k1k1	4444444444	okuru@ggmail.com	1	2	700	2023-05-26
14	Ava	Thomas	234 Ash St	67890	555-6789	ava.thomas@example.com	2	2	800	2023-05-17
7	David	Johnson	789 Oak Stt	34567	555-9012	david.johnson@example.com	2	1	150	2023-05-24
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: ihsan
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
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: ihsan
--

COPY public.incomes (id, income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description) FROM stdin;
14	Governmental	Bank	900	2023-05-19	CRA	\N	Wage subsidies
20	Other	Bank	300	2023-07-21	Morning School	\N	student fee
21	Donation	Cash	500	2023-06-08		12	
22	Governmental	Bank	300	2023-06-22	New new	\N	new new
1	Governmental	Bank	500	2023-05-29	Tax Refund	\N	Governmental income
2	Donation	Cash	1000	2023-05-30	John Doe	5	Donation income
4	Governmental	Cash	300	2023-06-01	Grant Funding	\N	Governmental income
5	Donation	Bank	1500	2023-06-02	Michael Taylor	9	Donation income
6	Other	Cash	800	2023-06-03	Royalties	\N	Other income
7	Governmental	Bank	400	2023-06-04	Sales Tax Refund	\N	Governmental income
8	Donation	Cash	200	2023-06-05	Ihsan Demir	6	Donation income
9	Other	Bank	900	2023-06-06	Rental Income	\N	Other income
10	Governmental	Cash	600	2023-06-07	Federal Grant	\N	Governmental income
3	Other	Bank	700	2023-05-19	Consulting Services	\N	Other income
\.


--
-- Name: donors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ihsan
--

SELECT pg_catalog.setval('public.donors_id_seq', 18, true);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ihsan
--

SELECT pg_catalog.setval('public.expenses_id_seq', 11, true);


--
-- Name: incomes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ihsan
--

SELECT pg_catalog.setval('public.incomes_id_seq', 22, true);


--
-- Name: donors donors_pkey; Type: CONSTRAINT; Schema: public; Owner: ihsan
--

ALTER TABLE ONLY public.donors
    ADD CONSTRAINT donors_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: ihsan
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: incomes incomes_pkey; Type: CONSTRAINT; Schema: public; Owner: ihsan
--

ALTER TABLE ONLY public.incomes
    ADD CONSTRAINT incomes_pkey PRIMARY KEY (id);


--
-- Name: incomes fk_donor_id; Type: FK CONSTRAINT; Schema: public; Owner: ihsan
--

ALTER TABLE ONLY public.incomes
    ADD CONSTRAINT fk_donor_id FOREIGN KEY (donor_id) REFERENCES public.donors(id);


--
-- PostgreSQL database dump complete
--

