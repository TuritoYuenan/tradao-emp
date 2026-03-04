-- Table to store event organisers. Each organiser is a club or organization within Swinburne University HCMC.
CREATE TABLE IF NOT EXISTS event_organisers (
	-- Organiser ID
	id UUID NOT NULL DEFAULT gen_random_uuid(),

	-- Organiser name
	name CHARACTER VARYING(255) NOT NULL,

	-- Organiser description
	description text NULL,

	-- Organiser contact email
	contact_email CHARACTER VARYING(255) NOT NULL,

	-- Date metadata
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT event_organisers_pkey PRIMARY KEY (id)
);

-- Add table and column descriptions for event_organisers
COMMENT ON TABLE event_organisers IS 'Stores information about event organisers such as clubs or organizations within Swinburne University HCMC.';

COMMENT ON COLUMN event_organisers.id IS 'Unique identifier for the event organiser.';
COMMENT ON COLUMN event_organisers.name IS 'Name of the event organiser.';
COMMENT ON COLUMN event_organisers.description IS 'Detailed description of the event organiser.';
COMMENT ON COLUMN event_organisers.contact_email IS 'Contact email of the event organiser.';
COMMENT ON COLUMN event_organisers.created_at IS 'Timestamp when the event organiser record was created.';
COMMENT ON COLUMN event_organisers.updated_at IS 'Timestamp when the event organiser record was last updated.';

ALTER TABLE event_organisers ENABLE ROW LEVEL SECURITY;
