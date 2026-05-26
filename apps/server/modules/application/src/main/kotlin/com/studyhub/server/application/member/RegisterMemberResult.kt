package com.studyhub.server.application.member

import com.studyhub.server.domain.member.Member

data class RegisterMemberResult(
    val memberId: Long,
    val name: String,
    val email: String,
) {
    companion object {
        fun from(member: Member): RegisterMemberResult =
            RegisterMemberResult(
                memberId = requireNotNull(member.id),
                name = member.name,
                email = member.email,
            )
    }
}
