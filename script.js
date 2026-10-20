const card = document.querySelector(".trading-card");
const abilityButton = document.querySelector(".ability__button");
const battle = document.querySelector(".battle");
const battleButton = document.querySelector("#battle-button");
const battleWinner = document.querySelector(".battle__winner");
const battleScore = document.querySelector(".battle__score");

card.addEventListener("click", (event) => {
  if (
    !window.matchMedia("(hover: none)").matches ||
    !(event.target instanceof Element) ||
    event.target.closest("button")
  ) {
    return;
  }

  card.classList.toggle("is-flipped");
});

abilityButton.addEventListener("click", () => {
  const isPowered = abilityButton.getAttribute("aria-pressed") !== "true";

  abilityButton.setAttribute("aria-pressed", String(isPowered));
  abilityButton.innerHTML = isPowered
    ? '<span aria-hidden="true">✓</span> Ability activated!'
    : '<span aria-hidden="true">✦</span> Activate ability';
  card.classList.toggle("is-powered", isPowered);
});

battleButton.addEventListener("click", () => {
  // Read Andrew's stat numbers from the card.
  const playerStats = Array.from(card.querySelectorAll(".stat__label strong"), (stat) =>
    Math.floor(Math.random() *Number.parseInt(stat.textContent, 10)),
  );
  const playerTotal = playerStats.reduce((total, stat) => total + stat, 0);

  // Roll three random stats for a mystery challenger.
  const challengerStats = playerStats.map(() => Math.floor(Math.random() * 100) + 1);
  const challengerTotal = challengerStats.reduce((total, stat) => total + stat, 0);

  // Keep the button busy while the dice are rolling.
  battleButton.disabled = true;
  battle.classList.remove("has-winner");
  battle.classList.add("is-rolling");
  battleWinner.textContent = "ROLLING...";
  battleScore.textContent = "The mystery challenger is choosing their stats!";

  // Reveal the winner after the roll animation.
  window.setTimeout(() => {
    const playerName = card.querySelector("#card-name").textContent;

    if (playerTotal > challengerTotal) {
      battleWinner.textContent = `${playerName.toUpperCase()} WINS!`;
    } else if (challengerTotal > playerTotal) {
      battleWinner.textContent = "MYSTERY CHALLENGER WINS!";
    } else {
      battleWinner.textContent = "IT'S A TIE!";
    }

    battleScore.textContent =
      `${playerName}: ${playerTotal} points · Mystery challenger: ${challengerTotal} points`;
    battle.classList.remove("is-rolling");
    battle.classList.add("has-winner");
    battleButton.disabled = false;
  }, 1200);
});
