# Product Context - TechNova SOC Analyst Simulator

## Why This Project Exists
In cybersecurity education, theoretical knowledge about alerts, network captures, and CVEs is insufficient. Students must learn how to correlate disjointed logs, recognize patterns, perform basic digital forensics, and write actionable escalations.

TechNova SOC Analyst Simulator was built to bridge the gap between static slides and high-barrier-to-entry homelabs. It runs directly in the browser with zero setup, making it ideal for classroom environments and quick-turnaround cyber range training.

## Problems It Solves
1. **Tool Overwhelm**: Instead of teaching a complete ELK stack or enterprise SIEM in the first lesson, the simulator abstracts these into simplified yet high-fidelity interactive cards representing Defender AV, Wireshark, and CVE registries.
2. **Delayed Grading**: Real-time evaluation of input answers lets students know instantly if they misidentified an Indicator of Compromise (IoC).
3. **Escalation Gaps**: Security analysts must communicate technical details clearly. The dynamic Tier 2 email builder demonstrates how ticket entries populate an actual escalation memo, modeling real-world workflows.

## How It Works & User Experience
- **Vibe & Styling**: Uses a sleek cyberpunk-inspired, dark-themed SOC dashboard with high-contrast colors (emerald green, warning amber, critical red).
- **Interactive Inspection**: Clicking on network packets reveals custom payload details, replicating Wireshark's detailed inspection pane.
- **Dynamic Grading Rules**:
  - The form uses rigorous validation: case-insensitive trim matches for inputs like `FIN-PC-04`, `192.168.10.45`, `Exploit:Win32/Follina.Aldha`, and `CVE-2022-30190`.
  - Input status changes color dynamically (green for correct, red/orange for filled-but-incorrect).
  - Score updates in real-time.
- **Escalation Handshake**: The "Escalate Incident" button becomes active only at 100% score, displaying a terminal feed from the responding Tier 2 team, unlocking achievement badges, and providing a printable, personalized PDF-ready Certificate.
