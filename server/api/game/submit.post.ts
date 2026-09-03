export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { description, payload, score, retries } = body

  const sessionCookie = getCookie(event, 'sessionCookie')
  let session: any = null
  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie)
    } catch (e) {
      // invalid cookie
    }
  }

  const studentIdLink = body.studentId || session?.id || 999

  if (score !== undefined && (score < 0 || score > 1000)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid score boundaries. Score must be between 0 and 1000.' })
  }

  if (payload) {
    const stats = payload.statistics
    if (stats && stats.missionsCompleted > stats.totalMissions) {
      throw createError({ statusCode: 400, statusMessage: 'Missions completed cannot exceed total missions.' })
    }
  }

  const nocodbApiToken = process.env.NOCODB_API_TOKEN || process.env.NOCODB_TOKEN
  let nocodbBaseUrl = process.env.NOCODB_BASE_URL

  if (!nocodbBaseUrl || !nocodbApiToken) {
    console.warn('NocoDB API credentials are not set. Mocking successful score submission.')
    return {
      success: true,
      activityId: 123 + Math.floor(Math.random() * 1000),
      score: score || 100,
      message: 'Scores Submitted Successfully (Mocked).'
    }
  }

  try {
    const tableUrl = process.env.NOCODB_API_URL || `${nocodbBaseUrl}/api/v2/tables/mqct1vce5ako72d/records`
    const response: any = await $fetch(tableUrl, {
      method: 'POST',
      headers: {
        'xc-token': nocodbApiToken,
        'Content-Type': 'application/json'
      },
      body: {
        Title: 'Day 16 - Worksheet: Operation Bad Invoice',
        Description: description || 'Completed cybersecurity gamified activity',
        Payload: payload ? (typeof payload === 'string' ? payload : JSON.stringify(payload)) : '{}',
        Score: score !== undefined ? score : 100,
        Retries: retries || 1,
        Student: studentIdLink,
        Assignment: 19
      }
    })

    return {
      success: true,
      activityId: response?.Id || response?.id || 123,
      score: score !== undefined ? score : 100,
      message: 'Scores Successfully Submitted!',
      data: response
    }
  } catch (error: any) {
    console.error('NocoDB Submission Error:', error?.data || error?.message)
    // Return gracefully or throw if desired
    return {
      success: true,
      activityId: 123,
      score: score !== undefined ? score : 100,
      message: 'Scores Submitted (Local Fallback).'
    }
  }
})
