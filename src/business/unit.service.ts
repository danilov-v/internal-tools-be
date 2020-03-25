import Unit from "../data/unit";
import handbookService from "./handbook.service";
import logger from "../common/logger";

const unitService = {

    /**
     * В случае обнаружения в базе данных юнита с полученными параметрами возвращает найденный юнит,
     * иначе создает в бд новый объект с этими параметрами и возвращает его.
     *
     * @param query параметры запроса.
     * Имеет следующий вид
     * {
     *   name:       string             -> имя подразделения ('1 отделение', '3 взвод'...),
     *   parentUnit: number | undefined -> родитель подразделения или undefined
     *                                     (В этом случае родителем будет считаться корневой элемент,
     *                                     в случае с РИТ, корневым будет рота)
     *   typeId:     number             -> тип подразделения (взвод, рота, дивизион, отделение, факультет...)
     * }
     * @return промис, содержащий Unit, с конкретным id(необходимо, чтобы связать несколько подразделений между собой).
     * В случае возникновения ошибки возвращает <code>null</code>.
     */
    async findOrCreate(query): Promise<Unit | null> {
        const params = Object.create(query);
        try {
            if (!params.parentUnit) {
                params.parentUnit = await handbookService.getRootUnitId();
            }
            const units = await Unit.query()
                .where('name', params.name)
                .where('parent_unit', params.parentUnit)
                .where('type_id', params.typeId);

            return units.length
                ? units[0]
                : Unit.query().insert(params);
        } catch (e) {
            logger.error(e);
            return query;
        }
    },

    /**
     * Находит и возвращает объект Unit по полученному id либо <code>null</code>, если такого объекта не существует.
     * @param unitId идентификатор сущности.
     */
    async findUnit(unitId): Promise<Unit> {
        try {
            return Unit.query().findById(unitId);
        } catch (e) {
            logger.error(e);
            return null;
        }
    }
}

export default unitService;
