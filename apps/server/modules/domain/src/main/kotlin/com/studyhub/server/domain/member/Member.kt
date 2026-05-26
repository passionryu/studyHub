package com.studyhub.server.domain.member

data class Member(
    val id: Long? = null,
    val name: String,
    val email: String,
    val encodedPassword: String,
    val phone: String?,
    val interests: List<String>,
)
