const ipcRenderer = require('electron').ipcRenderer

function createWindow(type) { ipcRenderer.send('create-window', type); console.log(type + " create") }

var P1LIFE = 20;
var P2LIFE = 20;
this.type = "main";

ipcRenderer.on('type', function (event, ...args) {
  var type = args[0]
  console.log('ipcIndex');
  if (type == "main") {
    document.querySelector('#win-type').innerHTML = type;
    document.querySelector('#create-window').onclick = function () { createWindow('phases') };
    document.querySelector('#create-window-type2').onclick = function () { createWindow('count') };
    document.querySelector('#create-window-type3').onclick = function () { createWindow('player') };

    ipcRenderer.on('id', function (event, ...args) {
      var id = args[0]
      document.querySelector('#win-id').innerHTML = id;
    })
  }
  if (type == "count") {
    this.type = "count";
    console.log(type);
    console.log(this.type);
    ipcRenderer.on('asynchronous-message', function (evt, message) {
      console.log(P1LIFE, message);
      if (message.do == "count-p1-up") {
        var el = document.querySelector('#life_total_1')
        el.innerHTML = ++P1LIFE;
        if (!el.classList.contains('changed_good')) {
          el.classList.add('changed_good');
          setTimeout(function () { document.querySelector('.changed_good').classList.remove('changed_good'); }, 800)
        }
      } else if (message.do == "count-p1-down") {
        var el = document.querySelector('#life_total_1')
        el.innerHTML = --P1LIFE;
        if (!el.classList.contains('changed_bad')) {
          el.classList.add('changed_bad');
          setTimeout(function () { document.querySelector('.changed_bad').classList.remove('changed_bad'); }, 200)
        }
      } else if (message.do == "count-p2-up") {
        var el = document.querySelector('#life_total_2')
        el.innerHTML = ++P2LIFE;
        if (!el.classList.contains('changed_good')) {
          el.classList.add('changed_good');
          setTimeout(function () { document.querySelector('.changed_good').classList.remove('changed_good'); }, 800)
        }
      } else if (message.do == "count-p2-down") {
        var el = document.querySelector('#life_total_2')
        el.innerHTML = --P2LIFE;
        if (!el.classList.contains('changed_bad')) {
          el.classList.add('changed_bad');
          setTimeout(function () { document.querySelector('.changed_bad').classList.remove('changed_bad'); }, 200)
        }
      }


    });
  }
  if (type == "phases") {
    this.currentPhase = 0;
    this.phases = [
      "Upkeep",
      "Pre Combat Main Phase",
      "Combat",
      "Post Combat Main Phase",
       "End",
    ]
    this.type = "phases";
    
    ipcRenderer.on('asynchronous-message', function (evt, message) {

      if(document.querySelector('.currentPhase')) {
        document.querySelector('.currentPhase').classList.remove('currentPhase');
      }
      console.log(this.currentPhase);
      if (message.do == "next-phase") {
        if (this.currentPhase + 1 >= this.phases.length) {
          this.currentPhase = 0;
        } else {
          this.currentPhase++;
        }
        var el = document.querySelector('#phase_'.concat(this.currentPhase));
        el.classList.add('currentPhase');
      } else if (message.do == "last-phase") {
        if (this.currentPhase - 1 < 0) {
          this.currentPhase = this.phases.length;
        } else {
          this.currentPhase--;
        }
        var el = document.querySelector('#phase_'.concat(this.currentPhase));
        el.classList.add('currentPhase');
      } else if (message.do == "reset-phase") {
        this.currentPhase = 0;
        var el = document.querySelector('#phase_'.concat(this.currentPhase));
        el.classList.add('currentPhase');
      }  

    });
  }
})
