import { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import diceSprite from '../../../assets/game-assets/dice-roll-sprite-1x8.png';

interface DiceButtonProps {
    onClick: () => void;
    isRolling: boolean;
    disabled?: boolean;
    className?: string;
}

// Sprite sheet: 1536x1024, 8 frames horizontally
const FRAME_COUNT = 8;
const SPRITE_WIDTH = 1536;
const SPRITE_HEIGHT = 1024;
const FRAME_WIDTH = SPRITE_WIDTH / FRAME_COUNT; // 192px per frame

export function DiceButton({ onClick, isRolling, disabled, className }: DiceButtonProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        if (!isRolling) {
            return;
        }

        // Animate through frames rapidly
        const interval = setInterval(() => {
            setFrame(prev => (prev + 1) % FRAME_COUNT);
        }, 60); // 60ms per frame = fast roll

        return () => clearInterval(interval);
    }, [isRolling]);

    // Reset to first frame when not rolling
    useEffect(() => {
        if (!isRolling) {
            setFrame(0);
        }
    }, [isRolling]);

    // Display size - show full dice
    const displaySize = 34;

    // The dice in the sprite appears to be roughly square, positioned at the top of each frame
    // Each frame is 192x1024, but the dice itself is approximately 192x192 at the top
    const diceSize = 192; // approximate size of dice within each frame

    // Scale based on dice size to display size
    const scale = displaySize / diceSize; // 40/192 = 0.208
    const scaledSpriteWidth = SPRITE_WIDTH * scale; // 1536 * 0.208 = 320px
    const scaledSpriteHeight = SPRITE_HEIGHT * scale; // 1024 * 0.208 = 213px
    const scaledFrameWidth = FRAME_WIDTH * scale; // 192 * 0.208 = 40px

    // Background position - shift to show correct frame
    const xPos = -(frame * scaledFrameWidth) - 9;
    // Adjust vertical position to center the dice
    const yPos = -70;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || isRolling}
            className={cn(
                'flex items-center justify-center p-1 rounded-lg',
                'bg-pirate-wood-dark border-2 border-pirate-rust/50',
                'hover:bg-pirate-rust/20 hover:border-pirate-rust',
                'transition-all duration-150',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'overflow-hidden h-10 aspect-square',
                className
            )}
            title="Generate random pirate name"
        >
            <div
                className="bg-no-repeat"
                style={{
                    backgroundImage: `url(${diceSprite})`,
                    backgroundSize: `${scaledSpriteWidth}px ${scaledSpriteHeight}px`,
                    backgroundPosition: `${xPos}px ${yPos}px`,
                    width: displaySize,
                    height: displaySize,
                }}
            />
        </button>
    );
}
