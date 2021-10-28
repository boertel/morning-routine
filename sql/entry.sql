-- Create a table for Public Entry
create table entry (
  id uuid not null,
  updated_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  src text not null,
  title text,
  duration integer,
  thumbnail jsonb,
  rrule text,

  profile_id uuid references public.profile not null,

  primary key (id)
);

alter table entry enable row level security;

create policy "Public entries are viewable by everyone."
  on entry for select
  using ( true );

create policy "Users can insert their own entries."
  on entry for insert
  with check ( auth.uid() = profile_id );

create policy "Users can update own entry."
  on entry for update
  using ( auth.uid() = profile_id );

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table entry;
