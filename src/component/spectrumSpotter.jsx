import { useState, useEffect } from "react";
import { COLORS } from "../colors";
import "./spectrumSpotter.css";
import { AlertCircle, Check } from "lucide-react";

export const SpectrumSpotter = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);


  const getRandomColors = (count) => {
    const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const startNewGame = () => {
    const gameColors = getRandomColors(6);
    const target = gameColors[Math.floor(Math.random() * gameColors.length)];
    setTargetColor(target);
    setOptions(gameColors);
    setGameStatus("");
    setIsCorrect(null);
  };

  const gameReset = () => {
    setScore(0);
    startNewGame();
  };
  useEffect(() => {
    startNewGame();
  }, []);

  const animateScore = () => {
    setIsScoreAnimating(true);
    setTimeout(() => setIsScoreAnimating(false), 500);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus("Correct! Well done!");
      setIsCorrect(true);
      animateScore();
      setTimeout(startNewGame, 1500);
    } else {
      setGameStatus("Wrong guess! Try again!");
      setIsCorrect(false);
    }
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <h1 className="game-title">Spectrum Spotter</h1>
        <p className="game-subtitle">The Ultimate Color Matching Game</p>

        <div data-testid="gameInstructions" className="game-instructions">
          Guess the correct color from the options below!
        </div>

        <div
          data-testid="colorBox"
          className="color-box"
          style={{ backgroundColor: targetColor }}
        />

        <div className="color-options">
          {options.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            />
          ))}
        </div>

        <div className="game-controls">
          <div
            data-testid="score"
            className={`score ${isScoreAnimating ? "increment" : ""}`}>
            Score: {score}
          </div>
          <button
            data-testid="newGameButton"
            onClick={gameReset}
            className="new-game-button">
            New Game
          </button>
        </div>

        {gameStatus && (
          <div
            data-testid="gameStatus"
            className={`game-status ${isCorrect ? "correct" : "wrong"}`}>
            {isCorrect ? (
              <Check className="status-icon" size={20} />
            ) : (
              <AlertCircle className="status-icon" size={20} />
            )}
            {gameStatus}
          </div>
        )}
      </div>
    </div>
  );
};
