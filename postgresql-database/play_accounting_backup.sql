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
  WHERE ((incomes.income_category)::text = 'DONATION'::text)
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
-- Name: monthly_expenses_by_category; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_expenses_by_category AS
 SELECT to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text) AS month,
    expenses.expense_category,
    sum(expenses.expense_amount) AS total_expense_amount
   FROM public.expenses
  GROUP BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.expense_category
  ORDER BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.expense_category;


ALTER TABLE public.monthly_expenses_by_category OWNER TO ihsan;

--
-- Name: monthly_expenses_by_expense_name; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_expenses_by_expense_name AS
 SELECT to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text) AS month,
    expenses.expense_name,
    sum(expenses.expense_amount) AS total_expense_amount
   FROM public.expenses
  GROUP BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.expense_name
  ORDER BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.expense_name;


ALTER TABLE public.monthly_expenses_by_expense_name OWNER TO ihsan;

--
-- Name: monthly_expenses_by_payee_information; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_expenses_by_payee_information AS
 SELECT to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text) AS month,
    expenses.payee_information,
    sum(expenses.expense_amount) AS total_expense_amount
   FROM public.expenses
  GROUP BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.payee_information
  ORDER BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.payee_information;


ALTER TABLE public.monthly_expenses_by_payee_information OWNER TO ihsan;

--
-- Name: monthly_expenses_by_payment_method; Type: VIEW; Schema: public; Owner: ihsan
--

CREATE VIEW public.monthly_expenses_by_payment_method AS
 SELECT to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text) AS month,
    expenses.payment_method,
    sum(expenses.expense_amount) AS total_expense_amount
   FROM public.expenses
  GROUP BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.payment_method
  ORDER BY (to_char((expenses.expense_date)::timestamp with time zone, 'YYYY-MM'::text)), expenses.payment_method;


ALTER TABLE public.monthly_expenses_by_payment_method OWNER TO ihsan;

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
            WHEN ((incomes.income_category)::text = 'DONATION'::text) THEN 'DONATION'::character varying
            ELSE incomes.income_source_name
        END AS income_source_name,
    sum(incomes.income_amount) AS total_income_amount
   FROM public.incomes
  GROUP BY (EXTRACT(month FROM incomes.income_date)),
        CASE
            WHEN ((incomes.income_category)::text = 'DONATION'::text) THEN 'DONATION'::character varying
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
22	MUSAB	AVCI	DSF	SDF	222	AVCI@AVCI	2	2	333	2023-06-27
13	JAMES	ANDERSON	789 SPRUCE ST	12345	555-2345	JAMES.ANDERSON@EXAMPLE.COM	1	1	700	2023-05-24
14	AVA	THOMAS	234 ASH ST	67890	555-6789	AVA.THOMAS@EXAMPLE.COM	2	2	800	2023-05-17
7	DAVID	JOHNSON	789 OAK STT	34567	555-9012	DAVID.JOHNSON@EXAMPLE.COM	2	1	150	2023-05-24
9	MICHAEL	TAYLOR	567 CEDAR ST	12345	555-6789	MICHAEL.TAYLOR@EXAMPLE.COM	1	1	300	2023-05-21
12	SOPHIA	WILSON	456 BIRCH ST	89012	555-8901	SOPHIA.WILSON@EXAMPLE.COM	4	2	600	2023-05-24
15	WILLIAM	HARRIS	567 OAK ST	34567	555-0123	WILLIAM.HARRIS@EXAMPLE.COM	3	1	900	2023-05-27
16	MIA	CLARK	890 ELM ST	89012	555-3456	MIA.CLARK@EXAMPLE.COM	4	2	1000	2023-05-28
6	IHSAN	DEMIR	144C WOODRIDGE CRESCENT	K2B7S9	4386223603	IHSANDEMIR.Y@GMAIL.COM	1	1	2000	2023-05-20
10	OLIVIA	DAVIS	890 MAPLE ST	67890	555-0123	OLIVIA.DAVIS@EXAMPLE.COM	2	2	400	2023-05-04
11	DANIEL	MILLER	123 WALNUT ST	34567	555-4567	DANIEL.MILLER@EXAMPLE.COM	3	1	500	2023-05-05
8	EMILY	BROWN	234 PINE ST	89012	555-3456	EMILY.BROWN@EXAMPLE.COM	4	2	250	2023-05-04
5	JOHN	DOE	123 MAIN STREET	12345	1234567890	JOHNDOE@EXAMPLE.COM	2	3	200	2023-05-13
18	OSMAN	KURUNC	ADRESS SDF	K1K1K1	4444444444	OKURU@GGMAIL.COM	1	2	700	2023-05-26
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: ihsan
--

