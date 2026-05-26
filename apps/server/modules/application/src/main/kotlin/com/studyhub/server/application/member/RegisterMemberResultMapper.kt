package com.studyhub.server.application.member

import com.studyhub.server.domain.member.Member
import org.springframework.stereotype.Component

@Component
class RegisterMemberResultMapper {
    // 등록된 회원 도메인 객체를 application 결과 모델로 변환한다.
    fun mapRegisteredMember(member: Member): RegisterMemberResult =
        RegisterMemberResult(
            memberId = requireNotNull(member.id),
            name = member.name,
            email = member.email,
        )
}
