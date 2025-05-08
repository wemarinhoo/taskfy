# Imagem Python base
FROM python:3.10-slim

# Diretório de trabalho
WORKDIR /app

# Copia primeiro os arquivos de dependências para aproveitar o cache de camadas
COPY requirements.txt .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o conteúdo da pasta backend para o container
COPY . .

# Expõe a porta que o FastAPI roda (8000)
EXPOSE 8000

# Comando para rodar a aplicação com Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]