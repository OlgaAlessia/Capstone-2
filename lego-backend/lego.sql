
\echo 'Delete and recreate lego db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lego;
CREATE DATABASE lego;
\connect lego

\i lego-schema.sql
\i lego-seed.sql

\echo 'Delete and recreate lego_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lego_test;
CREATE DATABASE lego_test;
\connect lego_test

\i lego-schema.sql
\i lego-seed.sql