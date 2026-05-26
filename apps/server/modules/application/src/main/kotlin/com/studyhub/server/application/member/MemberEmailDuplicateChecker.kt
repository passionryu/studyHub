package com.studyhub.server.application.member

import com.studyhub.server.application.member.port.MemberRepository
import org.springframework.stereotype.Component

@Component
class MemberEmailDuplicateChecker(
    private val memberRepository: MemberRepository,
) {
    // 이미 가입된 이메일로는 새 회원을 등록할 수 없으므로 중복 여부를 검증한다.
    fun validateEmailCanBeUsed(email: String) {
        if (memberRepository.existsByEmail(email.trim().lowercase())) {
            throw DuplicateMemberEmailException(email)
        }
    }
}
