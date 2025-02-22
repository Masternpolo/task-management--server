exports.generateAccessToken = (user) => {
    return jwt.sign(
        { "id": user.id, "username": user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { "expiresIn": "15m" }
    )
}

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        { "id": user.id, "username": user.username, },
        process.env.REFRESH_TOKEN_SECRET,
        { "expiresIn": "1h" }
    )
}

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Unauthorized: Invalid token' });
        }
        req.user = user;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (user && user.role === 'admin') {
        next()
    } else {
        res.status(403).json({ 
            status: "faile",
            message: "You're not an admin" });
    }

}