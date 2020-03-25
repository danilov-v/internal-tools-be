import Unit from "../data/unit";

const handbookService = {

    //TODO: вынести в константу при первом запросе.
    async getRootUnitId(): Promise<number> {
        const unit = await Unit.query()
            .findOne('name', 'like', 'рота%')
        return unit.id;
    }
};

export default handbookService;
