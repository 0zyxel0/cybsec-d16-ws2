# Project Brief - TechNova SOC Analyst Simulator

## Project Overview
TechNova SOC Analyst Simulator is a classroom-oriented, web-based educational simulation game. It puts students in the shoes of a Tier 1 Security Operations Center (SOC) Analyst investigating a simulated high-severity security incident: **Operation "Bad Invoice"**.

## Core Goals
1. **Practical Training**: Give students hands-on practice analyzing security event logs, Wireshark network packets, and threat intelligence.
2. **Interactive Verification**: Validate the student's analysis in real-time through an interactive Incident Response Ticket Form.
3. **Escalation Practice**: Teach students how to structure and draft a Tier 2 Escalation Email to hand over the incident to senior Incident Response teams.
4. **Immediate Feedback & Reward**: Reward successful completion (100% correct answers) with achievement badges and a printable custom certificate.

## Scope of "Operation Bad Invoice"
- **The Incident**: Angela Smith from Finance opened a malicious document `Q3_Overdue_Invoice.docx` which triggered a Microsoft Support Diagnostic Tool (MSDT) remote code execution exploit (Follina, CVE-2022-30190).
- **Forensics/Evidence Provided**:
  - **Evidence A (Defender Log)**: Details of the antivirus alert, quarantined file, infected host (`FIN-PC-04`), and internal IP (`192.168.10.45`).
  - **Evidence B (Network PCAP)**: Interactive simulated Wireshark table with 5 packets depicting a 3-way TCP handshake and an HTTP GET request downloading a secondary payload (`update.exe`) from external IP `203.0.113.88` on port `80`.
  - **Evidence C (Threat Intel)**: Details of CVE-2022-30190 (Follina MSDT vulnerability) with its high severity score (CVSS 7.8).
- **Interactive Ticket & Email Form**: Needs precise values for the host, IPs, ports, protocols, filenames, CVEs, and a written synthesis summary.
