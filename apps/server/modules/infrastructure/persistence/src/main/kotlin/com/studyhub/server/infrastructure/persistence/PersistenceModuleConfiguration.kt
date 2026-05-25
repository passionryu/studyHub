package com.studyhub.server.infrastructure.persistence

import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@Configuration
@EntityScan(basePackages = ["com.studyhub.server.infrastructure.persistence"])
@EnableJpaRepositories(basePackages = ["com.studyhub.server.infrastructure.persistence"])
class PersistenceModuleConfiguration
