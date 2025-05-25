import React, { useEffect, useRef } from 'react';
import { Info, AlertCircle, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const DiseaseCard = ({ title, description, imagePath }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-[0_0_25px_#00ff99] transition-shadow"
    >
      <div className="grid md:grid-cols-12 gap-6 h-[500px]">
        <div className="relative overflow-hidden rounded-[50%] md:rounded-[0%] md:rounded-r-[0%] md:col-span-5">
          <img 
            src={imagePath} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        <div className="p-6 flex flex-col md:col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="text-green-60" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          <div className="mt-4 flex items-start gap-2">
            <AlertCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
            <p className="text-sm text-gray-500">
              Early detection and proper management practices are crucial for controlling this disease.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Diseases = () => {
  const location = useLocation();
  const diseaseRefs = useRef([]);

  const diseases = [
    {
      title: "Bacterial Leaf Blight",
      description: (
        <>
            <strong>Symptoms:</strong>
            <br />
            Water-soaked lesions on leaves, turning yellow and drying over time.
            <br /><br />
            <strong>Why It Happens:</strong>
            <br />
            Caused by bacteria thriving in high moisture and warm conditions.
            <br /><br />
            <strong>What To Do:</strong>
            <br />
            - Spray Copper Oxychloride or a suitable bactericide every 10–14 days.
            <br />
            - Avoid overhead irrigation and keep fields well-drained.
            <br />
            - Monitor closely during wet seasons.
        </>
    ),
      imagePath: "src/pages/PaddyDoctor/assets/disease images/craiyon_214624_Symptoms_of_Bacterial_Leaf_Blight_of_Rice.png"
    },
    {
      title: "Brown Spot",
      description: (
        <>
            <strong>Symptoms:</strong>
            <br />
            Dark brown spots on leaves, often with a yellow halo around them.
            <br /><br />
            <strong>Why It Happens:</strong>
            <br />
            Results from poor soil nutrition or high humidity.
            <br /><br />
            <strong>What To Do:</strong>
            <br />
            - Apply fungicides like Carbendazim or Bavistin at early signs.
            <br />
            - Use resistant seed varieties.
            <br />
            - Practice crop rotation to reduce disease buildup.
        </>
    ),
      imagePath: "src/pages/PaddyDoctor/assets/disease images/brownspot3-1024x683.jpg"
    },
    {
      title: "Healthy (No Disease)",
      description:  (
        <>
            <strong>Symptoms:</strong>
            <br />
            No visible damage; leaves appear lush green and healthy.
            <br /><br />
            <strong>Why It Happens:</strong>
            <br />
            Good farming practices and proper care.
            <br /><br />
            <strong>What To Do:</strong>
            <br />
            - Maintain current practices like balanced fertilization and timely irrigation.
            <br />
            - Regularly monitor fields to catch any issues early.
            
        </>
    ),
      imagePath: "src/pages/PaddyDoctor/assets/disease images/healthy.jpg"
    },
    {
      title: "Leaf Blast",
      description:  (
        <>
            <strong>Symptoms:</strong>
            <br />
            Grayish, elongated lesions on leaves; severely infected leaves may wither.
            <br /><br />
            <strong>Why It Happens:</strong>
            <br />
            Caused by fungi, often due to poor air circulation in dense crops.
            <br /><br />
            <strong>What To Do:</strong>
            <br />
            - Apply Tricyclazole or similar fungicides immediately after spotting symptoms.
            <br />
            - Ensure plants are spaced adequately to allow good air circulation.
            <br />
            - Avoid excessive nitrogen fertilizers.
        </>
    ),
      imagePath: "src/pages/PaddyDoctor/assets/disease images/leaf blast.jpg"
    },
    {
      title: "Sheath Blight",
      description:  (
        <>
            <strong>Symptoms:</strong>
            <br />
            Lesions on the leaf sheath that spread, causing the plant to dry prematurely.
            <br /><br />
            <strong>Why It Happens:</strong>
            <br />
            Fungal disease promoted by high planting density and excessive moisture.
            <br /><br />
            <strong>What To Do:</strong>
            <br />
            - Use fungicides like Pyricularia following label instructions.
            <br />
            - Avoid planting too densely.
            <br />
            - Improve field drainage to reduce excess water.
        </>
    ),
      imagePath: "src/pages/PaddyDoctor/assets/disease images/sheath blight.jpg"
    }
    // Add more diseases here
  ];

  useEffect(() => {
    if (location.state?.scrollToIndex !== undefined) {
      const targetRef = diseaseRefs.current[location.state.scrollToIndex];
      if (targetRef) {
        targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-390">
  <div className="container mx-auto px-4 py-8 bg-gray">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="space-y-8"
    >
      {diseases.map((disease, index) => (
        <div key={index} ref={el => diseaseRefs.current[index] = el}>
          <DiseaseCard 
            title={disease.title}
            description={disease.description}
            imagePath={disease.imagePath}
          />
        </div>
      ))}
    </motion.div>
  </div>
</div>

  );
};

export default Diseases;