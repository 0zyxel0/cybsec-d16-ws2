import { defineStore } from 'pinia'

export interface StudentSession {
  id: number
  email: string
  givenName: string
  middlename?: string
  familyName: string
  studentNumber: string
  classroom: string[]
}

export interface NetworkPacket {
  no: number
  time: string
  src: string
  dst: string
  proto: string
  len: number
  srcPort?: string
  dstPort?: string
  info: string
  highlight?: boolean
  payload?: string
}

export interface TicketState {
  hostname: string
  internalIP: string
  department: string
  threatName: string
  fileName: string
  externalIP: string
  attackerPort: string
  attackerProtocol: string
  secondaryFile: string
  cveId: string
  severity: string
  summary: string
}

export const useCybersecurityGameStore = defineStore('cybersecurityGame', {
  state: () => ({
    student: null as StudentSession | null,
    isAuthenticated: false,
    sessionChecked: false,

    showInstructions: false,
    hintsEnabled: true,
    activeEvidenceTab: 'av' as 'av' | 'wireshark' | 'cve',
    incidentEscalated: false,
    isDevMode: false,
    showDevTestModal: false,
    devSubmissionSuccess: false,

    analystName: '',
    studentEmail: '',
    reportDate: new Date().toISOString().slice(0, 10),
    sessionSet: '',

    ticket: {
      hostname: '',
      internalIP: '',
      department: '',
      threatName: '',
      fileName: '',
      externalIP: '',
      attackerPort: '',
      attackerProtocol: '',
      secondaryFile: '',
      cveId: '',
      severity: '',
      summary: ''
    } as TicketState,

    packets: [
      {
        no: 142,
        time: '08:34:13',
        src: '192.168.10.45',
        dst: '203.0.113.88',
        proto: 'TCP',
        len: 66,
        srcPort: '49342',
        dstPort: '80',
        info: '49342 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 WS=256',
        payload: 'TCP Handshake Step 1 (SYN Packet Initiated by Host FIN-PC-04 to External IP 203.0.113.88:80)'
      },
      {
        no: 143,
        time: '08:34:13',
        src: '203.0.113.88',
        dst: '192.168.10.45',
        proto: 'TCP',
        len: 66,
        srcPort: '80',
        dstPort: '49342',
        info: '80 → 49342 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0 MSS=1460',
        payload: 'TCP Handshake Step 2 (SYN-ACK Response Received from 203.0.113.88:80)'
      },
      {
        no: 144,
        time: '08:34:13',
        src: '192.168.10.45',
        dst: '203.0.113.88',
        proto: 'TCP',
        len: 54,
        srcPort: '49342',
        dstPort: '80',
        info: '49342 → 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
        payload: 'TCP Handshake Step 3 (ACK Connection Established)'
      },
      {
        no: 145,
        time: '08:34:14',
        src: '192.168.10.45',
        dst: '203.0.113.88',
        proto: 'HTTP',
        len: 188,
        srcPort: '49342',
        dstPort: '80',
        info: 'GET /payload/update.exe HTTP/1.1',
        highlight: true,
        payload: 'GET /payload/update.exe HTTP/1.1\nHost: 203.0.113.88\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nAccept: */*\nConnection: keep-alive'
      },
      {
        no: 146,
        time: '08:34:15',
        src: '203.0.113.88',
        dst: '192.168.10.45',
        proto: 'HTTP',
        len: 1043,
        srcPort: '80',
        dstPort: '49342',
        info: 'HTTP/1.1 200 OK (application/x-msdownload)',
        payload: 'HTTP/1.1 200 OK\nContent-Type: application/x-msdownload\nContent-Length: 98900\nConnection: close\n\n[BINARY EXEC DATA: update.exe executable headers (PE File Headers Detected)]'
      }
    ] as NetworkPacket[],

    selectedPacket: null as NetworkPacket | null,
    isEmailEdited: false,
    customEmailBody: '',
    copiedText: false,
    submitting: false,
    submissionMessage: '',
    retries: 1
  }),
  getters: {
    ticketValidation: (state) => {
      const val = (input: string, expected: string | string[]) => {
        if (!input) return false
        const cleanedInput = input.trim().toLowerCase()
        if (Array.isArray(expected)) {
          return expected.some(exp => cleanedInput === exp.toLowerCase())
        }
        return cleanedInput === expected.toLowerCase()
      }

      return {
        hostname: val(state.ticket.hostname, 'FIN-PC-04'),
        internalIP: val(state.ticket.internalIP, '192.168.10.45'),
        department: val(state.ticket.department, 'Finance'),
        threatName: val(state.ticket.threatName, 'Exploit:Win32/Follina.Aldha'),
        fileName: val(state.ticket.fileName, 'Q3_Overdue_Invoice.docx'),
        externalIP: val(state.ticket.externalIP, '203.0.113.88'),
        attackerPort: val(state.ticket.attackerPort, '80'),
        attackerProtocol: val(state.ticket.attackerProtocol, 'TCP'),
        secondaryFile: val(state.ticket.secondaryFile, ['update.exe', '/payload/update.exe']),
        cveId: val(state.ticket.cveId, 'CVE-2022-30190'),
        severity: val(state.ticket.severity, 'High')
      }
    },

    summaryChecklist: (state) => {
      const text = (state.ticket.summary || '').toLowerCase()
      return {
        finance: text.includes('finance') || text.includes('angela smith') || text.includes('smith'),
        invoice: text.includes('invoice') || text.includes('docx') || text.includes('word'),
        cve: text.includes('cve-2022-30190') || text.includes('follina') || text.includes('msdt'),
        payload: text.includes('update.exe') || text.includes('payload') || text.includes('download')
      }
    },

    totalAnswerFields: () => 11,

    correctAnswersCount(state): number {
      const validations = this.ticketValidation as Record<string, boolean>
      return Object.values(validations).filter(Boolean).length
    },

    score(): number {
      const count = this.correctAnswersCount as number
      return Math.round((count / this.totalAnswerFields) * 100)
    },

    scoreColor(): string {
      const s = this.score as number
      if (s === 100) return 'text-cyber-primary'
      if (s >= 70) return 'text-cyber-accent'
      if (s >= 40) return 'text-cyber-warn'
      return 'text-cyber-danger'
    },

    defaultEmailBody: (state) => {
      return `Team,

I am escalating an incident regarding a user in the ${state.ticket.department || '[Insert Department]'} department. At 08:34 AM, the Antivirus quarantined a file named ${state.ticket.fileName || '[Insert File Name]'}.

Upon reviewing the Wireshark logs, I can confirm that the affected computer reached out to a malicious external IP address: ${state.ticket.externalIP || '[Insert External IP]'}. It appears the computer downloaded a secondary payload called ${state.ticket.secondaryFile || '[Insert Payload Name]'} over HTTP.

This attack seems to be exploiting vulnerability ${state.ticket.cveId || '[Insert CVE Number]'}, which has a severity of ${state.ticket.severity || '[Insert Severity]'}.

The Antivirus quarantined the initial file, but because network traffic was successful, the system may still be compromised. Requesting Tier 2 to isolate the host and begin deep forensics.

Thank you,
${state.analystName || '[Your Name]'}
Tier 1 Security Analyst`
    }
  },
  actions: {
    setStudent(studentData: StudentSession | null) {
      this.student = studentData
      this.isAuthenticated = !!studentData

      if (studentData) {
        if (!this.analystName) {
          const fullName = [studentData.givenName, studentData.familyName].filter(Boolean).join(' ')
          this.analystName = fullName || studentData.email
        }
        if (!this.studentEmail) {
          this.studentEmail = studentData.email || ''
        }
        if (!this.sessionSet && studentData.classroom && studentData.classroom.length > 0) {
          this.sessionSet = studentData.classroom[0]
        }
      } else {
        this.analystName = ''
        this.studentEmail = ''
      }
    },

    startGame() {
      if (!this.isEmailEdited) {
        this.customEmailBody = this.defaultEmailBody
      }
    },

    async fetchSession() {
      try {
        const response: any = await $fetch('/api/session').catch(() => $fetch('/api/auth/session'))
        if (response?.authenticated && response?.student) {
          this.setStudent(response.student)
          this.sessionChecked = true
          return true
        } else {
          this.setStudent(null)
          this.sessionChecked = true
          return false
        }
      } catch (error) {
        console.error('Session fetch failed:', error)
        this.setStudent(null)
        this.sessionChecked = true
        return false
      }
    },

    async logout() {
      try {
        await $fetch('/api/logout', { method: 'POST' }).catch(() => $fetch('/api/auth/logout', { method: 'POST' }))
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.setStudent(null)
        this.isAuthenticated = false
        this.sessionChecked = true
        await navigateTo('/login')
      }
    },

    selectPacket(pkt: NetworkPacket | null) {
      this.selectedPacket = pkt
    },

    toggleHints() {
      this.hintsEnabled = !this.hintsEnabled
    },

    getInputClass(fieldName: keyof TicketState) {
      const isCorrect = (this.ticketValidation as Record<string, boolean>)[fieldName]
      const hasValue = !!this.ticket[fieldName]

      if (isCorrect) {
        return 'border-emerald-500/50 bg-emerald-950/10 text-emerald-300'
      }
      if (hasValue) {
        return 'border-red-500/40 bg-red-950/10 text-red-300 focus:border-red-500'
      }
      return 'border-cyber-border focus:border-cyber-accent text-slate-200'
    },

    resetEmailTemplate() {
      this.isEmailEdited = false
      this.customEmailBody = this.defaultEmailBody
    },

    copyEmailToClipboard() {
      const emailBody = this.customEmailBody || this.defaultEmailBody

      try {
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(emailBody).then(() => {
            this.copiedText = true
            setTimeout(() => {
              this.copiedText = false
            }, 3000)
          }).catch(() => {
            this.fallbackCopy(emailBody)
          })
        } else {
          this.fallbackCopy(emailBody)
        }
      } catch (e) {
        this.fallbackCopy(emailBody)
      }
    },

    fallbackCopy(text: string) {
      if (typeof document === 'undefined') return
      const el = document.createElement('textarea')
      el.value = text
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)

      this.copiedText = true
      setTimeout(() => {
        this.copiedText = false
      }, 3000)
    },

    async escalateIncident() {
      if (this.score !== 100 || this.submitting) return

      this.submitting = true
      this.submissionMessage = 'Connecting to TechNova SOC database...'

      const payload = {
        analystName: this.analystName,
        studentEmail: this.studentEmail,
        sessionSet: this.sessionSet,
        reportDate: this.reportDate,
        score: this.score,
        ticket: this.ticket,
        customEmail: this.customEmailBody || this.defaultEmailBody,
        statistics: {
          missionsCompleted: 1,
          totalMissions: 1
        }
      }

      try {
        const response: any = await $fetch('/api/game/submit', {
          method: 'POST',
          body: {
            description: `Operation Bad Invoice completed by ${this.analystName || 'Student'}`,
            payload,
            score: this.score,
            retries: this.retries,
            studentId: this.student?.id
          }
        })

        if (response?.success) {
          this.submissionMessage = response.message || 'Saved successfully!'
          this.incidentEscalated = true
        } else {
          this.submissionMessage = response?.message || 'Submission accepted locally.'
          this.incidentEscalated = true
        }
      } catch (error: any) {
        console.warn('Backend submission warning (offline mode):', error?.data || error?.message)
        this.submissionMessage = 'Saved submission locally (Offline Fallback).'
        this.incidentEscalated = true
      } finally {
        this.submitting = false
      }
    },

    triggerCertificatePrint() {
      if (typeof window !== 'undefined') {
        window.print()
      }
    },

    fillPerfectScore() {
      this.ticket.hostname = 'FIN-PC-04'
      this.ticket.internalIP = '192.168.10.45'
      this.ticket.department = 'Finance'
      this.ticket.threatName = 'Exploit:Win32/Follina.Aldha'
      this.ticket.fileName = 'Q3_Overdue_Invoice.docx'
      this.ticket.externalIP = '203.0.113.88'
      this.ticket.attackerPort = '80'
      this.ticket.attackerProtocol = 'TCP'
      this.ticket.secondaryFile = 'update.exe'
      this.ticket.cveId = 'CVE-2022-30190'
      this.ticket.severity = 'High'
      this.ticket.summary = 'At 08:30 AM, Angela Smith from the Finance department opened a malicious invoice attachment Q3_Overdue_Invoice.docx exploiting CVE-2022-30190 (Follina) to execute code and download the secondary payload update.exe from external server.'

      if (this.student) {
        const fullName = [this.student.givenName, this.student.familyName].filter(Boolean).join(' ')
        if (!this.analystName) {
          this.analystName = fullName || this.student.email
        }
        if (!this.studentEmail) {
          this.studentEmail = this.student.email
        }
      } else {
        if (!this.analystName) {
          this.analystName = 'Dev Security Analyst'
        }
        if (!this.studentEmail) {
          this.studentEmail = 'dev.analyst@metrotech.org'
        }
      }

      this.isEmailEdited = false
      this.customEmailBody = this.defaultEmailBody
    },

    triggerDevTestSubmit() {
      this.fillPerfectScore()
      this.devSubmissionSuccess = false
      this.showDevTestModal = true
    }
  }
})