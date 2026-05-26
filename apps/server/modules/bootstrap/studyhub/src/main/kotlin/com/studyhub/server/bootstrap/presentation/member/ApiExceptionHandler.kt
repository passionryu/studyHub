package com.studyhub.server.bootstrap.presentation.member

import com.studyhub.server.application.member.DuplicateMemberEmailException
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ApiExceptionHandler {
    private val logger = LoggerFactory.getLogger(javaClass)

    @ExceptionHandler(DuplicateMemberEmailException::class)
    fun handleDuplicateMemberEmail(exception: DuplicateMemberEmailException): ResponseEntity<ApiErrorResponse> {
        logger.warn(
            "[회원 가입] 회원 가입 이메일 중복 검증 실패. " +
                "who=email:${exception.email.toMaskedEmail()}, " +
                "what=POST /api/members/signup, " +
                "requestData=email:${exception.email.toMaskedEmail()}, " +
                "reason=message:${exception.message}"
        )

        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(ApiErrorResponse(message = "이미 가입된 이메일입니다. 다른 이메일로 가입해주세요."))
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleInvalidRequest(exception: MethodArgumentNotValidException): ResponseEntity<ApiErrorResponse> {
        logger.warn(
            "[회원 가입] 회원 가입 요청 값 검증 실패. " +
                "who=anonymous, " +
                "what=POST /api/members/signup, " +
                "requestData=validationFields:${exception.bindingResult.fieldErrors.map { it.field }.distinct()}, " +
                "reason=message:invalid_request"
        )

        return ResponseEntity.badRequest()
            .body(ApiErrorResponse(message = "입력한 회원가입 정보를 다시 확인해주세요."))
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgument(exception: IllegalArgumentException): ResponseEntity<ApiErrorResponse> {
        logger.warn(
            "[회원 가입] 회원 가입 정책 검증 실패. " +
                "who=anonymous, " +
                "what=POST /api/members/signup, " +
                "requestData=omitted, " +
                "reason=message:${exception.message}"
        )

        return ResponseEntity.badRequest()
            .body(ApiErrorResponse(message = "입력한 회원가입 정보를 다시 확인해주세요."))
    }

    private fun String.toMaskedEmail(): String {
        val parts = split("@", limit = 2)
        if (parts.size != 2) {
            return "***"
        }
        val local = parts[0]
        val domain = parts[1]
        val visible = local.take(2)
        return "$visible***@$domain"
    }
}
