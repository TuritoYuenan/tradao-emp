-- Function to create a new event ticket
CREATE OR REPLACE FUNCTION create_event_ticket(
	p_event_id UUID,
	p_name CHARACTER VARYING(255),
	p_email CHARACTER VARYING(255),
	p_student_id CHARACTER VARYING(32),
	p_academic_year CHARACTER VARYING(16),
	p_field_of_study CHARACTER VARYING(16),
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
		student_id,
		academic_year,
		field_of_study,
		major,
		participate
	) VALUES (
		p_event_id,
		p_name,
		p_email,
		p_student_id,
		p_academic_year,
		p_field_of_study,
		p_major,
		p_participate
	) RETURNING id INTO new_ticket_id;

	-- Return the newly created ticket ID
	RETURN new_ticket_id;
END;
$$;
