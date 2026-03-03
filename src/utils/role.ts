export const ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    USER: "user",
    GUEST: "guest",
}
export const PERMISSIONS = {
    VIEW_DASHBOARD: "view_dashboard",
    ADD_PRODUCT: "add_product",
    VIEW_PRODUCT: "view_product",
}

export const ROLES_PERMISSIONS: Record<string, string[]> = {
    [ROLES.ADMIN]: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_PRODUCT],
    [ROLES.MANAGER]: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.ADD_PRODUCT, PERMISSIONS.VIEW_PRODUCT],
    [ROLES.USER]: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_PRODUCT],
}