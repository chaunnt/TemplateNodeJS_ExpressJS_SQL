# TemplateNodeJS_ExpressJS_SQL
TemplateNodeJS_ExpressJS_SQL

# Docker build
docker build -f Dockerfile -t nodejserver:latest .
docker run -v -d -p 9999:4001 -t nodejserver:latest
