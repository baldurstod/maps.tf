package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"io/fs"
	"log"
	"maps.tf"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

func startServer(config HTTP) {
	engine := initEngine(config)

	log.Printf("Listening on port %d\n", config.Port)
	err := engine.RunTLS(":"+strconv.Itoa(config.Port), config.HttpsCertFile, config.HttpsKeyFile)
	log.Fatal(err)
}

func initEngine(config HTTP) *gin.Engine {
	if ReleaseMode == "true" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.SetTrustedProxies(nil)

	r.Use(cors.New(cors.Config{
		AllowMethods:    []string{"POST", "OPTIONS"},
		AllowHeaders:    []string{"Origin", "Content-Length", "Content-Type", "Request-Id"},
		AllowAllOrigins: true,
		MaxAge:          12 * time.Hour,
	}))

	var useFS fs.FS
	var assetsFs = &assets.Assets

	if ReleaseMode == "true" {
		fsys := fs.FS(assetsFs)
		useFS, _ = fs.Sub(fsys, "build/client")
	} else {
		useFS = os.DirFS("build/client")
	}

	r.Use(rewriteURL(r))
	r.StaticFS("/", http.FS(useFS))

	return r
}

func rewriteURL(r *gin.Engine) gin.HandlerFunc {
	return func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/@") {
			c.Request.URL.Path = "/"
			r.HandleContext(c)
		}
		c.Next()
	}
}
