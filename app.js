require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const sequelize = require('./config/bd');

const app = express();

// Middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    eq: function (v1, v2) {
      return v1 == v2;
    }
  }
}));
app.set('view engine', 'handlebars');

// Rotas
app.use('/', require('./routes/index'));

async function conectarBD() {
  try {
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

conectarBD();

app.listen(3000, () => {
  console.log('Servidor executando em http://localhost:3000');
});