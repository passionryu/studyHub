package com.studyhub.server.application.member

class DuplicateMemberEmailException(
    val email: String,
) : RuntimeException("이미 동일한 E-mail로 등록한 회원이 있습니다.")
