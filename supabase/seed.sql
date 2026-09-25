-- Ghost Factory™ Seed Data for CRANE & RIGGING OPS OS

INSERT INTO crane_inventory (asset_tag, model_name, category, daily_rate_cents, operational_status, telematics_runtime_hours) VALUES
('TAG-001', 'Liebherr LTM 1500-8.1 All-Terrain Mobile Crane', 'Heavy Lift Engineering & Certified Crane Rigging OS', 185000, 'AVAILABLE', 420.50),
('TAG-002', 'Liebherr LR 1300.1 SX Heavy Crawler Crane', 'Heavy Lift Engineering & Certified Crane Rigging OS', 240000, 'ON_SITE', 1250.75),
('TAG-003', 'Master Rigging & Heavy Tandem Lift Crew', 'Heavy Lift Engineering & Certified Crane Rigging OS', 95000, 'AVAILABLE', 310.20)
ON CONFLICT (asset_tag) DO NOTHING;

INSERT INTO lift_plans (client_name, contact_phone, dispatch_date, contract_status, security_deposit_cents) VALUES
('Apex Infrastructure Partners LLC', '+1 (555) 019-2834', CURRENT_DATE, 'ACTIVE', 500000),
('Horizon Industrial Logistics Inc', '+1 (555) 438-9201', CURRENT_DATE + INTERVAL '2 days', 'CONFIRMED', 350000);

INSERT INTO site_dispatches (dispatch_code, destination_site, carrier_license, bill_of_lading_hash) VALUES
('DISP-8891', 'Gateway Logistics Center Bay 14, Dallas TX', 'TX-DOT-99214', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'),
('DISP-8892', 'Interstate Heavy Rail Yard Bay 03, Chicago IL', 'IL-DOT-44012', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb');
