-- Lookup table for event participant's academic status
CREATE TABLE IF NOT EXISTS academic_status (
	-- Machine-readable ID (aka "slug")
	id CHARACTER VARYING(16) NOT NULL PRIMARY KEY,

	-- Academic year
	label CHARACTER VARYING(16) NOT NULL,

	-- Year description
	description TEXT NULL
);

ALTER TABLE academic_status ENABLE ROW LEVEL SECURITY;
