TRUNCATE
employees,
  careers,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, password)
VALUES
('Alex', '$2a$10$6TtxWqqL45m2t7Jod560huG3CzI07RlxnljWl0s2EVHYH30QW9QtO');


INSERT INTO careers (position, salary)
VALUES 
  ('Software Dev', 100000),
  ('Front End Dev', 50000),
  ('Back End Dev', 150000);


INSERT INTO employees (id, first_name, last_name, address, city, state, zip_code, phone, career_id, user_id)
VALUES
  (1, 'Alex','Larrabee', '6525 Thelma Ave', 'Fullerton', 'CA', 92801, 714-123-4567, 1, 1),
  (2, 'Glen','Larrabee', '6525 Thelma Ave', 'Fullerton', 'CA', 92801, 714-123-4567, 2, 1);




