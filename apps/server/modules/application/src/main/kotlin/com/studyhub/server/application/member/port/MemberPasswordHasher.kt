package com.studyhub.server.application.member.port

interface MemberPasswordHasher {
    fun hashMemberPassword(rawPassword: String): String
}
