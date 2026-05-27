package com.studyhub.server.application.member

import com.studyhub.server.domain.member.Member
import org.springframework.stereotype.Component

@Component
class MemberRegistrationFactory {
    // 회원 가입 입력값을 정규화한 뒤 신규 회원 도메인 객체를 생성한다.
    fun createRegisteringMember(
        name: String,
        email: String,
        encodedPassword: String,
        phone: String?,
        interests: List<String>,
    ): Member {
        require(name.isNotBlank()) { "회원 이름은 비어 있을 수 없습니다." }
        require(email.isNotBlank()) { "회원 이메일은 비어 있을 수 없습니다." }
        require(encodedPassword.isNotBlank()) { "회원 비밀번호 해시값은 비어 있을 수 없습니다." }

        return Member(
            name = name.trim(),
            email = email.trim().lowercase(),
            encodedPassword = encodedPassword,
            phone = phone?.trim()?.takeIf { it.isNotBlank() },
            interests = interests.map { it.trim() }.filter { it.isNotBlank() }.distinct(),
        )
    }
}
