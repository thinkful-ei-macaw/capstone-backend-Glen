

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS careers (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  position TEXT NOT NULL,
  salary VARCHAR (255) NOT NULL,
  modified TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  modified TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);







