module.exports = class Util {
  static hash(data, label = '') {
    const s = JSON.stringify(data) || '';
    let h = 0;
    const l = s.length;
    let i = 0;
    // eslint-disable-next-line no-bitwise, no-plusplus
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return label + h;
  }

  static generateDaysOfYear(year = 2020) {
    const allDaysOfYear = [];
    for (let month = 1; month < 13; month += 1) {
      const daysOfMonth = new Date(year, month, 0).getDate();
      for (let day = 1; day < daysOfMonth + 1; day += 1) {
        const dateWithoutZeros = `${year}/${month}/${day}`;
        const newDay = new Date(dateWithoutZeros).toISOString().slice(0, 10).replace(/-/g, '.');
        allDaysOfYear.push(newDay);
      }
    }
    return allDaysOfYear;
  }

  static saveJsonFile(data) {
    const a = document.createElement('a');
    a.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
    );
    a.setAttribute('download', 'filename.json');
    a.click();
  }

  static downloadJSON(data, name) {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  static organizeObject(obj) {
    return Object.keys(obj)
      .sort((a, b) => (obj[a] > obj[b] ? 1 : -1))
      .reduce((a, b) => {
        // eslint-disable-next-line no-param-reassign
        a[b] = obj[b];
        return a;
      }, {});
  }

  static delay(timeSeconds = 10) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeSeconds * 1000);
    });
  }

  static filterRankByTarget(data, target, inverse) {
    data.sort((a, b) => {
      if (a[target] < b[target]) return -1;
      if (a[target] > b[target]) return 1;
      return 0;
    });
    if ((target === 'name' && !inverse) || (target !== 'name' && inverse)) return data;
    return data.reverse();
  }

  static getRegisteredDays(datedSet) {
    const registeredIds = {};
    datedSet.forEach((each) => {
      registeredIds[each.date] = each.id;
    });
    return registeredIds;
  }

  static debugTime(msg) {
    if (window.developerMode.status) {
      const d = new Date();
      const seconds = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
      if (window.passedSeconds.value === 0) window.initTime.value = seconds;
      console.log(seconds - window.passedSeconds.value, seconds - window.initTime.value, msg);
      window.passedSeconds.value = seconds;
    }
  }
}
