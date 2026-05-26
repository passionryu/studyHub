package com.studyhub.server.bootstrap.presentation.member

data class MemberSignupResponse(
    val memberId: Long,
    val name: String,
    val email: String,
)
