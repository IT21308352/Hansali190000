import React from "react";

const VarietyRecommendationProcess = () => {
  const processSteps = [
    {
      title: "1. Selection of Parents",
      description: "Parental rice varieties with desirable traits such as high yield, disease resistance, pest tolerance, and grain quality are selected. These traits may also include adaptability to different environmental conditions and consumer preferences like taste or cooking quality.",
      purpose: "To ensure that the resulting hybrid has improved characteristics compared to existing varieties."
    },
    {
      title: "2. Hybridization",
      description: "Cross-breeding of selected parent varieties is conducted. Pollen from one parent is transferred to the stigma of another, creating a hybrid with genetic material from both parents.",
      purpose: "To combine the desirable traits of both parents in a single plant, aiming to produce a superior hybrid."
    },
    {
      title: "3. F1 Generation",
      description: "The first generation of plants resulting from the hybridization process. These plants often exhibit heterosis (hybrid vigor), displaying improved growth and yield characteristics.",
      purpose: "To observe initial results of the cross and identify plants with promising traits for further breeding."
    },
    {
      title: "4. F2 - F4 Generations",
      description: "Subsequent generations are grown from F1 seeds through self-pollination. During this phase:\n" +
        "- Selection of the bulk population is performed, where plants with undesirable traits are removed\n" +
        "- Screening for major pests and diseases begins to identify resistance\n" +
        "- The pedigree selection process starts, where plants with the best traits are chosen for further propagation",
      purpose: "To stabilize the genetic traits of the hybrid and improve pest and disease resistance."
    },
    {
      title: "5. F5 Generation Onwards",
      description: "Homogeneous (genetically stable) advanced lines are developed. These lines undergo:\n" +
        "- More intensive screening for pests and diseases\n" +
        "- Assessment of agronomic traits like plant height, flowering duration, and grain quality",
      purpose: "To develop pure lines with stable and uniform traits."
    },
    {
      title: "6. Preliminary Yield Trial (PYT) and Major Yield Trial (MYT)",
      description: "Preliminary Yield Trial (PYT):\n" +
        "- Newly developed lines are tested on a small scale to assess their yield potential under controlled conditions\n\n" +
        "Major Yield Trial (MYT):\n" +
        "- Promising lines from PYT are tested in diverse locations\n" +
        "- Screening for major pests, diseases, and grain quality (e.g., aroma, texture, and taste) is performed rigorously",
      purpose: "To eliminate underperforming lines and select the best-performing ones for further trials."
    },
    {
      title: "7. National Coordinated Rice Varietal Testing (NCRVT)",
      description: "Promising varieties undergo large-scale, national-level trials coordinated by research organizations across multiple agro-ecological zones.\n" +
        "Performance is assessed for:\n" +
        "- Yield potential\n" +
        "- Resistance to pests/diseases\n" +
        "- Grain quality\n" +
        "- Adaptability",
      purpose: "To ensure the variety performs well in different environmental and farming conditions across the country."
    },
    {
      title: "8. Varietal Adaptability Testing (VAT)",
      description: "The selected lines are tested for adaptability to specific regions. These tests include:\n" +
        "- Distinctness, Uniformity, and Stability Test (DUST): Ensures the variety is distinct, uniform, and stable\n" +
        "- Nitrogen Response Trial (NRT): Evaluates the variety's response to different levels of nitrogen fertilizer",
      purpose: "To confirm the variety's adaptability, stability, and response to agronomic inputs."
    },
    {
      title: "9. Large Scale VAT (LSVAT)",
      description: "The variety is tested on larger plots and under farmer-like conditions. This phase involves assessing:\n" +
        "- Scalability\n" +
        "- Performance consistency\n" +
        "- Farmer acceptability",
      purpose: "To simulate real-world farming conditions and validate the variety's commercial viability."
    },
    {
      title: "10. Variety Releasing Committee (VRC)",
      description: "A regulatory body evaluates the findings of all trials to ensure the variety meets the required standards for:\n" +
        "- High yield potential\n" +
        "- Resistance to pests and diseases\n" +
        "- Adaptability\n" +
        "- Grain quality",
      purpose: "To provide official approval for the release of the variety."
    },
    {
      title: "11. Newly Released Rice Variety",
      description: "Once approved by the VRC, the new variety is released for commercial cultivation, accompanied by guidelines for farmers regarding:\n" +
        "- Planting techniques\n" +
        "- Irrigation requirements\n" +
        "- Pest management",
      purpose: "To provide farmers with access to improved rice varieties that boost productivity and income."
    },
    {
      title: "12. Seed Production Stages",
      description: "Breeder Seeds (Br):\n" +
        "- Initial seeds produced under controlled conditions by research organizations\n\n" +
        "Foundation Seeds (Fd):\n" +
        "- Derived from breeder seeds, produced under strict standards\n\n" +
        "Registered Seeds (Rg):\n" +
        "- Derived from foundation seeds, slightly relaxed in purity standards\n\n" +
        "Certified Seeds (Ct):\n" +
        "- Distributed to farmers for large-scale cultivation",
      purpose: "To establish a standardized and scalable seed production process that ensures genetic integrity and quality for farmers."
    }
  ];

  return (
    <div className="max-w-8xl mx-auto px-4 py-12 min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Rice Variety Development Process
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          The comprehensive process of developing and recommending rice varieties suitable for diverse conditions in Sri Lanka
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and First Steps */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="/images/variety-recommendation-img.JPG"
              alt="Rice Variety Development"
              className="w-full h-100 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-green-700 mb-4">
                Scientific Rice Breeding Process
              </h2>
              <p className="text-gray-600">
                The development of new rice varieties involves meticulous scientific processes spanning several years to ensure superior quality, yield, and adaptability.
              </p>
            </div>
          </div>

          {processSteps.slice(0, 6).map((step, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              </div>
              <div className="pl-14">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                  <p className="text-gray-700 whitespace-pre-line">{step.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Purpose</h4>
                  <p className="text-gray-700">{step.purpose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Remaining Steps */}
        <div className="space-y-8">
          {processSteps.slice(6).map((step, index) => (
            <div key={index + 6} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 7}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              </div>
              <div className="pl-14">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                  <p className="text-gray-700 whitespace-pre-line">{step.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Purpose</h4>
                  <p className="text-gray-700">{step.purpose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VarietyRecommendationProcess;