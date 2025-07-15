"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'running' | 'gameOver';

const INITIAL_SPEED_MS = 4000;
const TAP_TOLERANCE_DEGREES = 12;

const Clock = ({ rotation, targetNumber }: { rotation: number; targetNumber: number }) => (
  <div className="relative w-64 h-64 md:w-80 md:h-80 bg-card rounded-full border-8 border-primary shadow-2xl flex items-center justify-center">
    {/* Clock Numbers */}
    {Array.from({ length: 12 }, (_, i) => {
      const number = i + 1;
      const angle = number * 30;
      const isTarget = number === targetNumber;
      return (
        <div
          key={number}
          className="absolute w-full h-full flex justify-center"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span
            className={cn(
              'absolute top-3 md:top-4 text-2xl md:text-3xl font-bold transition-all duration-300',
              isTarget ? 'text-accent scale-150' : 'text-primary/70'
            )}
            style={{ transform: `rotate(-${angle}deg)` }}
          >
            {number}
          </span>
        </div>
      );
    })}

    {/* Clock Hand */}
    <div
      className="absolute w-1.5 h-2/5 bg-primary origin-bottom rounded-t-full"
      style={{
        transform: `rotate(${rotation}deg)`,
        bottom: '50%',
        left: 'calc(50% - 3px)',
        transition: 'background-color 0.2s',
      }}
    />
    
    {/* Center Dot */}
    <div className="absolute w-4 h-4 bg-accent rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-background" />
  </div>
);

const IdleScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center flex flex-col items-center animate-fade-in">
    <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">Điểm Nhấn Thời Gian</h1>
    <p className="text-muted-foreground mt-2 max-w-md">Chạm vào màn hình khi kim đồng hồ chỉ đúng số mục tiêu để ghi điểm. Mỗi lần thành công, tốc độ sẽ tăng lên!</p>
    <Button onClick={onStart} size="lg" className="mt-8">
      Bắt đầu
    </Button>
  </div>
);

const GameOverScreen = ({ score, onRestart }: { score: number; onRestart: () => void }) => (
  <Card className="w-80 text-center animate-fade-in-up">
    <CardHeader>
      <CardTitle className="text-3xl font-bold">Trò chơi kết thúc!</CardTitle>
      <CardDescription>Điểm cuối cùng của bạn</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-7xl font-bold text-accent my-4">{score}</p>
      <Button onClick={onRestart} className="w-full">
        Chơi lại
      </Button>
    </CardContent>
  </Card>
);

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED_MS);
  const [targetNumber, setTargetNumber] = useState(0);
  const [rotation, setRotation] = useState(0);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  const animate = useCallback((time: number) => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = time;
    }
    const elapsedTime = time - startTimeRef.current;
    const newRotation = (elapsedTime / speed) * 360;

    setRotation(newRotation);

    if (newRotation < 360) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Automatic fail if one rotation completes
      setGameState('gameOver');
    }
  }, [speed]);

  useEffect(() => {
    if (gameState === 'running') {
      startTimeRef.current = 0;
      setRotation(0);
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState, speed, animate]);

  const startGame = () => {
    setScore(0);
    setSpeed(INITIAL_SPEED_MS);
    setTargetNumber(Math.floor(Math.random() * 12) + 1);
    setGameState('running');
  };

  const handleTap = () => {
    if (gameState !== 'running') return;

    if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
    }

    const currentAngle = rotation % 360;
    const targetAngle = targetNumber * 30;

    const diff = Math.abs(currentAngle - targetAngle);
    const isHit = Math.min(diff, 360 - diff) <= TAP_TOLERANCE_DEGREES;

    if (isHit) {
      setScore(prev => prev + 1);
      setSpeed(prev => prev * 0.85); // Increase speed by 15%
      setTargetNumber(Math.floor(Math.random() * 12) + 1);
      
      // restart animation for next round
      startTimeRef.current = 0;
      setRotation(0);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setGameState('gameOver');
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'running':
        return (
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">Điểm số</p>
              <p className="text-6xl font-bold text-primary">{score}</p>
            </div>
            <Clock rotation={rotation} targetNumber={targetNumber} />
          </div>
        );
      case 'gameOver':
        return <GameOverScreen score={score} onRestart={startGame} />;
      case 'idle':
      default:
        return <IdleScreen onStart={startGame} />;
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-background p-4 cursor-pointer"
      onClick={gameState === 'running' ? handleTap : undefined}
    >
      {renderContent()}
    </main>
  );
}
