import { PayoutTable } from "../models/payout-table.model.ts";
import { slotSymbols } from "../enums/slot-symbols.enum.ts";

export const payoutsTable: PayoutTable = {
    [slotSymbols.s9]: {
        3: 0.2,
        4: 0.4,
        5: 0.6,
        6: 0.8,
    },
    [slotSymbols.s10]: {
        3: 0.1,
        4: 0.3,
        5: 0.5,
        6: 0.7,
    },
    [slotSymbols.sA]: {
        3: 0.1,
        4: 0.2,
        5: 0.4,
        6: 0.6,
    },
    [slotSymbols.sH1]: {
        3: 0.1,
        4: 0.2,
        5: 0.3,
        6: 0.4,
    },
    [slotSymbols.sH2]: {
        3: 0.1,
        4: 0.2,
        5: 0.3,
        6: 0.5,
    },
    [slotSymbols.sH3]: {
        3: 0.1,
        4: 0.2,
        5: 0.4,
        6: 0.6,
    },
    [slotSymbols.sH4]: {
        3: 0.1,
        4: 0.3,
        5: 0.5,
        6: 0.8,
    },
    [slotSymbols.sH5]: {
        3: 0.2,
        4: 0.4,
        5: 0.7,
        6: 0.9,
    },
    [slotSymbols.sH6]: {
        3: 0.2,
        4: 0.4,
        5: 0.7,
        6: 1.0,
    },
    [slotSymbols.sJ]: {
        2: 0.2,
        3: 1.0,
        4: 1.5,
        5: 2.0,
        6: 2.5,
    },
    [slotSymbols.sK]: {
        3: 0.7,
        4: 1.2,
        5: 1.5,
        6: 2.0,
    },
    [slotSymbols.sM1]: {
        3: 0.2,
        4: 0.5,
        5: 1.0,
        6: 1.6,
    },
    [slotSymbols.sM2]: {
        3: 0.3,
        4: 0.6,
        5: 1.2,
        6: 1.8,
    },
    [slotSymbols.sM3]: {
        3: 0.3,
        4: 0.7,
        5: 1.5,
        6: 2.0,
    },
    [slotSymbols.sM4]: {
        3: 0.4,
        4: 0.8,
        5: 1.7,
        6: 2.2,
    },
    [slotSymbols.sM5]: {
        3: 0.5,
        4: 1.0,
        5: 1.8,
        6: 2.5,
    },
    [slotSymbols.sM6]: {
        2: 0.2,
        3: 0.5,
        4: 1.0,
        5: 2.0,
        6: 2.5,
    },
    [slotSymbols.sQ]: {
        2: 0.5,
        3: 1.0,
        4: 1.5,
        5: 2.5,
        6: 3.0,
    },
};
