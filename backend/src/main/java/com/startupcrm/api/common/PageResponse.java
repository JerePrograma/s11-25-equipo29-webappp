// src/main/java/com/startupcrm/api/common/PageResponse.java
package com.startupcrm.api.common;

import java.util.List;

public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {}