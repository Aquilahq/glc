CREATE TABLE public.prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Anonymous',
  request text NOT NULL,
  is_public boolean NOT NULL DEFAULT true,
  prayer_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.prayer_requests TO anon;
GRANT SELECT, INSERT ON public.prayer_requests TO authenticated;
GRANT ALL ON public.prayer_requests TO service_role;

ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read public prayers"
  ON public.prayer_requests FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

CREATE POLICY "Anyone can submit a prayer"
  ON public.prayer_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(request) BETWEEN 1 AND 1000
    AND char_length(name) <= 60
    AND prayer_count = 0
  );

CREATE TABLE public.service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_date date NOT NULL,
  party_size integer NOT NULL DEFAULT 1,
  kids_count integer NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.service_bookings TO anon;
GRANT INSERT ON public.service_bookings TO authenticated;
GRANT ALL ON public.service_bookings TO service_role;

ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can reserve a seat"
  ON public.service_bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 80
    AND char_length(email) BETWEEN 3 AND 160
    AND party_size BETWEEN 1 AND 20
    AND kids_count BETWEEN 0 AND 20
    AND service_date >= (now() AT TIME ZONE 'America/Los_Angeles')::date - 1
  );

CREATE FUNCTION public.increment_prayer_count(_id uuid)
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.prayer_requests
     SET prayer_count = prayer_count + 1
   WHERE id = _id AND is_public = true
  RETURNING prayer_count;
$$;

GRANT EXECUTE ON FUNCTION public.increment_prayer_count(uuid) TO anon, authenticated;