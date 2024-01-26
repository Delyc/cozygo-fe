import React, { useState } from 'react';
import HouseAgent from '../UI/cards/HouseAgent';

const AgentHouse = () => {

    return (

        <div className='px-20 py-20 flex flex-col gap-10 w-full'>

            <div>
                <button>add house</button>
            </div>
            <div className="container  w-full grid grid-cols-3 gap-6 2xl:gap-5">
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
                    address="Meadowview Lane, Tranquil Springs"
                />
            </div>

            <div></div>
        </div>
    )
}

export default AgentHouse;
