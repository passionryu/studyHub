package com.studyhub.server.application.member

import com.studyhub.server.application.member.port.MemberPasswordHasher
import org.springframework.stereotype.Component
import java.security.MessageDigest
import java.util.Base64

@Component
class Sha256MemberPasswordHasher : MemberPasswordHasher {
    // 평문 비밀번호를 그대로 저장하지 않기 위해 해시 문자열로 변환한다.
    override fun hashMemberPassword(rawPassword: String): String {
        require(rawPassword.length >= 8) { "비밀번호는 8자 이상이어야 합니다." }

        val digest = MessageDigest.getInstance("SHA-256")
            .digest(rawPassword.toByteArray(Charsets.UTF_8))

        return Base64.getEncoder().encodeToString(digest)
    }
}
