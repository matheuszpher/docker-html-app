# Comando utilizados:

1. Build da imagem Docker
docker build -t app-html-vol .

2. Executar o container pela primeira vez
docker run -d -p 8080:3000 --name html-test app-html-vol

3. Rebuild da imagem após ajustes
docker build -t app-html-vol .

4. Remover o container antigo (parar e remover)
docker rm html-test


Como o container estava em execução, foi necessário parar antes:

docker stop html-test
docker rm html-test

5. Executar novamente o container
docker run -d -p 8080:3000 --name html-test app-html-vol