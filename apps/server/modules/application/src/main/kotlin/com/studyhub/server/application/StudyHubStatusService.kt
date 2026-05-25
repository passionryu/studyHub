package com.studyhub.server.application

import com.studyhub.server.domain.StudyHubStatus
import org.springframework.stereotype.Service

@Service
class StudyHubStatusService {
    // StudyHub 서버가 요청을 받을 수 있는 기본 상태인지 확인한다.
    fun readStatus(): StudyHubStatus =
        StudyHubStatus(
            serviceName = "studyHub",
            status = "UP",
        )
}
