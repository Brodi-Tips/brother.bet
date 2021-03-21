/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

const mL = async (sets) => {
  const {
    nameDataSet,
    learningRate,
    trainSet,
    neuralNetwork,
    batches,
    normalization,
    randomize,
    validationPercent,
  } = sets;
  neuralNetwork.weightData = str2ab(neuralNetwork.weightDataStr);

  const input = tf.variable(tf.tensor2d(trainSet.input), false);
  const output = tf.tensor2d(trainSet.output);

  if (normalization) {
    input.assign(input.softmax());
  }

  const fitConfig = {
    validationSplit: validationPercent,
    shuffle: randomize,
  };

  const model = await tf.loadLayersModel(tf.io.fromMemory(neuralNetwork));

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
        samples: trainSet.input.length,
        timestamp: Date.now(),
      };

      await model.save(tf.io.withSaveHandler((artifacts) => {
        log.neuralNetwork = artifacts;
      }));

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

const mLPrediction = async (input, neuralNetwork) => {
  const inputTensor = tf.tensor2d(input);

  neuralNetwork.weightData = str2ab(neuralNetwork.weightDataStr);

  const model = await tf.loadLayersModel(tf.io.fromMemory(neuralNetwork));

  return model.predict(inputTensor).dataSync();
};

const ab2str = (buf) => String.fromCharCode.apply(null, new Uint16Array(buf));

const str2ab = (str) => {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};
