-- Run this SQL in your Supabase SQL Editor to create the posts table with RLS Policies!

-- 1. Create posts table
create table if not exists public.posts (
    id uuid default gen_random_uuid() primary key,
    user_name text not null,
    title text not null,
    content text not null,
    category text default 'General',
    created_at timestamptz default now()
);

-- Index for fast user queries
create index if not exists posts_user_name_idx on public.posts (user_name);

-- 2. Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- 3. RLS Policies for Anon / Public Access
create policy "Allow public read access"
on public.posts for select
using (true);

create policy "Allow public insert access"
on public.posts for insert
with check (true);

create policy "Allow public update access"
on public.posts for update
using (true)
with check (true);

create policy "Allow public delete access"
on public.posts for delete
using (true);