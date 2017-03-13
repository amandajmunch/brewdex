DROP TABLE IF EXISTS beers CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE beers(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  abv VARCHAR(255) NOT NULL,
  labels_medium VARCHAR(255) NOT NULL,
  style_name VARCHAR(255) NOT NULL,
  breweries_name VARCHAR(255) NOT NULL,
  beer_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL
);


INSERT INTO users(name,password) VALUES
('Amanda', 'password');

INSERT INTO beers(name,abv,labels_medium,style_name,breweries_name,beer_id) VALUES
('Flower Power', 7.5, 'https://s3.amazonaws.com/brewerydbapi/beer/RVOBIF/upload_vaoAoN-medium.png', 'North American Origin Ales', 'Ithaca Beer Company',1),
('Golden Monkey', 9.5, 'https://s3.amazonaws.com/brewerydbapi/beer/UfxKKB/upload_yBzsdy-medium.png', 'Belgian And French Origin Ales', 'Victory Brewing Company',1);
