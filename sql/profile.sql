-- Create a table for Public Profile
create table profile (
  id uuid references auth.users not null on delete cascade,
  updated_at timestamp with time zone,
  username text unique,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profile enable row level security;

create policy "Public profiles are viewable by everyone."
  on profile for select
  using ( true );

create policy "Users can insert their own profile."
  on profile for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profile for update
  using ( auth.uid() = id );


create or replace function public.handle_new_user();
returns trigger as $$
begin
  insert into public.profile (id, username)
    values (new.id, new.raw_user_meta_data->>'username');

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profile;



