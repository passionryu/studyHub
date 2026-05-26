package com.studyhub.server.application.member

class DuplicateMemberEmailException(
    val email: String,
) : RuntimeException("이미 가입된 이메일입니다.")
