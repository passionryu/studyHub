package com.studyhub.server.application.member

class DuplicateMemberEmailException(
    val email: String,
) : RuntimeException("Duplicated member email")
