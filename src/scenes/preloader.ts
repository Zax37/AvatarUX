import Phaser from "phaser";

import { audioAssets } from "../enums/audio-assets.enum.ts";
import { scenes } from "../enums/scenes.enum.ts";
import { slotSymbols } from "../enums/slot-symbols.enum.ts";
import { uiAssets } from "../enums/ui-assets.enum.ts";

import { slotModifierConnected } from "../constants/slot.const.ts";

export class Preloader extends Phaser.Scene {
    constructor() {
        super({key: scenes.preloader});
    }

    preload(): void {
        this.load.setPath('assets/');

        Object.values(audioAssets).forEach((audioAsset: audioAssets) => {
            this.load.audio(audioAsset, `audio/${audioAsset}.mp3`);
        });
        Object.values(slotSymbols).forEach((slotSymbol: slotSymbols) => {
            this.load.image(slotSymbol, `symbols/${slotSymbol}.png`);
            this.load.image(`${slotSymbol}${slotModifierConnected}`, `symbols/${slotSymbol}${slotModifierConnected}.png`);
        });
        Object.values(uiAssets).forEach((uiAsset: uiAssets) => {
            this.load.image(uiAsset, `ui/${uiAsset}.png`);
        });
    }

    create(): void {
        this.scene.start(scenes.play);
    }
}
