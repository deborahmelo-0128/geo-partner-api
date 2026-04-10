# 🚀 Geo Partner API

API desenvolvida para gerenciamento de parceiros com suporte a geolocalização utilizando PostGIS.

---

## 📦 Tecnologias

* Node.js
* TypeScript
* PostgreSQL
* PostGIS
* Docker
* Express

---

## ▶️ Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <seu-repo>
cd geo-partner-api
```

---

### 2. Subir o banco com Docker

```bash
docker compose up -d
```

---

### 3. Instalar dependências

```bash
npm install
```

---

### 4. Rodar o projeto

```bash
npm run dev
```

---

## 🗄️ Banco de Dados

Certifique-se de criar a tabela:

```sql
CREATE TABLE partners (
  id TEXT PRIMARY KEY,
  trading_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  document TEXT UNIQUE NOT NULL,
  coverage_area GEOMETRY(MULTIPOLYGON, 4326),
  address GEOMETRY(POINT, 4326)
);
```

---

## 📌 Endpoints

### ➕ Criar parceiro

POST /partners

```json
{
  "id": "1",
  "tradingName": "Adega Teste",
  "ownerName": "João",
  "document": "123456789",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [[
        [-47, -22],
        [-46, -22],
        [-46, -21],
        [-47, -21],
        [-47, -22]
      ]]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [-46.57421, -21.785741]
  }
}
```

---

### 🔍 Buscar parceiro por ID

GET /partners/:id

---

### 📍 Buscar parceiro por localização

GET /search?lat={lat}&lng={lng}

---

## 🧠 Regras implementadas

* Documento único
* ID único
* Busca baseada em geolocalização
* Retorno do parceiro mais próximo dentro da área de cobertura

---

## 📌 Observações

* Utiliza funções do PostGIS como:

  * ST_Contains
  * ST_Distance
  * ST_GeomFromGeoJSON

---

## 👩‍💻 Autor

Projeto desenvolvido para desafio técnico backend.
