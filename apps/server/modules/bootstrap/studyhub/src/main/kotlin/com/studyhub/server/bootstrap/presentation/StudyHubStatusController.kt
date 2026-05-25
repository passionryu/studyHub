package com.studyhub.server.bootstrap.presentation

import com.studyhub.server.application.StudyHubStatusService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/status")
class StudyHubStatusController(
    private val studyHubStatusService: StudyHubStatusService,
) {
    @GetMapping
    fun readStatus(): StudyHubStatusResponse {
        val status = studyHubStatusService.readStatus()

        return StudyHubStatusResponse(
            serviceName = status.serviceName,
            status = status.status,
        )
    }
}

data class StudyHubStatusResponse(
    val serviceName: String,
    val status: String,
)
