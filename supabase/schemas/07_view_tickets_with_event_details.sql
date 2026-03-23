-- Views for easier data retrieval
CREATE VIEW tickets_with_event_details WITH (security_invoker = ON) AS
SELECT
	t.id AS ticket_id,
	t.created_at,
	t.name,
	t.email,
	t.student_id,
	acy.label AS academic_year,
	fos.label AS field_of_study,
	t.major,
	t.participate,
	t.event_id,
	e.title AS event_title,
	e.description AS event_description,
	e.category AS event_category,
	e.start_time AS event_start_time,
	e.end_time AS event_end_time,
	e.location AS event_location,
	o.name AS organiser_name,
	e.image AS event_image
FROM event_tickets t
JOIN community_events e ON t.event_id = e.id
JOIN event_organisers o ON e.organiser_id = o.id
JOIN academic_status acy ON t.academic_year = acy.id
JOIN fields_of_study fos ON t.field_of_study = fos.id;

COMMENT ON VIEW tickets_with_event_details IS 'View that combines event ticket details with corresponding event information.';
