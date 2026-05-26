package com.studyhub.server.application.member

import com.studyhub.server.application.member.port.MemberPasswordHasher
import com.studyhub.server.application.member.port.MemberRepository
import com.studyhub.server.domain.member.Member
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class RegisterMemberService(
    private val memberEmailDuplicateChecker: MemberEmailDuplicateChecker,
    private val memberPasswordHasher: MemberPasswordHasher,
    private val memberRepository: MemberRepository,
) {
    @Transactional
    fun registerMember(command: RegisterMemberCommand): RegisterMemberResult {
        memberEmailDuplicateChecker.validateEmailCanBeUsed(command.email)

        val encodedPassword = memberPasswordHasher.hashMemberPassword(command.password)

        val member = Member.register(
            name = command.name,
            email = command.email,
            encodedPassword = encodedPassword,
            phone = command.phone,
            interests = command.interests,
        )

        val registeredMember = memberRepository.save(member)

        return RegisterMemberResult.from(registeredMember)
    }
}
