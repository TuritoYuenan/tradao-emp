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

	-- Participant student ID (optional)
	student_id CHARACTER VARYING(32) NULL,

	-- Participant as Freshman, Sophomore, Junior, or Senior
	academic_year CHARACTER VARYING(16) NOT NULL REFERENCES academic_status(id),

	-- Participant from Computer Science, Business, or Media & Communication
	field_of_study CHARACTER VARYING(16) NOT NULL REFERENCES fields_of_study(id),

	-- Participant major
	major CHARACTER VARYING(255) NOT NULL,

	-- Confirmation to participate in the event
	participate BOOLEAN NOT NULL DEFAULT FALSE,

	-- Date metadata
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT event_tickets_pkey PRIMARY KEY (id)
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

ALTER TABLE event_tickets ENABLE ROW LEVEL SECURITY;
