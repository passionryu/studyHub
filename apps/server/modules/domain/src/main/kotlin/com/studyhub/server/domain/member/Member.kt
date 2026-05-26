package com.studyhub.server.domain.member

data class Member(
    val id: Long? = null,
    val name: String,
    val email: String,
    val encodedPassword: String,
    val phone: String?,
    val interests: List<String>,
) {
    companion object {
        fun register(
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
}
