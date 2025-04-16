import React, { useState, useCallback } from 'react';
import { FaCar, FaBiking, FaTaxi, FaWheelchair } from 'react-icons/fa';
import { MdGpsFixed, MdLocationOn, MdPregnantWoman } from 'react-icons/md';
import { IoLanguage } from 'react-icons/io5';
import { GoogleMap, useJsApiLoader, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

const translations = {
  en: {
    chooseRide: 'Choose Your Ride',
    auto: 'Auto',
    bike: 'Bike',
    taxi: 'Taxi',
    disability: 'Disability Friendly',
    pregnancy: 'Pregnancy Friendly',
    location: 'Location',
    gps: 'GPS',
    manualEntry: 'Manual Entry',
    fromLocation: 'From Location',
    toLocation: 'To Location',
    enterFromLocation: 'Enter pickup location',
    enterToLocation: 'Enter drop location',
    fareEstimation: 'Fare Estimation',
    basedOn: 'Based on traffic & distance',
    enterDistance: 'Enter distance in km',
    estimatedFare: 'Estimated Fare',
    bookNow: 'Book Now'
  },
  mr: {
    chooseRide: 'आपली सवारी निवडा',
    auto: 'ऑटो',
    bike: 'बाइक',
    taxi: 'टॅक्सी',
    disability: 'दिव्यांग-मैत्रीपूर्ण',
    pregnancy: 'गर्भवती-मैत्रीपूर्ण',
    location: 'स्थान',
    gps: 'जीपीएस',
    manualEntry: 'स्वतः नमूद करा',
    fromLocation: 'पासून',
    toLocation: 'पर्यंत',
    enterFromLocation: 'पिकअप स्थान टाका',
    enterToLocation: 'सोडण्याचे स्थान टाका',
    fareEstimation: 'भाडे अंदाज',
    basedOn: 'वाहतूक आणि अंतरावर आधारित',
    enterDistance: 'अंतर किमी मध्ये टाका',
    estimatedFare: 'अंदाजे भाडे',
    bookNow: 'आता बुक करा'
  }
};

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '300px',
  marginTop: '1rem',
  borderRadius: '8px'
};

const center = {
  lat: 19.0760,
  lng: 72.8777
};

