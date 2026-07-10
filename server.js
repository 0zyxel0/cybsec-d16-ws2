require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from current directory
app.use(express.static(__dirname));

// Submit API Endpoint
app.post('/api/submit', async (req, res) => {
  const { analystName, studentEmail, sessionSet, reportDate, score, ticket, customEmail } = req.body;

  console.log(`[INFO] Received submission from Student: ${analystName || 'Unknown'} (${studentEmail || 'No Email'}) | SessionSet: ${sessionSet || 'None'} (Score: ${score}%)`);

  // Prepare NocoDB payload mapping exactly to the requested NocoDB fields
  const nocodbPayload = {
    EmailAddress: studentEmail || '',
    SessionSet: sessionSet || '',
    StudentName: analystName || '',
    Answer: {
      reportDate: reportDate || new Date().toISOString().slice(0, 10),
      score: score || 0,
      ticket: {
        hostname: ticket?.hostname || '',
        internalIP: ticket?.internalIP || '',
        department: ticket?.department || '',
        threatName: ticket?.threatName || '',
        fileName: ticket?.fileName || '',
        externalIP: ticket?.externalIP || '',
        attackerPort: ticket?.attackerPort || '',
        attackerProtocol: ticket?.attackerProtocol || '',
        secondaryFile: ticket?.secondaryFile || '',
        cveId: ticket?.cveId || '',
        severity: ticket?.severity || '',
        summary: ticket?.summary || ''
      },
      emailDraft: customEmail || ''
    }
  };

  // Note: NocoDB v2/v3 tables endpoint is: https://<nocodb-host>/api/v2/tables/<table-id>/records
  const nocodbUrl = process.env.NOCODB_API_URL;
  const nocodbToken = process.env.NOCODB_TOKEN;

  if (!nocodbUrl || !nocodbToken) {
    console.warn('[WARN] NocoDB configuration is missing. Logging submission payload locally instead:');
    console.log(JSON.stringify(nocodbPayload, null, 2));
    
    return res.status(200).json({
      success: true,
      message: 'Submission received successfully and logged locally. (Set NOCODB_API_URL and NOCODB_TOKEN in environment variables to persist in NocoDB)',
      localLogged: true
    });
  }

  try {
    console.log(`[INFO] Sending payload to NocoDB: ${nocodbUrl}`);
    const response = await axios.post(nocodbUrl, nocodbPayload, {
      headers: {
        'xc-token': nocodbToken,
        'Content-Type': 'application/json'
      }
    });

    console.log('[INFO] Successfully saved submission to NocoDB!');
    return res.status(200).json({
      success: true,
      message: 'Submission successfully saved to NocoDB!',
      data: response.data
    });
  } catch (error) {
    console.error('[ERROR] Failed to save to NocoDB:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal submission accepted, but saving to NocoDB failed.',
      error: error.response?.data || error.message
    });
  }
});

// Serve frontend on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`TechNova SOC Simulator running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} in your browser`);
  console.log(`NocoDB Configured: ${process.env.NOCODB_API_URL ? 'YES' : 'NO (Using Local Fallback)'}`);
  console.log(`===================================================`);
});
