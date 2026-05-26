package com.studyhub.server.bootstrap.config

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.Import
import org.springframework.stereotype.Controller
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.header
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.web.bind.annotation.PostMapping

@WebMvcTest(controllers = [CorsTestController::class])
@Import(WebCorsConfiguration::class)
class WebCorsConfigurationTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `localhost 3000 web origin can send signup preflight request`() {
        mockMvc.perform(
            options("/api/cors-test")
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "POST")
                .header("Access-Control-Request-Headers", "content-type"),
        )
            .andExpect(status().isOk)
            .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"))
            .andExpect(header().string("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS"))
    }
}

@Controller
class CorsTestController {
    @PostMapping("/api/cors-test")
    fun post() {
    }
}
