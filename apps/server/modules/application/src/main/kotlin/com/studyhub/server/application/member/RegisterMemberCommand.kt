package com.studyhub.server.application.member

data class RegisterMemberCommand(
    val name: String,
    val email: String,
    val password: String,
    val phone: String?,
    val interests: List<String>,
)
