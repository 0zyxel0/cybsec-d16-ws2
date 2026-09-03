export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // If the body is already in the game format:
  if (body.description !== undefined || body.payload !== undefined) {
    const handler = (await import('./game/submit.post')).default
    return handler(event)
  }

  // Otherwise, if the body is in the legacy submit format:
  const { analystName, studentEmail, sessionSet, reportDate, score, ticket, customEmail } = body
  const payload = {
    analystName: analystName || '',
    studentEmail: studentEmail || '',
    sessionSet: sessionSet || '',
    reportDate: reportDate || new Date().toISOString().slice(0, 10),
    score: score || 0,
    ticket: ticket || {},
    customEmail: customEmail || '',
    statistics: {
      missionsCompleted: 1,
      totalMissions: 1
    }
  }

  const handler = (await import('./game/submit.post')).default
  event.node.req.body = {
    description: `Operation Bad Invoice completed by ${analystName || 'Student'}`,
    payload,
    score: score || 100,
    retries: 1
  }
  return handler(event)
})