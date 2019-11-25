const namePlaceholders = document.querySelectorAll('span[data-name]');
const radius = 25;
const circumference = radius * 2 * Math.PI;

namePlaceholders.forEach(el => {
    el.innerText = process.env.NAME;
});

const data = {
    years: null,
    months: null,
    weeks: null,
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
    savings: null,
    euros: null,
    cents: null,
    dailyCost: process.env.DAILY_COST,
    costPerSecond: process.env.DAILY_COST / 86400,
    time: new Date(process.env.DATE).getTime()
};

const progresses = document.querySelectorAll('.progress[fraction]');
const milestones = document.querySelectorAll('.milestone[seconds]');

update();

setTimeout(() => {
    updateMilestones();
}, 500);

function update() {
    const now = new Date().getTime();
    const seconds = (now - data.time) / 1000;

    data.years = seconds / 31556952;
    data.months = seconds / 2592000;
    data.weeks = seconds / 604800;
    data.days = seconds / 86400;
    data.hours = seconds / 3600;
    data.minutes = seconds / 60;
    data.seconds = seconds;
    data.savings = data.seconds * data.costPerSecond;

    data.euros = Math.floor(data.savings)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    data.cents = (data.savings - Math.floor(data.savings))
        .toFixed(2)
        .split('.')[1];

    updatePies();

    document.getElementById('euros').innerText = data.euros;
    document.getElementById('cents').innerText = data.cents;

    requestAnimationFrame(update);
}

function updatePies() {
    progresses.forEach(progress => {
        const value = data[progress.getAttribute('fraction')];
        const complete = Math.floor(value);
        let v = complete.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '_');
        if (complete < 10) {
            v = value.toFixed(2);
        }
        if (complete < 1) {
            v = value.toFixed(3);
        }
        progress.querySelector('h2').innerText = v
            .replace(/\./g, ',')
            .replace(/_/g, '.');

        const percent = Math.round((value - complete) * 100 * 10) / 10;
        const offset = circumference - (percent / 100) * circumference;
        progress.querySelector(
            '.left'
        ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
      <circle class="bg" r="${radius}" cx="50" cy="50" />
      <circle
        class="prog"
        r="${radius}"
        cx="50"
        cy="50"
        stroke-dasharray="${circumference} ${circumference}"
        stroke-dashoffset="${offset}"
      />
    </svg>`;
    });
}

function updateMilestones() {
    milestones.forEach((el, idx) => {
        setTimeout(() => {
            const threshold = parseInt(el.getAttribute('seconds'));
            const pct = Math.min(
                100,
                Math.round((data.seconds / threshold) * 100)
            );
            if (pct >= 100) {
                el.classList.toggle('milestone--reached', true);
            }

            if (pct > 0) {
                const bar = el.querySelector('.milestone__progress');
                bar.children[0].style.width = `${pct}%`;
                bar.classList.toggle('milestone__progress--active', true);
            }
        }, idx * 500);
    });

    setTimeout(() => {
        updateMilestones();
    }, 5000);
}
