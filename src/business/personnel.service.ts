import Personnel from '../data/personnel';

const personnelService = {
    getByUnitId(unitId: number): Promise<{ firstName: string;
                                           lastName: string;
                                           middleName: string;
                                           calledAt: Date;
                                           demobilizationAt: Date;
                                           unit: {
                                               id: number;
                                               name: string;
                                           }; }[]> {
        return Personnel.getByUnitId(unitId).then(function (personnel) {
            return personnel.map(function(x) {
                return {
                    firstName: x.user.firstName,
                    lastName: x.user.lastName,
                    middleName: x.user.middleName,
                    calledAt: x.calledAt,
                    demobilizationAt: x.demobilizationAt,
                    unit: {
                        id: x.unit.id,
                        name: x.unit.name
                    }
                };
            });
        });
    }
};

export default personnelService;
