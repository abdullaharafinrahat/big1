-- =============================================================================
-- BONDHU HEALTHCARE & EMERGENCY BLOOD NETWORK - PRODUCTION DATABASE SCHEMA
-- PostgreSQL 16+ with PostGIS Geospatial Extension
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. USERS & IDENTITY
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE,
    role VARCHAR(30) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'donor', 'doctor', 'hospital_admin', 'ambulance_driver', 'foundation_admin', 'super_admin')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);

-- 2. DONOR PROFILES & GEOLOCATION
CREATE TABLE IF NOT EXISTS donor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    district VARCHAR(60) NOT NULL,
    upazila VARCHAR(60),
    union_ward VARCHAR(60),
    address TEXT,
    coordinates GEOMETRY(Point, 4326),
    last_donation_date DATE,
    total_donations INTEGER NOT NULL DEFAULT 0,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    badge_level VARCHAR(20) NOT NULL DEFAULT 'bronze' CHECK (badge_level IN ('bronze', 'silver', 'gold', 'platinum')),
    nid_number VARCHAR(30),
    nid_document_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_donors_blood_group ON donor_profiles(blood_group);
CREATE INDEX idx_donors_district ON donor_profiles(district);
CREATE INDEX idx_donors_available ON donor_profiles(is_available) WHERE is_available = TRUE;
CREATE INDEX idx_donors_geo ON donor_profiles USING GIST(coordinates);

-- 3. BLOOD REQUESTS
CREATE TABLE IF NOT EXISTS blood_requests (
    id VARCHAR(30) PRIMARY KEY,
    requester_id UUID REFERENCES users(id) ON DELETE SET NULL,
    patient_name VARCHAR(100) NOT NULL,
    blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    units_count INTEGER NOT NULL DEFAULT 1 CHECK (units_count > 0 AND units_count <= 10),
    hospital_name VARCHAR(150) NOT NULL,
    hospital_branch VARCHAR(100),
    district VARCHAR(60) NOT NULL,
    upazila VARCHAR(60),
    contact_phone VARCHAR(15) NOT NULL,
    alternate_phone VARCHAR(15),
    urgency VARCHAR(20) NOT NULL DEFAULT 'urgent' CHECK (urgency IN ('immediate', 'urgent', 'scheduled')),
    reason VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'searching', 'matched', 'in_progress', 'completed', 'cancelled')),
    matched_donors_count INTEGER NOT NULL DEFAULT 0,
    coordinates GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blood_requests_status ON blood_requests(status);
CREATE INDEX idx_blood_requests_blood_group ON blood_requests(blood_group);
CREATE INDEX idx_blood_requests_geo ON blood_requests USING GIST(coordinates);

-- 4. HOSPITALS & BLOOD BANK INVENTORY
CREATE TABLE IF NOT EXISTS hospitals (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    hospital_type VARCHAR(60) NOT NULL,
    district VARCHAR(60) NOT NULL,
    address TEXT NOT NULL,
    emergency_phone VARCHAR(20) NOT NULL,
    hotline VARCHAR(10) NOT NULL,
    total_beds INTEGER DEFAULT 0,
    available_icu_beds INTEGER DEFAULT 0,
    available_ccu_beds INTEGER DEFAULT 0,
    coordinates GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blood_bank_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id VARCHAR(30) NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    units_available INTEGER NOT NULL DEFAULT 0 CHECK (units_available >= 0),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hospital_id, blood_group)
);

-- 5. AMBULANCE FLEET
CREATE TABLE IF NOT EXISTS ambulances (
    id VARCHAR(30) PRIMARY KEY,
    provider_name VARCHAR(150) NOT NULL,
    vehicle_number VARCHAR(30) UNIQUE NOT NULL,
    vehicle_type VARCHAR(60) NOT NULL,
    hospital_id VARCHAR(30) REFERENCES hospitals(id) ON DELETE SET NULL,
    district VARCHAR(60) NOT NULL,
    driver_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'On Duty', 'Maintenance', 'Inactive')),
    equipment TEXT,
    coordinates GEOMETRY(Point, 4326),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. MISSING BUREAU
CREATE TABLE IF NOT EXISTS missing_reports (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age >= 0 AND age <= 130),
    last_seen_location TEXT NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    photo_url VARCHAR(255),
    status VARCHAR(30) NOT NULL DEFAULT 'pending_moderation' CHECK (status IN ('pending_moderation', 'approved', 'found', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(60) NOT NULL,
    entity_type VARCHAR(60) NOT NULL,
    entity_id VARCHAR(60) NOT NULL,
    actor_id VARCHAR(60),
    ip_address INET,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_event_type ON audit_logs(event_type);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
