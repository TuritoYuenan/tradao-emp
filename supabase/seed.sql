INSERT INTO academic_status (id, label, description) VALUES
	('freshman', 'Freshman', 'First year student'),
	('sophomore', 'Sophomore', 'Second year student'),
	('junior', 'Junior', 'Third year student'),
	('senior', 'Senior', 'Fourth year student'),
	('graduate', 'Graduate', 'Graduate student'),
	('other', 'Other', 'Other academic status');

INSERT INTO fields_of_study (id, label, description) VALUES
	('cs', 'Computer Science', 'Field related to computing and programming'),
	('bus', 'Business', 'Field related to business and management'),
	('media', 'Media & Communication', 'Field related to media, journalism, and communication studies'),
	('eng', 'Engineering', 'Field related to various engineering disciplines'),
	('art', 'Arts & Humanities', 'Field related to arts, literature, and humanities'),
	('sci', 'Sciences', 'Field related to natural and physical sciences'),
	('other', 'Other', 'Other fields of study');

INSERT INTO
	"public"."community_events"
	("id", "title", "description", "category", "start_time", "end_time", "location", "organiser_id", "image", "created_at", "updated_at")
VALUES
	('12ab1528-4ddc-4945-8782-52d33317fe21', 'Introduction to Git and GitHub', null, 'Workshop', '2025-01-14 10:00:00', '2025-01-14 12:00:00', 'Innovation Space', 'fd6131ea-d7e0-474b-8ec0-f982d0a69dc8', 'https://woenwfdxwwllmxwucivw.supabase.co/storage/v1/object/public/assets/event_thumbnails/01K9Q8DMPE54EAC1A2N34K0QEG.png', '2025-11-10 15:34:54.056417', '2025-11-10 15:34:54.056417'),
	('5023b5d2-51cf-4424-983f-fef147dad29f', 'CS3: Computing on AWS', null, 'Workshop', '2025-12-21 11:00:00', '2025-12-21 13:00:00', 'Melbourne Auditorium', 'fd6131ea-d7e0-474b-8ec0-f982d0a69dc8', 'https://placehold.co/160x90', '2025-11-10 15:34:54.056417', '2025-11-10 15:34:54.056417'),
	('567dc9a7-1c60-4f44-bd3f-8cffc6391c6c', 'Enhancing Software Development with Docker Products', null, 'Workshop', '2025-02-14 10:00:00', '2025-02-14 12:00:00', 'Innovation Concept Room', 'fd6131ea-d7e0-474b-8ec0-f982d0a69dc8', 'https://woenwfdxwwllmxwucivw.supabase.co/storage/v1/object/public/assets/event_thumbnails/01K9Q8EEKWG08HG1XV9V8QA68F.png', '2025-11-10 15:34:54.056417', '2025-11-10 15:34:54.056417'),
	('5794261c-3b89-4295-861d-2f1861ae0658', 'CS2: Security and Networking in AWS', null, 'Workshop', '2025-11-04 09:30:00', '2025-11-04 11:30:00', 'Melbourne Auditorium', 'fd6131ea-d7e0-474b-8ec0-f982d0a69dc8', 'https://woenwfdxwwllmxwucivw.supabase.co/storage/v1/object/public/assets/event_thumbnails/01K9Q8F1HHYMD84EAWRRCC0R0P.png', '2025-11-10 15:34:54.056417', '2025-11-10 15:34:54.056417'),
	('cb3f4cc0-2eb3-4026-b09a-13bd22d0aec4', 'CS1: Cloud Computing Concepts and AWS', null, 'Workshop', '2025-09-23 09:30:00', '2025-09-23 11:30:00', 'Melbourne Auditorium', 'fd6131ea-d7e0-474b-8ec0-f982d0a69dc8', 'https://woenwfdxwwllmxwucivw.supabase.co/storage/v1/object/public/assets/event_thumbnails/01K9Q8EWWPK2CS6SRFQYXZZ9R9.png', '2025-11-10 15:34:54.056417', '2025-11-10 15:34:54.056417');
