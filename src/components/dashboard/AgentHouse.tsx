import React, { useState } from 'react';
import HouseAgent from '../UI/cards/HouseAgent';
import AddHouse from '../modals/AddHouse';
import HouseForm from '../forms/HouseForm';

const AgentHouse = () => {
    const [showAddHouseModal, setShowAddHouseModal] = useState(false);

    const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
    const handleCloseAddHouseModal = () => setShowAddHouseModal(false);

    return (



            <div className="   justify-center flex flex-wrap gap-4 2xl:gap-8">
                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />
                 <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />
                 <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />
                 <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="Meadowview Lane, Tranquil Springs"
                />

                <HouseAgent
                    bedrooms={3}
                    baths={3}
                    area={340}
                    price={25000.00}
                    address="test house edit "
                />

            <AddHouse show={showAddHouseModal} onClose={handleCloseAddHouseModal}>
                <HouseForm />
            </AddHouse>

        </div>
    )
}

export default AgentHouse;
