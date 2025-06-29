-- Add extentions
CREATE EXTENSION IF NOT EXISTS pgmq;
CREATE EXTENSION IF NOT EXISTS pgtap;
CREATE EXTENSION IF NOT EXISTS index_advisor;

DO $$
BEGIN
	-- Academic Year enum
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'academic_year') THEN
		CREATE TYPE academic_year AS ENUM ('Freshman', 'Sophomore', 'Junior', 'Senior');
	END IF;

	-- Field of Study enum
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'field_of_study') THEN
		CREATE TYPE field_of_study AS ENUM ('business', 'comp-sci', 'mediacom');
	END IF;
END$$;

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

	-- Event host, e.g., a person or organization
	host TEXT NOT NULL DEFAULT ''::text,

	-- URL to event thumbnail or image
	image TEXT NOT NULL DEFAULT 'https://placehold.co/160x90'::text,

	-- Date metadata
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT community_events_pkey PRIMARY KEY (id),
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
COMMENT ON COLUMN community_events.host IS 'Host of the event (person or organization).';
COMMENT ON COLUMN community_events.image IS 'URL to the event thumbnail or image.';
COMMENT ON COLUMN community_events.created_at IS 'Timestamp when the event record was created.';
COMMENT ON COLUMN community_events.updated_at IS 'Timestamp when the event record was last updated.';

-- Table to store event tickets
CREATE TABLE IF NOT EXISTS event_tickets (
	-- Ticket ID and QR code / Google Wallet Pass Object ID
	id UUID NOT NULL DEFAULT gen_random_uuid(),

	-- Event of the ticket
	event_id UUID NOT NULL REFERENCES community_events(id) ON DELETE CASCADE,

	-- Participant name
	name CHARACTER VARYING(255) NOT NULL,

	-- Participant contact email
	email CHARACTER VARYING(255) NOT NULL,

	-- Participant as Freshman, Sophomore, Junior, or Senior
	academic_year academic_year NOT NULL,

	-- Participant from Computer Science, Business, or Media & Communication
	field_of_study field_of_study NOT NULL,

	-- Participant major
	major CHARACTER VARYING(255) NOT NULL,

	-- Confirmation to participate in the event
	participate BOOLEAN NOT NULL DEFAULT FALSE,

	-- Date metadata
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT event_tickets_pkey PRIMARY KEY (id),
);

-- Add table and column descriptions for event_tickets
COMMENT ON TABLE event_tickets IS 'Stores tickets for community events, including participant details and event information.';

COMMENT ON COLUMN event_tickets.id IS 'Unique identifier for the ticket.';
COMMENT ON COLUMN event_tickets.event_id IS 'ID of the event for which the ticket is issued.';
COMMENT ON COLUMN event_tickets.name IS 'Name of the participant holding the ticket.';
COMMENT ON COLUMN event_tickets.email IS 'Contact email of the participant holding the ticket.';
COMMENT ON COLUMN event_tickets.academic_year IS 'Academic year of the participant (Freshman, Sophomore, Junior, Senior).';
COMMENT ON COLUMN event_tickets.field_of_study IS 'Field of study of the participant (e.g., Business, Computer Science, Media & Communication).';
COMMENT ON COLUMN event_tickets.major IS 'Major of the participant.';
COMMENT ON COLUMN event_tickets.participate IS 'Indicates whether the participant confirms their participation in the event.';
COMMENT ON COLUMN event_tickets.created_at IS 'Timestamp when the ticket record was created.';
COMMENT ON COLUMN event_tickets.updated_at IS 'Timestamp when the ticket record was last updated.';

-- Enable row-level security
ALTER TABLE community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tickets ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION create_event_ticket(
	p_event_id UUID,
	p_name CHARACTER VARYING(255),
	p_email CHARACTER VARYING(255),
	p_academic_year academic_year,
	p_field_of_study field_of_study,
	p_major CHARACTER VARYING(255),
	p_participate BOOLEAN DEFAULT FALSE
) RETURNS UUID LANGUAGE plpgsql SECURITY INVOKER
SET search_path TO public, pg_catalog AS $$
DECLARE
	new_ticket_id UUID;
BEGIN
	-- Insert a new ticket into the event_tickets table
	INSERT INTO event_tickets (
		event_id,
		name,
		email,
		academic_year,
		field_of_study,
		major,
		participate
	) VALUES (
		p_event_id,
		p_name,
		p_email,
		p_academic_year,
		p_field_of_study,
		p_major,
		p_participate
	) RETURNING id INTO new_ticket_id;

	-- Return the newly created ticket ID
	RETURN new_ticket_id;
END;
$$;

CREATE VIEW tickets_with_event_details WITH (security_invoker = ON) AS
SELECT
	t.id AS ticket_id,
	t.created_at,
	t.name,
	t.email,
	t.academic_year,
	t.field_of_study,
	t.major,
	t.participate,
	t.event_id,
	e.title AS event_title,
	e.description AS event_description,
	e.category AS event_category,
	e.start_time AS event_start_time,
	e.end_time AS event_end_time,
	e.location AS event_location,
	e.host AS event_host,
	e.image AS event_image
FROM event_tickets t
JOIN community_events e ON t.event_id = e.id;

COMMENT ON VIEW tickets_with_event_details IS 'View that combines event ticket details with corresponding event information.';

CREATE VIEW upcoming_events WITH (security_invoker = ON) AS
SELECT *
FROM community_events
WHERE start_time > (CURRENT_DATE + INTERVAL '2 days');

COMMENT ON VIEW upcoming_events IS 'View that lists community events starting in the next 2 days.';
