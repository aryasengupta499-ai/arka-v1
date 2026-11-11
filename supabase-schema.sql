-- Run this in your Supabase SQL Editor to create the leads table
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  company text,
  role text,
  use_case text,
  source text default 'landing_page',
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Allow anon inserts (for the API route)
create policy "Allow anon inserts" on public.leads
  for insert to anon
  with check (true);

-- Allow authenticated users to read all leads
create policy "Allow authenticated reads" on public.leads
  for select to authenticated
  using (true);

-- Allow authenticated users to update leads
create policy "Allow authenticated updates" on public.leads
  for update to authenticated
  using (true);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end $$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.handle_updated_at();

-- Index for faster lookups
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);