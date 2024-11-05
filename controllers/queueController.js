const Queue = require('../models/queue');
const PS5Queue = require('../models/ps5Queue');
const XboxQueue = require('../models/xboxQueue');
const VRQueue = require('../models/vrQueue');

exports.getQueues = async (req, res) => {
  try {
    // Obtenha todas as filas de cada console
    const ps5Queues = await PS5Queue.find();
    const xboxQueues = await XboxQueue.find();
    const vrQueues = await VRQueue.find();

    // Combine as filas em um único array
    const queues = {
      PS5: ps5Queues,
      Xbox: xboxQueues,
      VR: vrQueues,
    };

    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQueue = async (req, res) => {
  const { ID, user, dateTime, positionFila, console } = req.body;


  try {
    let queue;

    // Cria a fila no modelo correspondente baseado no console
    if (console === 'PS5') {
      queue = new PS5Queue({
        ID,
        user,
        dateTime,
        positionFila,
        console
      });
    } else if (console === 'XBOX') {
      queue = new XboxQueue({
        ID,
        user,
        dateTime,
        positionFila,
        console
      });
    } else if (console === 'VR') {
      queue = new VRQueue({
        ID,
        user,
        dateTime,
        positionFila,
        console
      });
    } else {
      return res.status(400).json({ error: 'Invalid console specified' });
    }

    //console.log("Dados recebidos para criar a fila:", req.body);

    await queue.save();
    res.status(201).json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQueuesByConsole = async (req, res) => {
  const { console } = req.params; // Obtém o parâmetro "console"

  try {
    let queues;

    // Seleciona a fila com base no console
    if (console === 'PS5') {
      queues = await PS5Queue.find(); // Obtém todos os documentos da coleção PS5Queue
    } else if (console === 'XBOX') {
      queues = await XboxQueue.find(); // Obtém todos os documentos da coleção XboxQueue
    } else if (console === 'VR') {
      queues = await VRQueue.find(); // Obtém todos os documentos da coleção VRQueue
    } else {
      return res.status(400).json({ error: 'Invalid console specified' });
    }

    res.json(queues); // Retorna todos os documentos encontrados
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQueuesByUser = async (req, res) => {
  const { username } = req.params; // Obtém o parâmetro "username"

  try {
    // Busca as filas de todos os consoles para o usuário especificado
    const ps5Queues = await PS5Queue.find({ user: username });
    const xboxQueues = await XboxQueue.find({ user: username });
    const vrQueues = await VRQueue.find({ user: username });

    // Combina todas as filas em um único array
    const allQueues = [...ps5Queues, ...xboxQueues, ...vrQueues];

    if (allQueues.length === 0) {
      return res.status(404).json({ message: 'No queues found for this user' });
    }

    res.json(allQueues); // Retorna todos os documentos encontrados
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.joinQueue = async (req, res) => {
  const { console } = req.params;

  try {
    let queue;
    // Seleciona a fila com base no console
    if (console === 'PS5') {
      queue = await PS5Queue.findById(req.params.id);
    } else if (console === 'Xbox') {
      queue = await XboxQueue.findById(req.params.id);
    } else if (console === 'VR') {
      queue = await VRQueue.findById(req.params.id);
    } else {
      return res.status(400).json({ error: 'Invalid console specified' });
    }

    if (!queue.players.some(player => player.user === req.user.username)) {
      queue.players.push({ user: req.user.username, dateTime: new Date(), positionFila: queue.players.length + 1, console });
      await queue.save();
    }
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.leaveQueue = async (req, res) => {
  const { console } = req.params;

  try {
    let queue;
    // Seleciona a fila com base no console
    if (console === 'PS5') {
      queue = await PS5Queue.findById(req.params.id);
    } else if (console === 'Xbox') {
      queue = await XboxQueue.findById(req.params.id);
    } else if (console === 'VR') {
      queue = await VRQueue.findById(req.params.id);
    } else {
      return res.status(400).json({ error: 'Invalid console specified' });
    }

    queue.players = queue.players.filter(player => player.user !== req.user.username);
    await queue.save();
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};