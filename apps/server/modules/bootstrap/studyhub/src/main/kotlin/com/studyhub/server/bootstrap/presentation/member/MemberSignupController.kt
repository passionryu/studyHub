package com.studyhub.server.bootstrap.presentation.member

import com.studyhub.server.application.member.RegisterMemberCommand
import com.studyhub.server.application.member.RegisterMemberService
import jakarta.validation.Valid
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/members")
class MemberSignupController(
    private val registerMemberService: RegisterMemberService,
) {
    @PostMapping("/signup")
    fun signUp(
        @Valid @RequestBody request: MemberSignupRequest,
    ): ResponseEntity<MemberSignupResponse> {
        val result = registerMemberService.registerMember(request.toCommand())

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(
                MemberSignupResponse(
                    memberId = result.memberId,
                    name = result.name,
                    email = result.email,
                ),
            )
    }
}

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

data class MemberSignupResponse(
    val memberId: Long,
    val name: String,
    val email: String,
)
