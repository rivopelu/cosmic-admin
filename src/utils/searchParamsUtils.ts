export function buildSearchParams(filterData: Record<string, any>) {
    const params = new URLSearchParams();

    Object.entries(filterData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            params.set(key, String(value));
        }
    });

    return params;
}

export function buildQueryString(params: URLSearchParams) {
    return '?' + params.toString();
}
