/*
# Add detailed address fields to orders table

1. Modified Tables
- `orders`
  - Add `house_no` (text, optional) — house/building number
  - Add `area_colony` (text, optional) — area or colony name
  - Add `state` (text, optional) — state name
  - Add `pincode` (text, optional) — postal pincode

2. Notes
- These columns complement the existing `address` column, which remains as a free-form field.
- All four new columns are nullable so existing orders are unaffected.
*/

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS house_no text,
  ADD COLUMN IF NOT EXISTS area_colony text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS pincode text;
