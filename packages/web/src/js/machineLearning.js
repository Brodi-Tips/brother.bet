/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
// Variables
defaultML = {
  nameDataSet: 'trainSet',
  trainSet: [],
  validationSet: '',
  batches: 1000,
  learningRate: 0.001,
  start: 0,
  end: 0,
  normalization: true,
  randomize: true,
  validationPercent: 0.3,
};

const machineLearning = async (sets = defaultML) => {
  const {
    nameDataSet,
    trainSet,
    validationSet,
    batches,
    learningRate,
    start,
    end,
    normalization,
    randomize,
    validationPercent,
  } = sets;

  const dataSplice = {
    trainSet: {
      input: trainSet.input.slice(start, end),
      output: trainSet.output.slice(start, end),
    },
  };

  const inputSplice = dataSplice.trainSet.input;
  const outputSplice = dataSplice.trainSet.output;

  const input = tf.variable(tf.tensor2d(inputSplice), false);
  const output = tf.tensor2d(outputSplice);

  if (normalization) {
    input.assign(input.softmax());
  }

  const fitConfig = {
    validationSplit: validationPercent,
    shuffle: randomize,
    callbacks: tf.callbacks.earlyStopping({
      patience: 9,
    }),
  };

  if (validationSet) {
    const inputs = tf.tensor2d(validationSet.input);
    const outputs = tf.tensor2d(validationSet.output);
    fitConfig.validationData = [inputs, outputs];
  }

  const model = tf.sequential();

  const hiddenLayers = tf.layers.dense({
    inputShape: [9],
    units: 4,
    activation: 'sigmoid',
  });

  const outputLayers = tf.layers.dense({
    inputShape: [4],
    units: outputSplice[0].length,
    activation: 'sigmoid',
  });

  model.add(hiddenLayers);
  model.add(outputLayers);

  const optimizer = tf.train.sgd(learningRate);

  model.compile({
    optimizer,
    loss: tf.losses.meanSquaredError,
  });

  const train = async () => {
    const logs = [];
    for (let i = 0; i < batches; i += 1) {
      const response = await model.fit(input, output, fitConfig);

      const log = {
        name: nameDataSet,
        loss: response.history.loss[0],
        batches: i,
        samples: end - start,
        timestamp: Date.now(),
      };

      await model.save(
        tf.io.withSaveHandler((artifacts) => {
          log.neuralNetwork = artifacts;
        })
      );

      log.neuralNetwork.weightDataStr = ab2str(log.neuralNetwork.weightData);

      logs.push(log);

      console.log(log);

      if (i - batches === -1) return logs;
    }
  };
  const response = await train();

  input.dispose();
  output.dispose();
  model.dispose();
  optimizer.dispose();

  return response;
};
