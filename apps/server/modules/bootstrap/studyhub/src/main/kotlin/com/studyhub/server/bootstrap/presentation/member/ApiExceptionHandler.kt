package com.studyhub.server.bootstrap.presentation.member

import com.studyhub.server.application.member.DuplicateMemberEmailException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ApiExceptionHandler {
    @ExceptionHandler(DuplicateMemberEmailException::class)
    fun handleDuplicateMemberEmail(exception: DuplicateMemberEmailException): ResponseEntity<ApiErrorResponse> =
        ResponseEntity.status(HttpStatus.CONFLICT)
            .body(ApiErrorResponse(message = exception.message ?: "이미 가입된 이메일입니다."))

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleInvalidRequest(exception: MethodArgumentNotValidException): ResponseEntity<ApiErrorResponse> =
        ResponseEntity.badRequest()
            .body(ApiErrorResponse(message = "요청 값을 확인해주세요."))

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgument(exception: IllegalArgumentException): ResponseEntity<ApiErrorResponse> =
        ResponseEntity.badRequest()
            .body(ApiErrorResponse(message = exception.message ?: "요청 값을 확인해주세요."))
}

data class ApiErrorResponse(
    val message: String,
)
