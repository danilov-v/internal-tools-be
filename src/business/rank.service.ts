import Rank from '../data/rank';

const rankService = {
    async getAllRanks(): Promise<Rank[]> {
        return Rank.query();
    },

    async getRankById(rankId: number): Promise<Rank> {
        return (await Rank.query().findById(rankId)) || {} as Rank;
    }
};

export default rankService;
