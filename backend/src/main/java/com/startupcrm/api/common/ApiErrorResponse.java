// src/main/java/com/startupcrm/api/common/ApiErrorResponse.java
package com.startupcrm.api.common;

import java.time.OffsetDateTime;
import java.util.List;

public record ApiErrorResponse(
        String message,
        String errorCode,
        int status,
        OffsetDateTime timestamp,
        List<String> details
) {}