const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data.json');
const data2 = require('./data2.json');
// importar as paginas
const Caminhao = require('./models/caminhao');
const Viagem = require('./models/viagem');
const Localidade = require('./models/localidade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// endpoint que lista os caminhoes
app.get('/caminhoes', async function (req, res) {
  try {
    const caminhoes = await Caminhao.find();
    return res.status(200).send({ caminhoes });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ erro: e });
  }
});

// endpoint que lista as vigens
app.get('/viagens', async function (request, response) {
  try {
    const viagens = await Viagem.find();
    return response.status(200).send({ viagens });
  } catch (e) {
    console.log(e);
    return response.status(500).send({ erro: e });
  }
});

// endpoint que lista as localidades
app.get('/localidades', async function (request, response) {
  try {
    const localidades = await Localidade.find();
    return response.status(200).send({ localidades });
  } catch (e) {
    console.log(e);
    return response.status(500).send({ erro: e });
  }
});

// Buscar caminhoes por id
app.get('/caminhoes/:id', async function (req, res) {
  try {
    const { id } = req.params;
    // const caminhao = data2.caminhoes.find((cami) => cami.id == id);
    const caminhao = await Caminhao.findOne({ id: id });
    if (!caminhao) return res.status(404).send({ erro: 'Nao encontrado!' });

    return res.status(200).send(caminhao);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ erro: e });
  }
});

//Buscar por viagens
app.get('/viagens/:id', async function (req, res) {
  try {
    const { id } = req.params;
    let viagem = await Viagem.findOne({ id: id });
    if (!viagem) return res.status(404).send({ erro: 'Nao encontrado' });

    const caminhao = await Caminhao.findOne({ id: viagem.id_caminhao });
    if (!caminhao) return res.status(404).send({ erro: 'Caminhao encontrado' });

    const localidade = await Localidade.findOne({ id: viagem.id_localidade });
    if (!localidade)
      return res.status(404).send({ erro: 'Localidade encontrado' });

    viagem = {
      ...viagem._doc,
      id_caminhao: caminhao,
      id_localidade: localidade,
    };

    return res.status(200).send(viagem);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ erro: e });
  }
});

//Buscar por localidades
app.get('/localidades/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const localidade = await Localidade.findOne({ id: id });
    if (!localidade) return res.status(404).send({ erro: 'Nao encontrado' });

    return res.status(200).send(localidade);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ erro: e });
    r;
  }
});

// adicionar um novo caminhão
app.post('/caminhoes', async function (req, res) {
  try {
    const caminhao = await Caminhao.create(req.body);
    return res.send({ caminhao });
  } catch (e) {
    return res.status(500).send({ erro: 'Erro no Registro do caminhão' });
  }
});

// adicionar uma nova localidade

app.post('/localidades', async function (req, res) {
  try {
    const localidade = await Localidade.create(req.body);
    return res.send({ localidade });
  } catch (e) {
    return res.status(500).send({ erro: 'Erro no Registro de localidade' });
  }
});

// adicionar uma nova viagem

app.post('/viagens', async function (req, res) {
  try {
    const viagem = await Viagem.create(req.body);
    return res.send({ viagem });
  } catch (e) {
    return res.status(500).send({ erro: 'Erro no Registro da viagem' });
  }
});

// Editar um caminhão

app.put('/caminhoes-update/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const { apelido, placa } = req.body;

    const caminhao = await Caminhao.findOne({ where: { id } });
    if (!caminhao) {
      return res
        .status(500)
        .json({ message: 'Erro ao encontrar esse caminhão' });
    } else {
      const caminhao = await Caminhao.findOneAndUpdate(
        { id },
        { apelido, placa },
      );
      await caminhao.save();
      res.status(200).send({ caminhao });
      console.log(res.params);
    }
  } catch (e) {
    res.status(500).send();
  }
});

// editar uma localidade

app.put('/localidades-update/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const { nome, distancia } = req.body;

    const localidade = await Localidade.findOne({ where: { id } });
    if (!localidade) {
      return res
        .status(500)
        .json({ message: 'Erro ao encontrar essa localidade' });
    } else {
      const localidade = await Localidade.findOneAndUpdate(
        { id },
        { nome, distancia },
      );
      await localidade.save();
      res.status(200).send({ localidade });
      console.log(res.params);
    }
  } catch (e) {
    res.status(500).send();
  }
});

// editar uma viagem

app.put('/viagens-update/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const { id_caminhao, id_localidade } = req.body;

    const viagens = await Viagem.findOne({ where: { id } });
    if (!viagens) {
      return res.status(500).json({ message: 'Erro ao encontrar essa viagem' });
    } else {
      const viagens = await Viagem.findOneAndUpdate(
        { id },
        { id_caminhao, id_localidade },
      );
      await viagens.save();
      res.status(200).send({ viagens });
      console.log(res.params);
    }
  } catch (e) {
    res.status(500).send();
  }
});

// Deletar um caminhão
app.delete('/caminhoes/:id', async function (req, res) {
  try {
    const caminhao = await Caminhao.findOneAndRemove(req.params.caminhao);

    return res.status(200).send();
  } catch (e) {
    return res.status(500).send({ erro: 'Erro ao deletar o caminhão' });
  }
});

// Deletar uma localidade

app.delete('/localidades/:id', async function (req, res) {
  try {
    const localidade = await Localidade.findOneAndRemove(req.params.localidade);

    return res.status(200).send();
  } catch (e) {
    return res.status(500).send({ erro: 'Erro ao deletar a localidade' });
  }
});

// Deletar uma viagem

app.delete('/viagens/:id', async function (req, res) {
  try {
    const viagem = await Viagem.findOneAndRemove(req.params.viagem);

    return res.status(200).send();
  } catch (e) {
    return res.status(500).send({ erro: 'Erro ao deletar a viagem' });
  }
});

// porta que eu quero abrir sempre fica no final
app.listen(3000, function () {
  console.log('server is runnig');
});
