import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardGrid = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      name: "Bacterial Leaf Blight",
      detail: "Caused by bacteria thriving in high moisture and warm conditions",
      image: "src/pages/PaddyDoctor/assets/disease images/craiyon_214624_Symptoms_of_Bacterial_Leaf_Blight_of_Rice.png",
      diseaseIndex: 0
    },
    {
      id: 2,
      name: "Brown Spot",
      detail: "Results from poor soil nutrition or high humidity.",
      image: "src/pages/PaddyDoctor/assets/disease images/brownspot3-1024x683.jpg",
      diseaseIndex: 1
    },
    {
      id: 3,
      name: "Healthy (No Disease)",
      detail: "Good farming practices and proper care.",
      image: "src/pages/PaddyDoctor/assets/disease images/healthy.jpg",
      diseaseIndex: 2
    },
    {
      id: 4,
      name: "Leaf Blast",
      detail: "Caused by fungi, often due to poor air circulation in dense crops.",
      image: "src/pages/PaddyDoctor/assets/disease images/leaf blast.jpg",
      diseaseIndex: 3
    },
    {
      id: 5,
      name: "Sheath Blight",
      detail: "Fungal disease promoted by high planting density and excessive moisture.",
      image: "src/pages/PaddyDoctor/assets/disease images/sheath blight.jpg",
      diseaseIndex: 4
    },
    {
      id: 6,
      name: "Rice false smut",
      detail: "A viral disease transmitted by green leafhoppers",
      image: "src/pages/PaddyDoctor/assets/disease images/rice false smut.jpg",
      diseaseIndex: 5
    }
  ];

  const handleMoreInfo = (diseaseIndex) => {
    navigate('/disease', { state: { scrollToIndex: diseaseIndex } });
  };

  return (
    <div className="bg-white px-16 py-16 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.name}</h3>
              <p className="text-gray-600 text-sm">{card.detail}</p>
            </div>
            <div className="p-4 pt-0">
              <button 
                onClick={() => handleMoreInfo(card.diseaseIndex)}
                className="w-full bg-green-900 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200"
              >
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;