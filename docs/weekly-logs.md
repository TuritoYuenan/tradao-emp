# Weekly Log 3

- 2025-06-23 to 2025-06-29

## Accomplished

-

## Un-Accomplished

-

## Difficulties

-

## Plan for next week

-

# Weekly Log 2

- 2025-06-16 to 2025-06-22

## Accomplished

- Git: Rebase all commits.
- DB: Created SQL function `create_event_tickets`.
- DB: Created SQL view `upcoming_events`.
- BE: Removed edge function `process-participation` in favour of direct INSERT query in FE via the client library.
- BE: Created edge function `get-ticket` to lookup an event ticket.
- FE: Add embedded Google Map into **Event detail page**.
- FE: Created **Ticket lookup page** with ticket details, "Add to Google Wallet" button.

## Un-Accomplished

- FE: Use `upcoming_events` SQL view in Event list page
- FE: Implement search and filter of events
- Implement Google Wallet integration
- Implement lab member authentication and Create event page

## Difficulties

- Embedded Google Map is hardcoded on one location (the Swinburne HCMC campus), and there is currently no easy way to change it based on event location.
- Role-based Access Control in Supabase (e.g. via RLS) does not apply principle of least privilege.
- Git Rebase caused all previous commits to reset their timestamps to 20/June.

## Plan for next week

- Survey for better event registration form
- Brainstorm and survey for Supabase RBAC

# Weekly Log 1

- 2025-06-09 to 2025-06-15

## Accomplished

- DB: Created SQL table `community_events`.
- DB: Created SQL table `event_tickets`.
- BE: Created edge function `process-participation` to handle user registration.
- FE: Added Supabase client library.
- FE: Created **Event list page** with multiple, paginated event cards.
- FE: Created **Event detail page** with event details presented in a grid layout.

## Un-Accomplished

- Git: Write commit messages in the Conventional Commits format.
- FE: Test user registration of event

## Difficulties

- With already 20 commits in the remote repository, applying Conventional Commits require Git rebasing and force-pushing.
- It is unofficialised what data to require from user registering for events => Use fields from Google Forms but will change

## Plan for next week

- FE: Add a page to lookup event tickets after the user has registered
- Rebase anyway to apply Conventional Commits
