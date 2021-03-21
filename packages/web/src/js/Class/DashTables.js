export default class DashTables {
  constructor({
    $,
    hash,
    generateDaysOfYear,
    getRegisteredDays,
    getStructure,
    tableRanking,
    tableLastGames,
  }) {
    // constants
    this.varClrSec5 = 'var(--secondary_color_5)';
    this.varClrTer5 = 'var(--tertiary_color_5)';

    // Static Components
    this.tableRanking = tableRanking;
    this.tableLastGames = tableLastGames;

    // Objects
    this.$ = $;

    // DOM Elements
    this.elTableBodyGames = this.$('#admin table tbody');
    this.tabLastGames = this.$('#tabLastGames');

    // Functions
    this.hash = hash;
    this.generateDaysOfYear = generateDaysOfYear;
    this.getRegisteredDays = getRegisteredDays;
    this.getStructure = getStructure;
  }

  tableResultGamesCheck(year, dataSet) {
    const registeredIds = this.getRegisteredDays(dataSet);
    const allDaysOfYear = this.generateDaysOfYear(year);

    this.elTableBodyGames.html();
    allDaysOfYear.forEach((day) => {
      let color = this.varClrTer5;
      let icon = 'close';
      let gid = '';

      if (registeredIds[day]) {
        color = this.varClrSec5;
        icon = 'check';
        gid = registeredIds[day];
      }

      this.elTableBodyGames.append(`
      <tr>
        <th class="mdl-data-table__cell--non-numeric">${day}</th>
        <th class="mdl-data-table__cell--non-numeric">${gid}</th>
        <th class="mdl-data-table__cell--non-numeric">
          <i style="color: ${color};" class=" material-icons">${icon}</i>
        </th>
      </tr>
    `);
    });
  }

  addLastGames(data, days = 0) {
    if (days === 0) {
      const div = '<div class="page-content" style="width: 100%;"></div>';
      this.tabLastGames.html(div);
    }

    const item = data.length - 1 - days;
    const table = $(this.tableLastGames);
    data[item].data.forEach((game) => {
      table.find('tbody').append(
        `
        <tr>
          <th >${game.time || '--:--'}</th>
          <th class="flex-down" >${game.teamA.user}</th>
          <th class="flex-up pink">${game.teamA.team}</th>
          <th >
            <ul>
              <li >${game.teamA.firstHalf} - ${game.teamB.firstHalf}</li>
              <li >${game.teamA.secondHalf} - ${game.teamB.secondHalf}</li>
              <li class="link">
              ${parseInt(game.teamA.firstHalf, 10) + parseInt(game.teamA.secondHalf, 10)}
              -
              ${parseInt(game.teamB.firstHalf, 10) + parseInt(game.teamB.secondHalf, 10)}</li>
            </ul>
          </th>
          <th class="flex-down">${game.teamB.user}</th>
          <th class="flex-up pink">${game.teamB.team}</th>
          <th class="video">
            <a target="_blank" href="${game.video || '#'}">
              <i class=" material-icons">play_circle_filled</i>
            </a>
          </th>
        </tr>
      `
      );
    });

    table.find('span').html(data[item].date);
    this.tabLastGames.find('div').append(table);
    this.tabLastGames.find('div').append(table);
  }

  async addTableRank(nameScope, teams, index, btn, history) {
    const id = `#tabRank${nameScope[0].toUpperCase() + nameScope.slice(1) + (history || '')}`;
    const fixed = 1;

    this.$(id).find('.cd-horizontal-timeline').nextAll().remove();
    this.$(id).find('.cd-horizontal-timeline').after(this.tableRanking);
    this.$(`${id} thead:nth-child(2) tr`).find('i').html('filter_alt');
    this.$(`${id} thead:nth-child(2) tr`).children().eq(index).find('i').html(btn);

    teams.forEach((team, indexof) => {
      const idTh = `${team.name + this.hash(team)}`;

      this.$(id)
        .find('table')
        .find('tbody')
        .append(
          `
          <tr>
            <th class="link" id="${idTh}">${team.name}</th>
            <th class="gold">${indexof + 1}</th>
            <th>${team.games}</th>
            <th>${team.goalsPro.toFixed(2)}</th>
            <th>${team.goalsCon.toFixed(2)}</th>
            <th >${(team.wins * 100).toFixed(fixed)}%</th>
            <th >${(team.draws * 100).toFixed(fixed)}%</th>
            <th >${(team.losses * 100).toFixed(fixed)}%</th>
            <th >${(team.bothScore * 100).toFixed(fixed)}%</th>
            <th >${(team.underHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.underOneAndHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.underTwoAndHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.underThreeAndHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.underFourAndHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.overHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.overOneAndHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.overTwoAndHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.overThreeAndHalf * 100).toFixed(fixed)}%</th>
            <th >${(team.overFourAndHalf * 100).toFixed(fixed)}%</th>
          </tr>
        `
        );
    });
  }
}
