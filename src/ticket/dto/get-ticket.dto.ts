export class TicketDto {
    readonly id: string;
    readonly numbers: number[];
    readonly length: number;
    readonly status: string;
}

export class Bet {
    readonly id: string;
    readonly numbers: number[];
    readonly length: number;
    readonly betId: string;
}