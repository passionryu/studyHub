package com.studyhub.server.bootstrap.presentation.member

import com.studyhub.server.application.member.RegisterMemberService
import jakarta.validation.Valid
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
