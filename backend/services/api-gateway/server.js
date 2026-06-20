require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    createProxyMiddleware
} = require("http-proxy-middleware");

const app = express();

app.use(cors());


// AUTH SERVICE
app.use(
    "/auth/api",
    createProxyMiddleware({
        target: "http://auth-service:5001",
        changeOrigin: true,
        pathRewrite: {
            "^/api/auth": "/auth/api"
        }
    })
);


// ADMIN SERVICE
app.use(
    "/admin/api",
    createProxyMiddleware({
        target: "http://admin-service:5008",
        changeOrigin: true
    })
);


// SONG SERVICE
app.use(
    "/songs/api",
    createProxyMiddleware({
        target: "http://song-service:5002",
        changeOrigin: true
    })
);


// ALBUM SERVICE
app.use(
    "/albums/api",
    createProxyMiddleware({
        target: "http://album-service:5003",
        changeOrigin: true
    })
);


// VIDEO SERVICE
app.use(
    "/videos/api",
    createProxyMiddleware({
        target: "http://video-service:5004",
        changeOrigin: true
    })
);


// GALLERY SERVICE
app.use(
    "/gallery/api",
    createProxyMiddleware({
        target: "http://gallery-service:5005",
        changeOrigin: true
    })
);


// CONTACT SERVICE
app.use(
    "/contact/api",
    createProxyMiddleware({
        target: "http://contact-service:5006",
        changeOrigin: true
    })
);


// NOTIFICATION SERVICE
app.use(
    "/notifications/api",
    createProxyMiddleware({
        target: "http://notification-service:5007",
        changeOrigin: true
    })
);


app.listen(process.env.PORT, () => {

    console.log(
        `API Gateway running on ${process.env.PORT}`
    );

});