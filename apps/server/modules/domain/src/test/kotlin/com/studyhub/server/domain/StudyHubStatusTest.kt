package com.studyhub.server.domain

import kotlin.test.Test
import kotlin.test.assertEquals

class StudyHubStatusTest {
    @Test
    fun `status exposes service health`() {
        val status = StudyHubStatus(serviceName = "studyHub", status = "UP")

        assertEquals("studyHub", status.serviceName)
        assertEquals("UP", status.status)
    }
}
