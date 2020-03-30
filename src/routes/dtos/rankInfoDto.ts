import Rank from '../../data/rank';

export class RankInfoDto {
    id: number;
    name: string;
    value: number;

    constructor(rank: Rank) {
        this.id = rank.id;
        this.name = rank.name;
        this.value = rank.value;
    }
}
