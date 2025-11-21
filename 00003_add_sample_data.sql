/*
# Add Sample Data for Demo

This migration adds sample cases and alerts to demonstrate the platform's functionality.
Users can delete this data through the UI if needed.

## Sample Data Included:
- 5 sample cases with different types and priorities
- 3 sample alerts with varying severity levels
*/

-- Insert sample cases
INSERT INTO cases (case_number, customer_name, customer_id, case_type, priority, status, assigned_to, resolution_notes) VALUES
('CASE-2025001', 'John Anderson', 'CUST-10234', 'document_forgery'::case_type, 'high'::case_priority, 'investigating'::case_status, 'jane_smith', 'Detected inconsistencies in passport photo. Forensic analysis in progress.'),
('CASE-2025002', 'Sarah Mitchell', 'CUST-10567', 'kyc_fraud'::case_type, 'critical'::case_priority, 'open'::case_status, 'john_doe', 'Multiple identity documents submitted with conflicting information.'),
('CASE-2025003', 'Michael Chen', 'CUST-10892', 'aml_violation'::case_type, 'medium'::case_priority, 'resolved'::case_status, 'mike_johnson', 'Suspicious transaction patterns identified. Customer provided satisfactory explanation. Case closed.'),
('CASE-2025004', 'Emma Williams', 'CUST-11045', 'identity_theft'::case_type, 'high'::case_priority, 'investigating'::case_status, 'sarah_williams', 'Potential identity theft detected. Coordinating with law enforcement.'),
('CASE-2025005', 'David Brown', 'CUST-11234', 'document_forgery'::case_type, 'low'::case_priority, 'closed'::case_status, 'jane_smith', 'False positive. Document verified as authentic after manual review.');

-- Insert sample alerts
INSERT INTO alerts (alert_type, severity, message) VALUES
('high_risk_document'::alert_type, 'critical'::alert_severity, 'Critical fraud indicators detected in passport document for customer CUST-10567. Immediate investigation required.'),
('suspicious_pattern'::alert_type, 'high'::alert_severity, 'Unusual transaction pattern detected: Multiple high-value transfers to offshore accounts within 24 hours.'),
('aml_flag'::alert_type, 'medium'::alert_severity, 'Customer CUST-11892 flagged for potential AML violation. Transaction monitoring activated.');