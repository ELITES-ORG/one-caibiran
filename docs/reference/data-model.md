# Data model

Postgres 17. Schema in `backend/src/db/schema/`, applied only through committed
migrations.

## sessions

Backing store for the cookie session. Not created by a session library.

| Column | Type | Notes |
|---|---|---|
| `sid` | text, primary key | express-session id |
| `data` | text | JSON session blob |
| `expires_at` | timestamptz | pruned on an interval |
| `user_id` | uuid, nullable | set once an account is signed in; the foreign key arrives with accounts |

Add a section here in the same change as a new table.
