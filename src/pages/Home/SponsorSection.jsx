import React from 'react';
import sponsor1 from '../../assets/10min_schoolw.png'; // Replace with actual paths
import sponsor2 from '../../assets/codeacademyw.png'; // Replace with actual paths
import sponsor3 from '../../assets/udemy-logo (2).png'; // Replace with actual paths
import sponsor4 from '../../assets/khan-academy.png'; // Replace with actual paths
import sponsor5 from '../../assets/coursera.png'; // Replace with actual paths
// import sponsor6 from '../../assets/Coursera-logo-square.png'; // Replace with actual paths

const SponsorSection = () => {
    const sponsors = [sponsor1, sponsor2, sponsor3,sponsor4,sponsor5]; // Add more sponsors as needed

    return (
        <div className="bg-base-200 py-8 border border-red-400">
            <h2 className="text-2xl font-bold text-center mb-6">Our Sponsors</h2>
            <div className="flex justify-center items-center flex-wrap gap-4 md:gap-12 lg:gap-12">
                {sponsors.map((sponsor, index) => (
                    <div key={index} className="w-24 h-24 lg:w-32 lg:h-32 flex justify-center items-center">
                        <img src={sponsor} alt={`Sponsor ${index + 1}`} className="max-w-full max-h-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorSection;
