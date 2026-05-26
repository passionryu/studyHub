package com.studyhub.server.infrastructure.persistence.member

import com.studyhub.server.domain.member.Member
import jakarta.persistence.CollectionTable
import jakarta.persistence.Column
import jakarta.persistence.ElementCollection
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.Table
import jakarta.persistence.UniqueConstraint

@Entity
@Table(
    name = "members",
    uniqueConstraints = [
        UniqueConstraint(name = "uk_members_email", columnNames = ["email"]),
    ],
)
class MemberJpaEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val email: String,

    @Column(nullable = false)
    val encodedPassword: String,

    @Column
    val phone: String?,

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "member_interests",
        joinColumns = [JoinColumn(name = "member_id")],
    )
    @Column(name = "interest", nullable = false)
    val interests: MutableList<String> = mutableListOf(),
) {
    fun toDomain(): Member =
        Member(
            id = id,
            name = name,
            email = email,
            encodedPassword = encodedPassword,
            phone = phone,
            interests = interests.toList(),
        )

    companion object {
        fun from(member: Member): MemberJpaEntity =
            MemberJpaEntity(
                id = member.id,
                name = member.name,
                email = member.email,
                encodedPassword = member.encodedPassword,
                phone = member.phone,
                interests = member.interests.toMutableList(),
            )
    }
}
