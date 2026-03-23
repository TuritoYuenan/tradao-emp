-- View for upcoming events in the next 2 days
CREATE VIEW upcoming_events WITH (security_invoker = ON) AS
SELECT *
FROM community_events
WHERE start_time > (CURRENT_DATE + INTERVAL '2 days');

COMMENT ON VIEW upcoming_events IS 'View that lists community events starting in the next 2 days.';
