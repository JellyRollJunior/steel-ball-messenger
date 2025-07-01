const logout = (navigate) => {
    localStorage.removeItem('token');
    navigate('/login');
}

export { logout };