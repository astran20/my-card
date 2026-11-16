import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import portraitImage from "../helperPages/PhotoOfMe.JPG";
import "../style.css";

const playerStats = [88, 73, 96];

function WelcomePage() {
  return (
    <main className="page">
      <article className="trading-card">
        <div className="card__inner">
          <div className="card__face card__front">
            <div className="card__shine" aria-hidden="true" />
            <header className="card__topline">
              <h1 className="card-name" style={{ color: "white" }}>
                Welcome to My Card Website!
              </h1>
            </header>
            <section className="welcomePage">
              <a href="cardPage.html">
                <section className="major">
                  <h2>Card Page</h2>
                </section>
              </a>
              <a href="helperPages/HELP_FAQ.html">
                <section className="major">
                  <h2>FAQs</h2>
                </section>
              </a>
              <a href="helperPages/HELP_Chat.html">
                <section className="major">
                  <h2>Chat With Me!</h2>
                </section>
              </a>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}

function TradingCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [battle, setBattle] = useState({
    isRolling: false,
    hasWinner: false,
    winner: "READY?",
    score: "Roll the dice to challenge a mystery opponent.",
  });
  const heldPointerId = useRef(null);
  const battleTimer = useRef(null);

  useEffect(() => {
    const stopHoldingCard = (event) => {
      if (event.pointerId !== heldPointerId.current) return;
      heldPointerId.current = null;
      setIsFlipped(false);
    };

    window.addEventListener("pointerup", stopHoldingCard);
    window.addEventListener("pointercancel", stopHoldingCard);
    return () => {
      window.removeEventListener("pointerup", stopHoldingCard);
      window.removeEventListener("pointercancel", stopHoldingCard);
      window.clearTimeout(battleTimer.current);
    };
  }, []);

  const handlePointerDown = (event) => {
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      event.target.closest("button")
    ) {
      return;
    }
    heldPointerId.current = event.pointerId;
  };

  const startBattle = () => {
    if (battle.isRolling) return;

    const playerRolls = playerStats.map((stat) =>
      Math.floor(Math.random() * stat),
    );
    const playerTotal = playerRolls.reduce((total, stat) => total + stat, 0);
    const challengerTotal = playerStats.reduce(
      (total) => total + Math.floor(Math.random() * 100) + 1,
      0,
    );

    setBattle({
      isRolling: true,
      hasWinner: false,
      winner: "ROLLING...",
      score: "The mystery challenger is choosing their stats!",
    });

    battleTimer.current = window.setTimeout(() => {
      const winner =
        playerTotal > challengerTotal
          ? "ANDREW WINS!"
          : challengerTotal > playerTotal
            ? "MYSTERY CHALLENGER WINS!"
            : "IT'S A TIE!";

      setBattle({
        isRolling: false,
        hasWinner: true,
        winner,
        score: `Andrew: ${playerTotal} points · Mystery challenger: ${challengerTotal} points`,
      });
    }, 1200);
  };

  return (
    <>
      <main className="page">
        <a href="index.html">
          <p className="page__kicker">Back to Welcome Page</p>
        </a>
        <p className="page__kicker">
          <span aria-hidden="true">✦</span> THE HUMAN COLLECTION
        </p>

        <article
          className={`trading-card${isFlipped ? " is-flipped" : ""}${isPowered ? " is-powered" : ""}`}
          aria-labelledby="card-name"
          aria-label="Andrew's trading card. Focus to see the back, or press and hold while moving the pointer away. Move back or release to flip back."
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerLeave={(event) => {
            if (event.pointerId === heldPointerId.current) setIsFlipped(true);
          }}
          onPointerEnter={(event) => {
            if (event.pointerId === heldPointerId.current) setIsFlipped(false);
          }}
        >
          <div className="card__inner">
            <div className="card__face card__front">
              <div className="card__shine" aria-hidden="true" />

              <header className="card__topline">
                <span className="card__series">
                  <span aria-hidden="true">🦇</span> CREATOR SERIES
                </span>
                <span className="card__number">
                  NO. 001 <span aria-hidden="true">◆</span>
                </span>
              </header>

              <section className="portrait" aria-label="Portrait illustration">
                <span
                  className="portrait__spark portrait__spark--one"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <span
                  className="portrait__spark portrait__spark--two"
                  aria-hidden="true"
                >
                  ✳
                </span>
                <div className="portrait__avatar" aria-hidden="true">
                  <span className="portrait__face">:)</span>
                </div>
                <span className="portrait__caption">ONE OF A KIND</span>
              </section>

              <div className="card__identity">
                <div>
                  <p className="card__label">PLAYER</p>
                  <h1 id="card-name">Andrew</h1>
                </div>
                <span className="level">
                  <span aria-hidden="true">★</span> LV. 01
                </span>
              </div>

              <section className="major" aria-labelledby="major-label">
                <span className="major__icon" aria-hidden="true">
                  ✎
                </span>
                <div>
                  <h2 className="card__label" id="major-label">
                    MAJOR / INTEREST
                  </h2>
                  <p>Web Design &amp; Engineering</p>
                </div>
                <span className="major__type">DARK TYPE</span>
              </section>

              <section className="stats" aria-label="Stats out of 100">
                {[
                  ["Pixel Perfection", 88],
                  ["Deadline Vanishing", 73],
                  ["Tab Collector", 96],
                ].map(([label, value]) => (
                  <div className="stat" key={label}>
                    <div className="stat__label">
                      <span>{label}</span>
                      <strong>{value}/100</strong>
                    </div>
                    <div className="stat__track" aria-hidden="true">
                      <span style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </section>

              <section className="ability" aria-labelledby="ability-title">
                <div className="ability__heading">
                  <span className="ability__icon" aria-hidden="true">
                    ⚡
                  </span>
                  <h2 id="ability-title">SPECIAL ABILITY</h2>
                </div>
                <p className="ability__name">Midnight Brainwave</p>
                <p className="ability__description">
                  Turns one “quick idea” into a 2 a.m. masterpiece, then forgets
                  why the fridge is open.
                </p>
                <button
                  className="ability__button"
                  type="button"
                  aria-pressed={isPowered}
                  onClick={() => setIsPowered((powered) => !powered)}
                >
                  <span aria-hidden="true">{isPowered ? "✓" : "✦"}</span>{" "}
                  {isPowered ? "Ability activated!" : "Activate ability"}
                </button>
              </section>

              <footer className="card__footer">
                <span>Hand-directed by me, built with AI</span>
                <span aria-hidden="true">✦ ✦ ✦</span>
              </footer>
            </div>

            <div className="card__face card__back" aria-label="Fun fact about Andrew">
              <span className="card__back-mark" aria-hidden="true">
                ✦
              </span>
              <p className="card__back-kicker">A LITTLE FUN FACT</p>
              <h2>Did you know?</h2>
              <p className="card__fact">
                Every browser tab Andrew opens is now a permanent member of the
                design team.
              </p>
              <span className="card__back-hint">
                MOVE BACK OR RELEASE TO FLIP BACK
              </span>
            </div>
          </div>
        </article>

        <section
          className={`battle${battle.isRolling ? " is-rolling" : ""}${battle.hasWinner ? " has-winner" : ""}`}
          aria-label="Card battle"
        >
          <button
            className="battle__button"
            type="button"
            disabled={battle.isRolling}
            onClick={startBattle}
          >
            <span className="battle__dice" aria-hidden="true">
              🎲
            </span>
            Battle!
          </button>
          <div
            className="battle__result"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="battle__winner">{battle.winner}</p>
            <p className="battle__score">{battle.score}</p>
          </div>
        </section>

        <p className="page__note">A little card for a big main character.</p>
      </main>
    </>
  );
}

function FAQPage() {
  return (
    <main className="page">
      <article className="trading-card">
        <div className="card__inner">
          <div className="card__face card__front">
            <div className="card__shine" aria-hidden="true" />
            <header className="card__topline">
              <h1 className="card-name" style={{ color: "white" }}>
                FAQs
              </h1>
              <a href="../index.html">
                <span className="card__number">Back to Welcome Page</span>
              </a>
            </header>
            <section className="major faq-list">
              <div>
                <h2>Q: How does this card work?</h2>
                <p>
                  A: Click and hold the card, then drag to the side to flip it
                  over!
                </p>
              </div>
              <div>
                <h2>Q: How does the battling work?</h2>
                <p>
                  A: The battle button randomly generates a number from 0 up to
                  the player's stats in each category before adding them
                  together. The player with the higher score at the end wins!
                </p>
              </div>
              <div>
                <h2>Q: What does activating the ability do?</h2>
                <p>A: Right now, activating the ability doesn't really do anything</p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}

function ChatPage() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  const submitQuestion = (event) => {
    event.preventDefault();
    if (!question.trim()) {
      setMessage("error");
      return;
    }
    setMessage("success");
  };

  return (
    <main className="page">
      <article className="trading-card">
        <div className="card__inner">
          <div className="card__face card__front">
            <div className="card__shine" aria-hidden="true" />
            <header className="card__topline">
              <a href="../index.html">
                <span className="card__number">Back to Welcome Page</span>
              </a>
            </header>
            <section className="portrait chat-portrait">
              <img src={portraitImage} alt="Picture of Me" />
            </section>
            <form onSubmit={submitQuestion} noValidate>
              {message === "error" && (
                <p className="errorMessage" role="alert">
                  Please ask a question
                </p>
              )}
              {message === "success" && (
                <p role="status">
                  Imagine the Picture is an AI video of me that responds to
                  your question.
                </p>
              )}
              <input
                type="text"
                placeholder="What do you want to ask?"
                aria-label="What do you want to ask?"
                value={question}
                onChange={(event) => {
                  setQuestion(event.target.value);
                  if (message) setMessage("");
                }}
              />
              <button type="submit">ASK</button>
            </form>
          </div>
        </div>
      </article>
    </main>
  );
}

function App() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith("/cardpage.html")) return <TradingCard />;
  if (path.endsWith("/help_faq.html")) return <FAQPage />;
  if (path.endsWith("/help_chat.html")) return <ChatPage />;
  return <WelcomePage />;
}

createRoot(document.getElementById("root")).render(<App />);
