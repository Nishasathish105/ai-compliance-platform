/*
# Compliance & Fraud Detection Platform Schema

## Overview
This migration creates the core database structure for a compliance and fraud detection platform.

## Tables

### 1. documents
Stores uploaded documents for verification
- id (uuid, primary key)
- user_id (text) - Anonymous UUID for tracking
- file_name (text)
- file_type (text)
- file_url (text)
- document_type (enum: 'id', 'kyc', 'financial', 'business')
- upload_date (timestamptz)
- status (enum: 'pending', 'processing', 'verified', 'flagged', 'rejected')

### 2. verification_results
Stores AI verification results for documents
- id (uuid, primary key)
- document_id (uuid, references documents)
- risk_score (integer, 0-100)
- is_fraudulent (boolean)
- fraud_indicators (jsonb) - Array of detected issues
- confidence_level (integer, 0-100)
- verification_date (timestamptz)
- heatmap_data (jsonb) - Coordinates of suspicious areas

### 3. cases
Case management for investigations
- id (uuid, primary key)
- case_number (text, unique)
- customer_name (text)
- customer_id (text)
- case_type (enum: 'kyc_fraud', 'aml_violation', 'document_forgery', 'identity_theft')
- priority (enum: 'low', 'medium', 'high', 'critical')
- status (enum: 'open', 'investigating', 'resolved', 'closed')
- assigned_to (text)
- created_date (timestamptz)
- updated_date (timestamptz)
- resolution_notes (text)

### 4. audit_trail
Immutable audit log for all actions
- id (uuid, primary key)
- action_type (text)
- entity_type (text)
- entity_id (uuid)
- user_id (text)
- action_details (jsonb)
- blockchain_hash (text) - Simulated blockchain hash
- timestamp (timestamptz)

### 5. alerts
Real-time fraud alerts
- id (uuid, primary key)
- alert_type (enum: 'high_risk_document', 'suspicious_pattern', 'aml_flag', 'duplicate_identity')
- severity (enum: 'low', 'medium', 'high', 'critical')
- entity_id (uuid)
- message (text)
- is_read (boolean)
- created_date (timestamptz)

## Security
- All tables are public (no RLS) for demo purposes
- UUID-based anonymous user tracking
*/

-- Create enums
CREATE TYPE document_type AS ENUM ('id', 'kyc', 'financial', 'business');
CREATE TYPE document_status AS ENUM ('pending', 'processing', 'verified', 'flagged', 'rejected');
CREATE TYPE case_type AS ENUM ('kyc_fraud', 'aml_violation', 'document_forgery', 'identity_theft');
CREATE TYPE case_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE case_status AS ENUM ('open', 'investigating', 'resolved', 'closed');
CREATE TYPE alert_type AS ENUM ('high_risk_document', 'suspicious_pattern', 'aml_flag', 'duplicate_identity');
CREATE TYPE alert_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Documents table
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_url text NOT NULL,
  document_type document_type NOT NULL,
  upload_date timestamptz DEFAULT now(),
  status document_status DEFAULT 'pending'::document_status
);

-- Verification results table
CREATE TABLE verification_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  risk_score integer CHECK (risk_score >= 0 AND risk_score <= 100),
  is_fraudulent boolean DEFAULT false,
  fraud_indicators jsonb DEFAULT '[]'::jsonb,
  confidence_level integer CHECK (confidence_level >= 0 AND confidence_level <= 100),
  verification_date timestamptz DEFAULT now(),
  heatmap_data jsonb DEFAULT '[]'::jsonb
);

-- Cases table
CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_id text NOT NULL,
  case_type case_type NOT NULL,
  priority case_priority DEFAULT 'medium'::case_priority,
  status case_status DEFAULT 'open'::case_status,
  assigned_to text,
  created_date timestamptz DEFAULT now(),
  updated_date timestamptz DEFAULT now(),
  resolution_notes text
);

-- Audit trail table
CREATE TABLE audit_trail (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  user_id text NOT NULL,
  action_details jsonb DEFAULT '{}'::jsonb,
  blockchain_hash text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Alerts table
CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type alert_type NOT NULL,
  severity alert_severity NOT NULL,
  entity_id uuid,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_date timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_verification_document_id ON verification_results(document_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_priority ON cases(priority);
CREATE INDEX idx_audit_trail_timestamp ON audit_trail(timestamp DESC);
CREATE INDEX idx_alerts_is_read ON alerts(is_read);
CREATE INDEX idx_alerts_severity ON alerts(severity);

-- Function to generate blockchain hash
CREATE OR REPLACE FUNCTION generate_blockchain_hash(data text)
RETURNS text AS $$
BEGIN
  RETURN encode(digest(data || now()::text, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Function to create audit trail entry
CREATE OR REPLACE FUNCTION create_audit_entry(
  p_action_type text,
  p_entity_type text,
  p_entity_id uuid,
  p_user_id text,
  p_action_details jsonb
)
RETURNS uuid AS $$
DECLARE
  v_audit_id uuid;
  v_hash text;
BEGIN
  v_hash := generate_blockchain_hash(p_action_type || p_entity_type || p_entity_id::text);
  
  INSERT INTO audit_trail (action_type, entity_type, entity_id, user_id, action_details, blockchain_hash)
  VALUES (p_action_type, p_entity_type, p_entity_id, p_user_id, p_action_details, v_hash)
  RETURNING id INTO v_audit_id;
  
  RETURN v_audit_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment case updates
CREATE OR REPLACE FUNCTION update_case_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_date = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cases_update_timestamp
BEFORE UPDATE ON cases
FOR EACH ROW
EXECUTE FUNCTION update_case_timestamp();