import Rank from '../data/rank';

const rankService = {
    async getAllRanks(): Promise<Rank[]> {
        return Rank.query();
    }
}

export default rankService;
