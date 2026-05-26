package com.studyhub.server.application.member

import com.studyhub.server.application.member.port.MemberPasswordHasher
import com.studyhub.server.application.member.port.MemberRepository
import com.studyhub.server.domain.member.Member
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class RegisterMemberServiceTest {
    @Test
    fun `register member stores encoded password`() {
        val repository = FakeMemberRepository()
        val service = RegisterMemberService(
            memberEmailDuplicateChecker = MemberEmailDuplicateChecker(repository),
            memberPasswordHasher = FixedPasswordHasher(),
            memberRepository = repository,
        )

        val result = service.registerMember(
            RegisterMemberCommand(
                name = "Ryu",
                email = "ryu@example.com",
                password = "password123",
                phone = null,
                interests = listOf("Kotlin"),
            ),
        )

        assertEquals(1L, result.memberId)
        assertEquals("encoded-password", repository.savedMember?.encodedPassword)
    }

    @Test
    fun `register member rejects duplicated email`() {
        val repository = FakeMemberRepository(existingEmails = setOf("ryu@example.com"))
        val service = RegisterMemberService(
            memberEmailDuplicateChecker = MemberEmailDuplicateChecker(repository),
            memberPasswordHasher = FixedPasswordHasher(),
            memberRepository = repository,
        )

        assertFailsWith<DuplicateMemberEmailException> {
            service.registerMember(
                RegisterMemberCommand(
                    name = "Ryu",
                    email = "ryu@example.com",
                    password = "password123",
                    phone = null,
                    interests = emptyList(),
                ),
            )
        }
    }
}

private class FixedPasswordHasher : MemberPasswordHasher {
    override fun hashMemberPassword(rawPassword: String): String = "encoded-password"
}

private class FakeMemberRepository(
    private val existingEmails: Set<String> = emptySet(),
) : MemberRepository {
    var savedMember: Member? = null

    override fun existsByEmail(email: String): Boolean = existingEmails.contains(email)

    override fun save(member: Member): Member {
        val saved = member.copy(id = 1L)
        savedMember = saved
        return saved
    }
}
