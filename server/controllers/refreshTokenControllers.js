const { expressjwt: jwt } = require("express-jwt");

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = User.findOne({ refreshToken: refreshToken })
    if (!foundUser) return res.sendStatus(403); //Forbidden 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET,
            (err, decoded) => {
                if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
                const roles = Object.values(foundUser.roles)
                const accessToken = jwt.sign(
                    { 
                        "UserInfo": {
                            "email": decoded.email,
                            "roles": roles 
                        }
                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '10m' }
                );
                res.json(accessToken)
            }
        )

}

module.exports = { handleRefreshToken }