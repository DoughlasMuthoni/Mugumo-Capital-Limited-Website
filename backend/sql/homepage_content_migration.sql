-- Homepage content settings — run once on mugumo_capital database
USE mugumo_capital;

INSERT IGNORE INTO site_settings (setting_key, setting_label, setting_value) VALUES
  ('about_label',     'Who We Are — Section Label',        'Who We Are'),
  ('about_heading',   'Who We Are — Heading',              'A Kenyan Capital Raising Partner Built for East Africa'),
  ('about_p1',        'Who We Are — First Paragraph',      'Mugumo Capital Partners is a Nairobi-headquartered advisory firm dedicated to arranging and syndicating project finance, structured debt, and institutional capital across Kenya and East Africa.'),
  ('about_p2',        'Who We Are — Second Paragraph',     'We operate at the intersection of bankable project development and institutional investor requirements — providing the structuring discipline, sector expertise, and regional network that transformational projects demand.'),
  ('about_cta',       'Who We Are — CTA Button Text',      'Learn More About Us'),
  ('about_hq',        'Who We Are — HQ Badge Label',       'Headquartered in'),
  ('about_nairobi',   'Who We Are — HQ Badge City',        'Nairobi, Kenya'),
  ('about_pillar_1',  'Who We Are — Pillar 1 Label',       'Project Finance'),
  ('about_pillar_2',  'Who We Are — Pillar 2 Label',       'PPP Advisory'),
  ('about_pillar_3',  'Who We Are — Pillar 3 Label',       'Institutional Capital'),
  ('why_label',       'Why Mugumo — Section Label',        'Why Partner With Mugumo'),
  ('why_heading',     'Why Mugumo — Heading',              'Deep East African Roots. Institutional-Grade Execution.'),
  ('why_body',        'Why Mugumo — Body Paragraph',       'Four pillars that define how we work, what we offer, and why sponsors and investors choose to work with us.'),
  ('why_item_1_title','Why Mugumo — Card 1 Title',         'Local Conviction'),
  ('why_item_1_body', 'Why Mugumo — Card 1 Body',         'Headquartered in Nairobi with regional coverage across East Africa, we bring on-the-ground sector knowledge and investor relationships that matter.'),
  ('why_item_2_title','Why Mugumo — Card 2 Title',         'Investor Network'),
  ('why_item_2_body', 'Why Mugumo — Card 2 Body',         'We maintain active relationships with institutional investors, DFIs, pension funds, and commercial banks aligned with our focus sectors.'),
  ('why_item_3_title','Why Mugumo — Card 3 Title',         'Structuring Discipline'),
  ('why_item_3_body', 'Why Mugumo — Card 3 Body',         'We bring rigorous financial structuring experience to every mandate — from feasibility to financial close.'),
  ('why_item_4_title','Why Mugumo — Card 4 Title',         'Sector Specialisation'),
  ('why_item_4_body', 'Why Mugumo — Card 4 Body',         'Our focus is intentional: affordable housing, renewable energy, PPP infrastructure, and microfinance. We do not dilute our expertise.');