const DashBoard = () => {
  const [selectedRide, setSelectedRide] = useState('auto');
  const [locationType, setLocationType] = useState('gps');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [distance, setDistance] = useState(0);
  const [language, setLanguage] = useState('en');
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [directions, setDirections] = useState(null);
  const [fromAutocomplete, setFromAutocomplete] = useState(null);
  const [toAutocomplete, setToAutocomplete] = useState(null);
  
  const t = translations[language];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
    libraries
  });

  const onFromLoad = useCallback(autocomplete => {
    setFromAutocomplete(autocomplete);
  }, []);

  const onToLoad = useCallback(autocomplete => {
    setToAutocomplete(autocomplete);
  }, []);

  const calculateRoute = useCallback(() => {
    if (!fromAutocomplete || !toAutocomplete) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: fromAutocomplete.getPlace().formatted_address,
        destination: toAutocomplete.getPlace().formatted_address,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          // Update distance in kilometers
          const distanceInMeters = result.routes[0].legs[0].distance.value;
          setDistance(distanceInMeters / 1000);
        }
      }
    );
  }, [fromAutocomplete, toAutocomplete]);

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: 'white',
      minHeight: '100vh'
    },
    header: {
      color: 'rgb(168,213,226)',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem'
    },
    section: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(168,213,226,0.3)',
      marginBottom: '2rem'
    },
    rideOptions: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem'
    },
    rideOption: (isSelected) => ({
      padding: '1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: isSelected ? 'rgb(168,213,226)' : 'white',
      color: isSelected ? 'white' : 'rgb(168,213,226)',
      border: '2px solid rgb(168,213,226)',
      transition: 'all 0.3s ease'
    }),
    locationInput: {
      width: '100%',
      padding: '0.8rem',
      borderRadius: '8px',
      border: '2px solid rgb(168,213,226)',
      marginTop: '1rem'
    },
    button: {
      backgroundColor: 'rgb(168,213,226)',
      color: 'white',
      padding: '0.8rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    fareEstimate: {
      fontSize: '1.5rem',
      color: 'rgb(168,213,226)',
      fontWeight: 'bold'
    }
  };

  const handleLocationTypeChange = (type) => {
    setLocationType(type);
    if (type === 'gps') {
      // Simulating GPS location fetch
      setFromLocation('Current Location');
      setToLocation('');
    } else {
      setFromLocation('');
      setToLocation('');
    }
  };

  const calculateFare = () => {
    if (distance <= 0) return '₹0';
    
    let baseFare = 0;
    let perKmRate = 0;
    let specialNeedsSurcharge = 0;

    // Add surcharge for special needs
    if (specialNeeds) {
      specialNeedsSurcharge = 20; // Extra ₹20 for special needs services
    }
    
    switch(selectedRide) {
      case 'auto':
        baseFare = 20;
        perKmRate = 10;
        break;
      case 'bike':
        baseFare = 15;
        perKmRate = 8;
        break;
      case 'taxi':
        baseFare = 30;
        perKmRate = 12;
        break;
      default:
        return '₹0';
    }
    
    const totalFare = baseFare + (distance * perKmRate) + specialNeedsSurcharge;
    return `₹${totalFare}`;
    ;
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={styles.header}>MyRoute Dashboard</h1>
        <div 
          onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgb(168,213,226)' }}
        >
          <IoLanguage size={24} /> {language.toUpperCase()}
        </div>
      </div>
      
      {/* Ride Options */}
      <div style={styles.section}>
        <h2>{t.chooseRide}</h2>
        <div style={styles.rideOptions}>
          <div 
            style={styles.rideOption(selectedRide === 'auto')}
            onClick={() => setSelectedRide('auto')}
          >
            <FaCar /> {t.auto}
          </div>
          <div 
            style={styles.rideOption(selectedRide === 'bike')}
            onClick={() => setSelectedRide('bike')}
          >
            <FaBiking /> {t.bike}
          </div>
          <div 
            style={styles.rideOption(selectedRide === 'taxi')}
            onClick={() => setSelectedRide('taxi')}
          >
            <FaTaxi /> {t.taxi}
          </div>
        </div>

        {/* Special Needs Options */}
        <div style={{ marginTop: '1rem' }}>
          <div 
            style={{
              ...styles.rideOption(specialNeeds === 'disability'),
              marginBottom: '0.5rem'
            }}
            onClick={() => setSpecialNeeds(specialNeeds === 'disability' ? false : 'disability')}
          >
            <FaWheelchair /> {t.disability}
          </div>
          <div 
            style={styles.rideOption(specialNeeds === 'pregnancy')}
            onClick={() => setSpecialNeeds(specialNeeds === 'pregnancy' ? false : 'pregnancy')}
          >
            <MdPregnantWoman /> {t.pregnancy}
          </div>
        </div>
      </div>

      {/* Location Input */}
      <div style={styles.section}>
        <h2>{t.location}</h2>
        <div style={styles.rideOptions}>
          <div 
            style={styles.rideOption(locationType === 'gps')}
            onClick={() => handleLocationTypeChange('gps')}
          >
            <MdGpsFixed /> {t.gps}
          </div>
          <div 
            style={styles.rideOption(locationType === 'manual')}
            onClick={() => handleLocationTypeChange('manual')}
          >
            <MdLocationOn /> {t.manualEntry}
          </div>
        </div>
        {locationType === 'manual' ? (
          <div>
            {isLoaded ? (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t.fromLocation}</label>
                  <Autocomplete
                    onLoad={onFromLoad}
                    onPlaceChanged={calculateRoute}
                  >
                    <input
                      type="text"
                      placeholder={t.enterFromLocation}
                      style={styles.locationInput}
                    />
                  </Autocomplete>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t.toLocation}</label>
                  <Autocomplete
                    onLoad={onToLoad}
                    onPlaceChanged={calculateRoute}
                  >
                    <input
                      type="text"
                      placeholder={t.enterToLocation}
                      style={styles.locationInput}
                    />
                  </Autocomplete>
                </div>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={12}
                >
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        ) : (
          <div style={{ marginTop: '1rem' }}>Using GPS location</div>
        )}
      </div>

      {/* Fare Estimation */}
      <div style={styles.section}>
        <h2>{t.fareEstimation}</h2>
        <p>{t.basedOn}</p>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="number"
            placeholder={t.enterDistance}
            style={styles.locationInput}
            value={distance}
            onChange={(e) => setDistance(Math.max(0, parseFloat(e.target.value) || 0))}
            min="0"
            step="0.1"
          />
        </div>
        <div style={styles.fareEstimate}>
          {t.estimatedFare}: {calculateFare()}
        </div>
        <button style={styles.button}>{t.bookNow}</button>
      </div>
    </div>
  );
};

export default DashBoard;
