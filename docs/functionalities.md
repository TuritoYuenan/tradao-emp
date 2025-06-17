# Functionalities Checklist

## Frontend (SvelteKit)

- Global
  - Colour palette
- Home page: No plan until advised
  - [x] Redirect to Browse events page
  - [ ] Consider: Redirect to ITea Lab's portfolio page
  - [x] Responsive => No need for now
- Browse events page:
  - [x] Title: Upcoming events
  - [x] Fetch community events from database
  - [x] `EventCard` component
    - Horizontal flexbox layout
    - Display title
    - Display date
    - Display location
    - Display thumbnail image
    - Register button to Event details page
  - [x] Pagination: 5 events per "page"
  - [ ] Search by title
  - [ ] Search by description
  - [ ] Filter by category
  - [ ] Filter by start date
  - Responsive:
    - [x] `EventCard` component to vertical flexbox layout on mobile
- Event details page:
  - [x] Route parameter
  - [x] Grid layout
  - [x] Display thumbnail image
  - [x] Display location
    - [x] Display room
    - [x] Embed Google Maps view
      - [x] Hardcoded: Swinburne HCMC campus
      - [ ] Variable: Requires change to database table
  - [x] Display title
  - [x] Display start and end time
  - [x] Display host name and email
  - [x] Display description
  - Registration form:
    - [ ]
  - Responsive:
    - [x] Grid layout to vertical flexbox layout on mobile

## Backend (Supabase)

- `process-participation` edge function:
  - [x] Receive a JSON registration form submission
  - [x] Insert to `event_tickets` table, get generated ID
  - [ ] Google Wallet API: POST pass class if not exist
  - [ ] Prepare a pass object
  - [ ] Google Wallet API: POST pass object, get object ID
  - [ ] Prepare and sign a JWT
  - [ ] Return a JSON response with the pass URL.
  - Status codes
    - 200 if all successful
    - 400 if cannot insert => Imply missing required data
    - 405 if request method is not POST
    - 500 catch-all => Imply server error
- `login` edge function: unplanned

## Database (Supabase)

- `community_events` table
  - [x] Definition
  - [x] Row-level security
  - [x] Sample/Mock/Dummy/Seed data
- `event_tickets` table
  - [x] Definition
  - [x] Row-level security
- [x] `upcoming_events` SQL view
- [ ] `create_event` SQL function
- [x] `create_ticket` SQL function
