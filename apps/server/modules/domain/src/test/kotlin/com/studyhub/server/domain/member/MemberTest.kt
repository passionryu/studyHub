package com.studyhub.server.domain.member

import kotlin.test.Test
import kotlin.test.assertEquals

class MemberTest {
    @Test
    fun `register member normalizes email and interests`() {
        val member = Member(
            name = "Ryu",
            email = "ryu@example.com",
            encodedPassword = "encoded",
            phone = null,
            interests = listOf("Kotlin", "Spring"),
        )

        assertEquals("ryu@example.com", member.email)
        assertEquals(listOf("Kotlin", "Spring"), member.interests)
    }
}
