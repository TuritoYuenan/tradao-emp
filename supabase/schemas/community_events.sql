-- Table to store community events
CREATE TABLE IF NOT EXISTS community_events (
	-- Event ID
	id UUID NOT NULL DEFAULT gen_random_uuid(),

	-- Event title
	title CHARACTER VARYING(255) NOT NULL,

	-- Event description
	description text NULL,

	-- Event type, e.g., Workshop, Seminar, Meetup
	category CHARACTER VARYING(255) NOT NULL DEFAULT 'General'::text,

	-- Start and end time of the event
	start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	end_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,

	-- Event location, e.g., Online, Room 101, etc.
	location CHARACTER VARYING(255) NULL,

	-- Event organiser reference
	organiser_id UUID NOT NULL REFERENCES event_organisers(id) ON DELETE CASCADE,

	-- URL to event thumbnail or image
	image TEXT NOT NULL DEFAULT 'https://placehold.co/160x90'::text,

	-- Date metadata
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT community_events_pkey PRIMARY KEY (id)
);

-- Add table and column descriptions for community_events
COMMENT ON TABLE community_events IS 'Stores information about community events such as workshops, seminars, or meetups.';

COMMENT ON COLUMN community_events.id IS 'Unique identifier for the event.';
COMMENT ON COLUMN community_events.title IS 'Title of the event.';
COMMENT ON COLUMN community_events.description IS 'Detailed description of the event.';
COMMENT ON COLUMN community_events.category IS 'Category or type of the event (e.g., Workshop, Seminar, Meetup).';
COMMENT ON COLUMN community_events.start_time IS 'Start time of the event.';
COMMENT ON COLUMN community_events.end_time IS 'End time of the event.';
COMMENT ON COLUMN community_events.location IS 'Location where the event takes place (e.g., Online, Room 101).';
COMMENT ON COLUMN community_events.organiser_id IS 'ID of the organiser responsible for the event.';
COMMENT ON COLUMN community_events.image IS 'URL to the event thumbnail or image.';
COMMENT ON COLUMN community_events.created_at IS 'Timestamp when the event record was created.';
COMMENT ON COLUMN community_events.updated_at IS 'Timestamp when the event record was last updated.';

ALTER TABLE community_events ENABLE ROW LEVEL SECURITY;
