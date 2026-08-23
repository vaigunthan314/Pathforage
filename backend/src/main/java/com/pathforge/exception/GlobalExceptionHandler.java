package com.pathforge.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ResponseEntity<Map<String, String>> handleOptimisticLock(OptimisticLockingFailureException ex) {
        log.warn("OptimisticLockingFailure: {}", ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(Map.of(
                "error", "This update conflicts with a concurrent change. Please retry.",
                "status", "conflict"
            ));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        log.warn("IllegalArgumentException: {}", ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(Map.of(
                "error", ex.getMessage() != null ? ex.getMessage() : "Invalid request",
                "status", "error"
            ));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        log.error("RuntimeException — class={}, message={}, root={}: {}",
                ex.getClass().getSimpleName(), ex.getMessage(),
                ex.getCause() != null ? ex.getCause().getClass().getSimpleName() : "none",
                ex.getCause() != null ? ex.getCause().getMessage() : "none", ex);
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(Map.of(
                "error", ex.getMessage() != null ? ex.getMessage() : "Request failed",
                "status", "error"
            ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception ex) {
        log.error("UNCAUGHT Exception — class={}, message={}, root={}: {}",
                ex.getClass().getSimpleName(), ex.getMessage(),
                ex.getCause() != null ? ex.getCause().getClass().getSimpleName() : "none",
                ex.getCause() != null ? ex.getCause().getMessage() : "none", ex);
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of(
                "error", "An unexpected error occurred",
                "status", "error"
            ));
    }
}
