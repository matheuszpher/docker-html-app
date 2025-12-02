const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

app.use(express.json());

const DB_HOST = 'postgresdb'; 
const DB_USER = 'user';
const DB_PASS = 'password';
const DB_NAME = 'vendasdb';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres'
});


const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'produtos', 
  timestamps: true 
});


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com PostgreSQL estabelecida com sucesso.');
    
   
    await Produto.sync(); 
    console.log('✅ Modelos sincronizados com o banco de dados.');

    app.post('/item', async (req, res) => {
      try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto); 
      } catch (error) {
        res.status(400).send(error.message); 
      }
    });

    app.get('/items', async (req, res) => {
      try {
        const produtos = await Produto.findAll();
        res.json(produtos);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/item/:id', async (req, res) => {
      try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) return res.status(404).send('Produto não encontrado.');
        res.json(produto);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    

    app.delete('/item/:id', async (req, res) => {
      try {
          const result = await Produto.destroy({ where: { id: req.params.id } });
          if (result === 0) return res.status(404).send('Produto não encontrado para exclusão.');
          res.status(200).send('Produto excluído com sucesso.');
      } catch (error) {
          res.status(500).send(error.message);
      }
    });


    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`API de Vendas rodando na porta ${port}`);
    });

  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error.message);
    process.exit(1); 
  }
}

startServer();