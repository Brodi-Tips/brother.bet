export default class DashStatistics {
  constructor({ $, getStructure, developerMode, statistics }) {
    // Variables
    this.developerMode = developerMode;

    // Static Components
    this.statistics = statistics;

    // Objects
    this.$ = $;

    // DOM Elements
    this.elTabStatistics = this.$('#tabStatistics');
    this.elContentSection = this.$('.page-content');

    // Functions
    this.getStructure = getStructure;
  }

  async initStatistics() {
    const table = await this.statistics;

    this.elTabStatistics.find('.inner').after(table);
    if (!this.developerMode) {
      this.elTabStatistics.children(this.elContentSection).addClass('restrict-area');
    }

    // DashStatistics.fillComboboxes(users, teams);
  }

  static fillComboboxes(usersSet, teamsSet) {
    const users = Object.keys(usersSet);
    const teams = Object.keys(teamsSet);

    const arrUsers = ['cmbUserA', 'cmbUserB'];
    const arrTeams = ['cmbTeamA', 'cmbTeamB'];

    users.forEach((each) =>
      arrUsers.forEach((eachSel) =>
        this.$(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)
      )
    );
    teams.forEach((each) =>
      arrTeams.forEach((eachSel) =>
        this.$(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)
      )
    );
  }
}
