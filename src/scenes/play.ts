import Phaser from "phaser";

import { SlotMachine } from "../objects/slotMachine.ts";

import { audioAssets } from "../enums/audio-assets.enum.ts";
import { cursors } from "../enums/cursors.enum.ts";
import { scenes } from "../enums/scenes.enum.ts";
import { uiAssets } from "../enums/ui-assets.enum.ts";

import { gameConfig } from "../constants/game-config.const.ts";
import { payoutEvent, spinEvent } from "../constants/events.const.ts";

export class Play extends Phaser.Scene {
    private slotMachine: SlotMachine;

    constructor() {
        super({key: scenes.play});
    }

    create(): void {
        this.cameras.main.fadeIn(500);
        this.slotMachine = new SlotMachine(this, gameConfig.width / 2, gameConfig.height / 2, 5, 3);

        this.volumeButton();
        this.titleText();
        this.spinButton();
        this.payoutText();
    }

    private volumeButton() {
        const volumeIcon = this.add.image(50, 50, uiAssets.volumeIcon).setInteractive();

        volumeIcon.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.input.setDefaultCursor(cursors.pointer);
        });

        volumeIcon.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.input.setDefaultCursor(cursors.default);
        });

        volumeIcon.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.sound.volume === 0) {
                this.sound.setVolume(1);
                volumeIcon.setTexture(uiAssets.volumeIcon);
                volumeIcon.setAlpha(1);
            } else {
                this.sound.setVolume(0);
                volumeIcon.setTexture(uiAssets.volumeIconOff);
                volumeIcon.setAlpha(.5)
            }
        });
    }

    private titleText() {
        const titleText = this.add.text(this.sys.game.scale.width / 2, this.sys.game.scale.height / 2,
            'AvatarUX Magnetic Slots\nClick the magnets to start!',
            {align: 'center', strokeThickness: 4, fontSize: 40, fontStyle: 'bold', color: '#8bbd5c'}
        ).setOrigin(.5).setDepth(3).setAngle(-1);

        this.add.tween({
            targets: titleText,
            ease: Phaser.Math.Easing.Sine.InOut,
            y: this.sys.game.scale.height / 2 - 20,
            angle: 1,
            repeat: -1,
            yoyo: true,
        });
        
        this.slotMachine.once(spinEvent, () => {
            this.sound.play(audioAssets.whoosh);
            this.add.tween({
                targets: titleText,
                ease: Phaser.Math.Easing.Bounce.InOut,
                y: -1000,
                onComplete: () => {
                    titleText.destroy();
                    this.sound.play(audioAssets.themeSong, {loop: true, volume: .4});
                }
            })
        });
    }

    private spinButton() {
        const spinButton = this.add.image(
            gameConfig.width - 100,
            gameConfig.height - 100,
            uiAssets.magnetButtonIcon
        ).setOrigin(.5).setScale(.5).setInteractive();

        spinButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            spinButton.setScale(.6);
            this.input.setDefaultCursor(cursors.pointer);
        });

        spinButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            spinButton.setScale(.5);
            this.input.setDefaultCursor(cursors.default);
        });

        let tween: Phaser.Tweens.TweenChain;
        spinButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.slotMachine.spinButtonClick();

            if (tween?.isPlaying()) {
                tween.setTimeScale(10 - tween.currentIndex * 5);
            } else {
                tween = this.add.tweenchain({
                    targets: spinButton,
                    tweens: [{
                        ease: Phaser.Math.Easing.Quadratic.InOut,
                        angle: 180,
                    }, {
                        delay: 150,
                        ease: Phaser.Math.Easing.Quadratic.InOut,
                        angle: 0,
                    }],
                });
            }
        });
    }

    private payoutText() {
        const payoutText = this.add.text(
            this.sys.game.scale.width / 2, 
            this.sys.game.scale.height - 100,
            '', 
            {align: 'center', strokeThickness: 4, fontSize: 40, fontStyle: 'bold', color: '#8bbd5c'}
        ).setOrigin(.5).setVisible(false);
        
        this.slotMachine.on(spinEvent, () => {
            payoutText.setVisible(false);
        });
        this.slotMachine.on(payoutEvent, (payoutValue: number) => {
            payoutText.setText(`Payout: ${payoutValue}`).setVisible(true);
        });
    }
}
