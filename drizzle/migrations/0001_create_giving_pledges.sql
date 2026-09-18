CREATE TABLE public.giving_pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 1 AND 80),
  email TEXT NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 255),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 30),
  amount_cents INTEGER NOT NULL CHECK (amount_cents BETWEEN 100 AND 5000000),
  frequency TEXT NOT NULL CHECK (frequency IN ('one-time', 'monthly')),
  fund TEXT NOT NULL CHECK (fund IN ('general', 'missions', 'building', 'benevolence')),
  method TEXT NOT NULL CHECK (method IN ('card', 'check', 'in-person', 'other')),
  note TEXT CHECK (note IS NULL OR char_length(note) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.giving_pledges TO anon;
GRANT SELECT, INSERT ON public.giving_pledges TO authenticated;
GRANT ALL ON public.giving_pledges TO service_role;

ALTER TABLE public.giving_pledges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a giving pledge"
ON public.giving_pledges FOR INSERT TO anon, authenticated
WITH CHECK (true);
