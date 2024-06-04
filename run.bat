cls
del .\dist\maps.tf.exe
go build -ldflags="-X main.ReleaseMode=false" -o dist/maps.tf.exe ./src/server/
.\dist\maps.tf.exe
