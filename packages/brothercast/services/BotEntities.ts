export const units = [[
  {
      text: '0.25',
      callback_data: JSON.stringify({
          command: 'confirmar',
      })
  },
  {
      text: ' 0.5 ',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 1.0 ',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 2.0',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 3.0',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  },
  {
      text: ' 4.0',
      callback_data: JSON.stringify({
          command: 'confirmar',

      })
  }]];

export const bet_type = [

  [{
      text: ' Asian Handicap ',
      callback_data: JSON.stringify({
          command: 'Asian',

      })
  }],
  [{
      text: ' Both mach ',
      callback_data: JSON.stringify({
          command: 'Both',

      })
  }],
  [{
      text: ' Final Result ',
      callback_data: JSON.stringify({
          command: 'Final',

      })
  }],
  [{
      text: ' Double Hypothesis ',
      callback_data: JSON.stringify({
          command: 'Double',

      })
  }]

]

export const games = [

  [{
      text: ' A.Madrid (CarlWhizzer) vs Barcelona (Void) ',
      callback_data: JSON.stringify({
          command: 'bet_type',

      })
  }],
  [{
      text: 'Valencia (WeeMan) vs Sevilla (ViTo)',
      callback_data: JSON.stringify({
          command: 'bet_type',

      })
  }]

]

const both_etapa = [

  [{
      text: ' Yes ',
      callback_data: JSON.stringify({
          command: 'Both_opt',

      })
  }],
  [{
      text: ' No ',
      callback_data: JSON.stringify({
          command: 'Both_opt',

      })
  }]


]

export const opts_gerais = [
  ['bet_type', 'Escolha o tipo da aposta', bet_type],
  ['Asian', 'Escolha a unidade', units],
  ['Both', 'etapa', both_etapa],
  ['Both_opt', 'Escolha a unidade', units]
]

