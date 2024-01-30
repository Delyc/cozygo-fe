import React, { useState } from 'react';
import PropertyCard from '../UI/cards/House';
import WishlistHouse from '../UI/cards/WishlistHouse';


const UserWishlist = () => {
    const [content, setContent] = useState<string | null>(null);
    const handleButtonClick = (newContent: string, cardIndex: number) => {
        setContent(newContent);
        setSelectedCard(cardIndex); 
      };
    
      const [selectedCard, setSelectedCard] = useState<number | null>(null);

      const dummyData = [
        {
          id: 1,
          bedrooms: 3,
          baths: 2,
          area: 1800,
          price: 250000,
          address: '123 Main St',
          googleMapLocation: 'https://www.google.com/maps?q=123+Main+St',
        },
        {
          id: 2,
          bedrooms: 4,
          baths: 3,
          area: 2200,
          price: 320000,
          address: '456 Elm St',
          googleMapLocation: 'https://www.google.com/maps?q=456+Elm+St',
        },
        {
          id: 3,
          bedrooms: 2,
          baths: 1,
          area: 1200,
          price: 180000,
          address: '789 Oak St',
          googleMapLocation: 'https://www.google.com/maps?q=789+Oak+St',
        },
        // Add more properties with individual Google Map locations
        {
          id: 4,
          bedrooms: 2,
          baths: 2,
          area: 1600,
          price: 210000,
          address: '321 Elmwood Ave',
          googleMapLocation: 'https://www.google.com/maps?q=321+Elmwood+Ave',
        },
        {
          id: 5,
          bedrooms: 5,
          baths: 4,
          area: 2800,
          price: 400000,
          address: '567 Willow Rd',
          googleMapLocation: 'https://www.google.com/maps?q=567+Willow+Rd',
        },
        // Add more properties with their own Google Map locations
      ];
      
      

    return (

       <div className='flex gap-5 py-10'>
        <div className="flex flex-col gap-4">
        {dummyData.map((property, index) => (
          <WishlistHouse
                key={property.id}
                bedrooms={property.bedrooms}
                baths={property.baths}
                area={property.area}
                price={property.price}
                address={property.address}
                onButtonClick={(newContent) => handleButtonClick(newContent, index)}
                isSelected={selectedCard === index}
                cardIndex={index} googleMapLocation={''}          />
        ))}
      </div>
        <div>
        {content ? (
          <div>{content}</div>
        ) : (
          <div>This is the empty div. Click a button to show different content.</div>
        )}

        </div>
       </div>
    )
}

export default UserWishlist;
