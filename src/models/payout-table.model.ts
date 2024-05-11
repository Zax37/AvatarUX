import { slotSymbols } from "../enums/slot-symbols.enum";

export type PayoutTable = { [slotSymbol in slotSymbols]: { [n: number]: number } }
