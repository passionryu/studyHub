package com.studyhub.server.infrastructure.persistence.member

import com.studyhub.server.application.member.port.MemberRepository
import com.studyhub.server.domain.member.Member
import org.springframework.stereotype.Repository

@Repository
class MemberRepositoryAdapter(
    private val memberJpaRepository: MemberJpaRepository,
) : MemberRepository {
    override fun existsByEmail(email: String): Boolean =
        memberJpaRepository.existsByEmail(email)

    override fun save(member: Member): Member =
        memberJpaRepository.save(member.toJpaEntity()).toDomain()

    private fun Member.toJpaEntity(): MemberJpaEntity =
        MemberJpaEntity(
            id = id,
            name = name,
            email = email,
            encodedPassword = encodedPassword,
            phone = phone,
            interests = interests.toMutableList(),
        )
}
