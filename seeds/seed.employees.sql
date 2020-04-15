-- TRUNCATE
--   careers,
--   employees,
--   users
--   RESTART IDENTITY CASCADE;



INSERT INTO employees (id, first_name, last_name, address, city, state, zip_code, phone, career_id, user_id)
VALUES
  (1, 'Alex','Larrabee', '6525 Thelma Ave', 'Fullerton', 'CA', 92801, 714-123-4567, 1, 1),
  (2, 'Glen','Larrabee', '6525 Thelma Ave', 'Fullerton', 'CA', 92801, 714-123-4567, 2 ,2);


INSERT INTO careers (position, salary)
VALUES 
  ('Software Dev', 100000),
  ('Front End Dev', 50000);

INSERT INTO users (username, password)
VALUES
('TestManager1', '$2a$12$0sj6bnOmjzv58YTvWCAvSusxHE7rV2y9MYcO5vIYlw.nzddyxvnv2'),
('TestManager2', '$2a$12$BM0BibjvebAGLvgKpDfVVu6.NpsalYX6MV8FY9V5KzMA7rGxuHv92');