COPY public.expenses (id, expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description) FROM stdin;
3	TRAVEL EXPENSES	CASH	BUSINESS TRAVEL	JOHN DOE	200.00	2023-05-03	Business trip expenses
4	RENT PAYMENT	BANK	RENT	XYZ REAL ESTATE	1000.00	2023-05-04	Monthly rent payment
6	MAINTENANCE SERVICE	CASH	MAINTENANCE	XYZ MAINTENANCE COMPANY	150.00	2023-05-06	Equipment maintenance service
7	SOFTWARE SUBSCRIPTION	BANK	TECHNOLOGY	ABC SOFTWARE COMPANY	50.00	2023-05-07	Monthly software subscription
8	PROFESSIONAL FEES	CASH	CONSULTING	JOHN SMITH CONSULTING	300.00	2023-05-08	Consulting services rendered
9	REPAIR COSTS	BANK	MAINTENANCE	XYZ REPAIR SHOP	120.00	2023-05-09	Repair costs for equipment
10	TRAINING EXPENSES	CASH	TRAINING	ABC TRAINING CENTER	250.00	2023-05-10	Training program fees
2	INTERNET BILL	BANK	UTILITIES	XYZ INTERNET PROVIDER	99	2023-05-27	Monthly internet bill
11	CLEANING	CASH	SERVICES	PERSON	120	2023-05-05	This payment for two weeks cleaning.
12	KM	BANK	ASSESTS	MORTGAGE	400	2023-06-15	paid
\.


--
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: ihsan
--

COPY public.incomes (id, income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description) FROM stdin;
20	OTHER	BANK	300	2023-07-21	MORNING SCHOOL	\N	student fee
21	DONATION	CASH	500	2023-06-08		12	
22	GOVERNMENTAL	BANK	300	2023-06-22	NEW NEW	\N	new new
1	GOVERNMENTAL	BANK	500	2023-05-29	TAX REFUND	\N	Governmental income
2	DONATION	CASH	1000	2023-05-30	JOHN DOE	5	Donation income
4	GOVERNMENTAL	CASH	300	2023-06-01	GRANT FUNDING	\N	Governmental income
5	DONATION	BANK	1500	2023-06-02	MICHAEL TAYLOR	9	Donation income
6	OTHER	CASH	800	2023-06-03	ROYALTIES	\N	Other income
7	GOVERNMENTAL	BANK	400	2023-06-04	SALES TAX REFUND	\N	Governmental income
8	DONATION	CASH	200	2023-06-05	IHSAN DEMIR	6	Donation income
9	OTHER	BANK	900	2023-06-06	RENTAL INCOME	\N	Other income
10	GOVERNMENTAL	CASH	600	2023-06-07	FEDERAL GRANT	\N	Governmental income
3	OTHER	BANK	700	2023-05-19	CONSULTING SERVICES	\N	Other income
14	GOVERNMENTAL	BANK	900	2023-05-19	CRA	\N	Wage subsidies
\.


--
-- Name: donors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ihsan
--

SELECT pg_catalog.setval('public.donors_id_seq', 22, true);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ihsan
--

SELECT pg_catalog.setval('public.expenses_id_seq', 12, true);


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

