package com.studyhub.server.application

import kotlin.test.Test
import kotlin.test.assertEquals

class StudyHubStatusServiceTest {
    @Test
    fun `read status returns up`() {
        val service = StudyHubStatusService()

        val status = service.readStatus()

        assertEquals("studyHub", status.serviceName)
        assertEquals("UP", status.status)
    }
}
