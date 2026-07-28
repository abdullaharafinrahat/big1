CREATE TABLE users (id UUID PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE, phone TEXT UNIQUE, password_hash TEXT, role TEXT DEFAULT 'user', created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE donor_profiles (id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), blood_group TEXT NOT NULL, district TEXT NOT NULL, area TEXT, last_donation_date DATE, available BOOLEAN DEFAULT true, latitude DOUBLE PRECISION, longitude DOUBLE PRECISION);
CREATE TABLE blood_requests (id UUID PRIMARY KEY, patient_name TEXT NOT NULL, contact_phone TEXT NOT NULL, blood_group TEXT NOT NULL, units_needed INT, hospital_name TEXT, district TEXT, needed_by TIMESTAMPTZ, urgency TEXT, status TEXT DEFAULT 'pending_moderation');
CREATE TABLE request_matches (id UUID PRIMARY KEY, request_id UUID REFERENCES blood_requests(id), donor_id UUID REFERENCES donor_profiles(id), score NUMERIC, status TEXT);
CREATE TABLE hospitals (id UUID PRIMARY KEY, name TEXT NOT NULL, district TEXT, address TEXT, phone TEXT, type TEXT, latitude DOUBLE PRECISION, longitude DOUBLE PRECISION);
CREATE TABLE blood_bank_inventory (id UUID PRIMARY KEY, hospital_id UUID REFERENCES hospitals(id), blood_group TEXT, units INT, updated_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE ambulances (id UUID PRIMARY KEY, provider_name TEXT, district TEXT, phone TEXT, vehicle_type TEXT, available BOOLEAN);
CREATE TABLE missing_reports (id UUID PRIMARY KEY, name TEXT, age INT, last_seen_location TEXT, description TEXT, contact_phone TEXT, status TEXT DEFAULT 'pending_moderation');
CREATE TABLE audit_logs (id BIGSERIAL PRIMARY KEY, actor_id UUID, action TEXT, entity_type TEXT, entity_id TEXT, metadata JSONB, created_at TIMESTAMPTZ DEFAULT now());
