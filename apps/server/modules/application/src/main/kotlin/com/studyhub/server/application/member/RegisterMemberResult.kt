package com.studyhub.server.application.member

data class RegisterMemberResult(
    val memberId: Long,
    val name: String,
    val email: String,
)
