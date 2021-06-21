import tf from '@tensorflow/tfjs';

class Training {
  static addedTrain(data) {
    const inputs = [];
    data.input.forEach((each) => {
      const tensorA = tf.tensor(each[0]);
      const tensorB = tf.tensor(each[1]);
      const tensorInput = tensorA.sub(tensorB);
      const input = Array.from(tensorInput.dataSync());
      inputs.push(input);

      tensorA.dispose();
      tensorB.dispose();
      tensorInput.dispose();

      return input;
    });

    return { input: inputs, output: data.output };
  }
  // async getNeuralNetwork(assets) {
  //   const {
  //     nameDataSet,
  //     validationSet,
  //     batches,
  //     learningRate,
  //     start,
  //     end,
  //     randomize,
  //     normalization,
  //     validationPercent,
  //     step,
  //     plotPercent,
  //   } = assets;

  //   const trainSet = await getTable(nameDataSet);

  //   let percentPlot = +plotPercent;

  //   let index = 10;
  //   if (+end - +start === +end && +step === +end) index = +end - 1;

  //   while (index < +end) {
  //     const result = await machineLearning({
  //       nameDataSet,
  //       trainSet,
  //       validationSet,
  //       batches: +batches,
  //       learningRate: +learningRate,
  //       start: +start,
  //       randomize,
  //       normalization,
  //       validationPercent: +validationPercent,
  //       end: index,
  //     });

  //     if (init) {
  //       api
  //         .post(`/create?nameSet=${nameDataSet}`, result[result.length - 1])
  //         .then((response) => {
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }

  //     if (index > trainSet.input.length * plotPercent) {
  //       percentPlot += plotPercent;
  //       downloadJSON(result, new Date());
  //     }

  //     if (index + +step >= +end && index !== +end - 1) index = +end - 1;
  //     else index += +step;
  //   }
  // }

  // async getTrain(assets) {
  //   const { nameDataSet, batches, saveEvery } = assets;

  //   const trainSet = await this.getTable(nameDataSet);

  //   const fakeBatches = (batches / saveEvery).toFixed(0);
  //   assets.batches = saveEvery;

  //   for (let i = 0; i < fakeBatches; i += 1) {
  //     // const { data } = await api.get(`/index?nameSet=${nameDataSet}`);

  //     // const result = await mL({
  //     //   trainSet,
  //     //   neuralNetwork: data.neuralNetwork,
  //     //   ...assets,
  //     // });

  //     // api
  //     //   .post(`/create?nameSet=${nameDataSet}`, result[result.length - 1])
  //     //   .then((response) => {
  //     //     console.log(response);
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log(error);
  //     //   });

  //     console.log(result);
  //   }
  // }

  // async predict(nameDataSet, game) {
  //   const games = await getTable('gamesSet');
  //   const teams = await getTable('teamsSet');

  //   const { userA, userB } = getUsersInput(games, teams, game);

  //   const tensorA = tf.tensor(userA);
  //   const tensorB = tf.tensor(userB);
  //   const input = Array(tensorA.sub(tensorB).dataSync());

  //   const { data } = await api.get(`/index?nameSet=${nameDataSet}`);

  //   const prediction = mLPrediction(input, data.neuralNetwork);

  //   return prediction;
  // }
}

const { training } = new Training();

export default { training };
