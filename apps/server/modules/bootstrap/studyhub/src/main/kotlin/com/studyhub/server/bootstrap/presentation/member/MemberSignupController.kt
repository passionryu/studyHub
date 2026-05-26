package com.studyhub.server.bootstrap.presentation.member

import com.studyhub.server.application.member.RegisterMemberService
import io.swagger.v3.oas.annotations.Operation
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
    @Operation(
        summary = "회원가입",
        description = "이름, 이메일, 비밀번호, 선택 전화번호, 관심 영역을 입력받아 새 회원 계정을 생성합니다.",
    )
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
