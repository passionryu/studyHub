package com.studyhub.server.application.member

class DuplicateMemberEmailException(
    email: String,
) : RuntimeException("이미 가입된 이메일입니다: $email")
