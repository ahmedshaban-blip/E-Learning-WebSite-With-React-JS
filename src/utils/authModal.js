export function showLoginPrompt(currentPath = "/") {
    sessionStorage.setItem("authModalOpen", "1");
    sessionStorage.setItem("lastProtectedPath", currentPath);
    window.dispatchEvent(new CustomEvent("showLoginModal"));
}
