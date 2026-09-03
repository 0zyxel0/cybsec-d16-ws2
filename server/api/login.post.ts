import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body?.email?.trim()
  const password = body?.password

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and Password are required',
    })
  }

  const nocodbApiToken = process.env.NOCODB_API_TOKEN || process.env.NOCODB_TOKEN

  let nocodbBaseUrl = process.env.NOCODB_BASE_URL
  if (!nocodbBaseUrl && process.env.NOCODB_API_URL) {
    try {
      nocodbBaseUrl = new URL(process.env.NOCODB_API_URL).origin
    } catch {
      nocodbBaseUrl = ''
    }
  }

  const sessionMaxAge = 60 * 60 * 24 // 24 hours

  /**
   * Cookie options
   *
   * httpOnly:
   * The browser cannot access the cookie through JavaScript.
   *
   * sameSite:
   * Helps protect against CSRF.
   *
   * secure:
   * Cookie is only sent over HTTPS in production.
   */
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: sessionMaxAge,
    path: '/',
  }

  /**
   * Temporary mock login for development.
   */
  if (!nocodbBaseUrl || !nocodbApiToken) {
    console.warn(
      'NocoDB API credentials are not configured. Using mock login.'
    )

    const mockStudent = {
      id: 999,
      email,
      givenName: 'Junior Security',
      familyName: 'Analyst',
      studentNumber: '20260001',
      classroom: 'MockClass101',
    }

    const session = {
      id: mockStudent.id,
      email: mockStudent.email,
      givenName: mockStudent.givenName,
      familyName: mockStudent.familyName,
      studentNumber: mockStudent.studentNumber,
      classroom: mockStudent.classroom,
    }

    setCookie(
      event,
      'sessionCookie',
      JSON.stringify(session),
      cookieOptions
    )

    return {
      success: true,
      student: session,
    }
  }

  try {
   const studentTableId = 'mg6ra8dkmyrqlbx'

    const searchResponse: any = await $fetch(
      `${nocodbBaseUrl}/api/v2/tables/${studentTableId}/records`,
      {
        method: 'GET',

        headers: {
          'xc-token': nocodbApiToken,
        },

        query: {
          where: `(Email,eq,${email})~and(Password,eq,${password})`,
          limit: 1,
        },
      }
    )

    console.log('User Login Attempt:', email);
    console.log(JSON.stringify(searchResponse));

    if (
      !searchResponse?.list ||
      searchResponse.list.length === 0
    ) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      })
    }

    const student = searchResponse.list[0]

    /**
     * Only put the information needed by the application
     * into the session cookie.
     *
     * DO NOT put:
     * - Password
     * - resetPasswordToken
     * - Resume
     * - private student information
     * - NocoDB metadata
     */
    const session = {
      id: student.Id,
      email: student.Email,
      givenName: student.GivenName,
      middlename: student.Middlename,
      familyName: student.FamilyName,
      studentNumber: student.StudentNumber,
    }

    /**
     * Extract classroom IDs.
     *
     * NocoDB M2M fields can be returned in different formats,
     * so handle the common possibilities.
     */
    let classroom: string[] = []

    if (Array.isArray(student.Classroom)) {
      classroom = student.Classroom
        .map((item: any) => {
          if (typeof item === 'object') {
            return item.Id ?? item.id
          }

          return item
        })
        .filter(Boolean)
        .map(String)
    } else if (student.Classroom) {
      if (typeof student.Classroom === 'object') {
        const id =
          student.Classroom.Id ??
          student.Classroom.id

        if (id) {
          classroom = [String(id)]
        }
      } else {
        classroom = [String(student.Classroom)]
      }
    }

    /**
     * Add classroom information to the session.
     */
    const sessionData = {
      ...session,
      classroom,
    }

    /**
     * Main authentication cookie.
     */
    setCookie(
      event,
      'sessionCookie',
      JSON.stringify(sessionData),
      cookieOptions
    )

    return {
      success: true,
      student: sessionData,
    }
  } catch (error: any) {
    console.error('NocoDB Login Error:', error)

    /**
     * Preserve authentication errors.
     */
    if (
      error?.statusCode === 401 ||
      error?.statusCode === 400
    ) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection failed',
    })
  }
})