insert into discount_codes (
  code, active, total_percent, ride_percent, min_fare, night_percent, holiday_percent, wait_percent, meet_greet_free, max_discount, vehicle
) values
  ('RICCIO5', true, 5, 0, 0, 0, 0, 0, false, 0, 'all'),
  ('RICCIO10', true, 10, 0, 0, 0, 0, 0, false, 0, 'all'),
  ('RICCIO15', true, 15, 0, 0, 0, 0, 0, false, 0, 'all'),
  ('RICCIO20', true, 20, 0, 0, 0, 0, 0, false, 0, 'all'),
  ('CONVENZIONE20', true, 0, 20, 60, 5, 5, 5, true, 0, 'all')
on conflict (code) do nothing;
