const Pluralize = require('./pluralize');
const WinToaster = require('node-notifier').WindowsToaster;

class Timer {
  constructor(options) {
      this.workTime = options.workTime;
      this.relaxTime = options.relaxTime;
      this.messageInterval = options.messageInterval;
      this.time = 0;
      this.progressMess = '';
      this.finalMess = 'Время работы закончилось.';
      this.initEvents();
  }

  initEvents(){
      // запуск таймера заново каждые (время_работы + время_отдыха) мс
      this.timerStart();
      let options = {
          title: 'Работа ' + (this.workTime * 0.001) + ' минут' + Pluralize(this.workTime, ['а', 'ы', '']) + '.',
          message: 'Одно дело за раз!',
          icon: 'icons/icon_work.png'
      };

      Timer.notify(options);
  }

  timerStart(){
      const date = new Date();
      console.log('Работа началась в ' + Timer.getCurrentTime() + '.');
      //вывод сообщений о прошедшем времени каждые this.messageInterval мс
      this.timerId = setInterval(this.timerTick.bind(this), this.messageInterval);
      //остановить 'работу' через this.workTime мс
      setTimeout(this.timerStop.bind(this), this.workTime);
  }

  timerStop(){
      clearInterval(this.timerId);
      this.renderFinal();
  }

  timerTick(){
      this.time++;
      this.progressMess = 'Прошло ' + this.time + ' минут' + Pluralize(this.time, ['а', 'ы', '']) + '.';
      console.log(this.progressMess);
  }

  renderFinal(){
      console.log(this.finalMess);
      let options = {
          title: 'Перерыв ' + (this.relaxTime * 0.001) + ' минут' + Pluralize(this.relaxTime, ['а', 'ы', '']) + '.',
          message: 'Встать со стула, размяться!',
          icon: 'icons/icon_rest.png'
      };
      Timer.notify(options);
  }

  static notify(options) {
      new WinToaster().notify(options);
  }

  static getCurrentTime() {
      const date = new Date();

      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;

      let min = date.getMinutes();
      if (min < 10) min = '0' + min;

      return hours + ':' + min;
  }

}

let newTimer = new Timer({
    workTime: 25000,
    relaxTime: 5000,
    messageInterval: 1000
});

