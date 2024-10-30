const defaultConfig = {
  colors: {
    hours: "#ff2972",
    minutes: "#fee800",
    seconds: "#04fc43",
    background: "#2f363e",
    circleStroke: "#191919"
  },
  timeFormat: "12-hour"
};

// Load configuration from localStorage or use default
const loadConfig = () => {
  const config = localStorage.getItem('clockConfig');
  return config ? JSON.parse(config) : defaultConfig;
};

// Save configuration to localStorage
const saveConfig = (config) => {
  localStorage.setItem('clockConfig', JSON.stringify(config));
};

// Initialize clock with configuration
const config = loadConfig();
saveConfig(config);

document.querySelectorAll('.circle').forEach((circle, index) => {
  const colorKey = ['hours', 'minutes', 'seconds'][index];
  circle.style.setProperty('--color', config.colors[colorKey]);
});

setInterval(() => {
  const hoursElem = document.getElementById('hours');
  const minutesElem = document.getElementById('minutes');
  const secondsElem = document.getElementById('seconds');
  const ampmElem = document.getElementById('ampm');

  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');

  const dotH = document.querySelector('.h_dot');
  const dotM = document.querySelector('.m_dot');
  const dotS = document.querySelector('.s_dot');

  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  const ap = h >= 12 ? 'PM' : 'AM';

  if (config.timeFormat === '12-hour') {
    h = h % 12 || 12;
  }

  const formattedH = h < 10 ? '0' + h : h;
  const formattedM = m < 10 ? '0' + m : m;
  const formattedS = s < 10 ? '0' + s : s;

  hoursElem.innerHTML = formattedH + ' Hours';
  minutesElem.innerHTML = formattedM + ' Minutes';
  secondsElem.innerHTML = formattedS + ' Seconds';
  ampmElem.innerHTML = ap;

  hh.style.strokeDashoffset = 440 - (440 * (h / 12));
  mm.style.strokeDashoffset = 440 - (440 * (m / 60));
  ss.style.strokeDashoffset = 440 - (440 * (s / 60));

  dotH.style.transform = `rotate(${h * 30}deg)`;
  dotM.style.transform = `rotate(${m * 6}deg)`;
  dotS.style.transform = `rotate(${s * 6}deg)`;
}, 1000);
