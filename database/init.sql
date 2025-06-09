-- Table to store community events
CREATE TABLE IF NOT EXISTS community_events (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	start_time TIMESTAMP NOT NULL,
	end_time TIMESTAMP NOT NULL,
	location VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- We want event participants to RSVP without needing an account
-- Participant information will be stored in their ticket
-- Design ticket to integrate with Google Wallet API
-- Table to store event tickets
CREATE TABLE IF NOT EXISTS event_tickets (
	id SERIAL PRIMARY KEY,
	event_id INTEGER NOT NULL REFERENCES community_events(id) ON DELETE CASCADE,
	participant_name VARCHAR(255) NOT NULL,
	participant_email VARCHAR(255) NOT NULL,
	ticket_code VARCHAR(50) UNIQUE NOT NULL,
	issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	status VARCHAR(50) DEFAULT 'active' -- e.g., active, cancelled, checked-in
);
