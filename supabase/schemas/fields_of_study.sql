-- Lookup table for fields of study
CREATE TABLE IF NOT EXISTS fields_of_study (
	-- Machine-readable ID (aka "slug")
	id CHARACTER VARYING(16) NOT NULL PRIMARY KEY,

	-- Field of study
	label CHARACTER VARYING(64) NOT NULL,

	-- Year description
	description TEXT NULL
);

ALTER TABLE fields_of_study ENABLE ROW LEVEL SECURITY;
