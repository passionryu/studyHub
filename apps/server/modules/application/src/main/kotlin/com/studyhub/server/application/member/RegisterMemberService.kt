package com.studyhub.server.application.member

import com.studyhub.server.application.member.port.MemberPasswordHasher
import com.studyhub.server.application.member.port.MemberRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class RegisterMemberService(
    private val memberEmailDuplicateChecker: MemberEmailDuplicateChecker,
    private val memberRegistrationFactory: MemberRegistrationFactory,
    private val memberPasswordHasher: MemberPasswordHasher,
    private val memberRepository: MemberRepository,
    private val registerMemberResultMapper: RegisterMemberResultMapper,
) {
    @Transactional
    fun registerMember(command: RegisterMemberCommand): RegisterMemberResult {
        memberEmailDuplicateChecker.validateEmailCanBeUsed(command.email)

        val encodedPassword = memberPasswordHasher.hashMemberPassword(command.password)

        val member = memberRegistrationFactory.createRegisteringMember(
            name = command.name,
            email = command.email,
            encodedPassword = encodedPassword,
            phone = command.phone,
            interests = command.interests,
        )

        val registeredMember = memberRepository.save(member)

        return registerMemberResultMapper.mapRegisteredMember(registeredMember)
    }
}
