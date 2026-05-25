package com.studyhub.server.bootstrap

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.studyhub.server"])
class StudyHubApplication

fun main(args: Array<String>) {
    runApplication<StudyHubApplication>(*args)
}
