import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const facilityStatusColors = {
  Low: 'bg-green-500',
  Medium: 'bg-yellow-500',
  High: 'bg-red-500',
};

const facilityMockData = [
  {
    id: 1,
    name: 'Adventure Trail',
    status: 'Operational',
    crowd_status: 'Medium',
    coordinates: { top: '73%', left: '40%' },
  },
  {
    id: 2,
    name: 'Spa Center',
    status: 'Operational',
    crowd_status: 'Low',
    coordinates: { top: '35%', left: '60%' },
  },
  {
    id: 3,
    name: 'Snow Sports Centre',
    status: 'Operational',
    crowd_status: 'High',
    coordinates: { top: '50%', left: '30%' },
  },
  {
    id: 4,
    name: 'Swimming Pool',
    status: 'Operational',
    crowd_status: 'Low',
    coordinates: { top: '50%', left: '80%' },
  },
  {
    id: 5,
    name: 'Entertainment Area',
    status: 'Operational',
    crowd_status: 'High',
    coordinates: { top: '60%', left: '82%' },
  },
  {
    id: 6,
    name: 'Sports Complex',
    status: 'Operational',
    crowd_status: 'High',
    coordinates: { top: '74%', left: '62%' },
  },
];

export default function FacilityMap() {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    // Replace this with an API call to fetch live data
    setFacilities(facilityMockData);
  }, []);

  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
  };

  return (
    <div className="relative w-full max-w-full mx-auto my-4">
      {/* Resort Map */}
      <div className="relative w-full h-[500px] sm:h-[700px] lg:h-[800px]">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5a1356fc4c326df067f1e366/4c88413b-fceb-400b-9e44-0d21c11f7c2a/Warmwell_Map_Illustration.jpg"
          alt="Resort Map"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />

        {/* Facility Markers */}
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="absolute flex flex-col items-center cursor-pointer"
            style={{
              top: facility.coordinates.top,
              left: facility.coordinates.left,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => handleFacilityClick(facility)}
          >
            <div
              className={`text-white ${facilityStatusColors[facility.crowd_status]} px-2 py-1 rounded-full mb-1`}
            >
              {facility.crowd_status}
            </div>
            <div className="bg-white/90 backdrop-blur rounded-md shadow border border-gray-200 px-2 py-1 text-xs text-center">
              <div className="flex items-center gap-1">
                <MapPin size={12} /> {facility.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Facility Details Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-xl font-semibold">{selectedFacility.name}</h2>
            <p className="mt-2 text-sm">
              <strong>Status:</strong> {selectedFacility.status}
            </p>
            <p className="text-sm">
              <strong>Crowd Status:</strong> 
              <span className={`px-2 py-1 rounded-full ${facilityStatusColors[selectedFacility.crowd_status]} text-white`}>
                {selectedFacility.crowd_status}
              </span>
            </p>
            <button
              onClick={() => setSelectedFacility(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
