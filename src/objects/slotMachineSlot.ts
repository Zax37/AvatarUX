import Phaser from "phaser";

import { audioAssets } from "../enums/audio-assets.enum.ts";
import { slotSymbols } from "../enums/slot-symbols.enum.ts";

import { slotModifierConnected } from "../constants/slot.const.ts";
import { transitionCompleteEvent } from "../constants/events.const.ts";

export class SlotMachineSlot extends Phaser.Events.EventEmitter {
    private slotSymbol: slotSymbols;
    private transitionsDelay: number;
    private slotImage: Phaser.GameObjects.Image;
    private slotTween: Phaser.Tweens.TweenChain;

    constructor(private scene: Phaser.Scene, x: number, y: number, transitionsDelay: number) {
        super();
        this.transitionsDelay = transitionsDelay;
        this.slotImage = scene.add.image(x, y, '').setScale(.5).setOrigin(0).setVisible(false);
    }

    getSymbol(): slotSymbols {
        return this.slotSymbol;
    }

    transitionTo(slotSymbol: slotSymbols) {
        this.slotSymbol = slotSymbol;

        this.slotTween = this.scene.add.tweenchain({
            targets: this.slotImage,
            tweens: [
                {
                    delay: this.transitionsDelay,
                    y: -500,
                    ease: Phaser.Math.Easing.Bounce.InOut,
                    onComplete: () => {
                        this.slotImage.setTexture(slotSymbol).setVisible(true);
                        if (this.slotTween.timeScale == 1) {
                            this.scene.sound.play(audioAssets.slotDrop, { delay: 0.15 });
                        }
                    },
                }, {
                    y: this.slotImage.y,
                    ease: Phaser.Math.Easing.Bounce.InOut,
                    onComplete: () => {
                        this.emit(transitionCompleteEvent);
                    },
                }
            ]
        });
    }
    
    stopTransition() {
        this.slotTween.setTimeScale(1000);
    }

    markConnected() {
        this.slotImage.setTexture(`${this.slotSymbol}${slotModifierConnected}`)
    }
}
