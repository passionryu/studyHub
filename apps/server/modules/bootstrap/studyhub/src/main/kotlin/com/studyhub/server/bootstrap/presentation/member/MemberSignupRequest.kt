package com.studyhub.server.bootstrap.presentation.member

import com.studyhub.server.application.member.RegisterMemberCommand
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class MemberSignupRequest(
    @field:NotBlank
    val name: String,

    @field:Email
    @field:NotBlank
    val email: String,

    @field:Size(min = 8)
    val password: String,

    val phone: String? = null,

    val interests: List<String> = emptyList(),
) {
    fun toCommand(): RegisterMemberCommand =
        RegisterMemberCommand(
            name = name,
            email = email,
            password = password,
            phone = phone,
            interests = interests,
        )
}
