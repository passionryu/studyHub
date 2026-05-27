package com.studyhub.server.application.member.port

import com.studyhub.server.domain.member.Member

interface MemberRepository {
    fun existsByEmail(email: String): Boolean

    fun save(member: Member): Member
}
