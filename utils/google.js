// Declare dependencies


// Function getAttributes()
function getAttributes(address, type, component) {
  switch (type) {
    // Geolocation state
    case 'administrative_area_level_1':
      address.geolocation.state = component.long_name;
      break;
    // Geolocation city
    case 'administrative_area_level_2':
      address.geolocation.city = component.long_name;
      break;
    // Geolocation neighborhood
    case 'administrative_area_level_3':
      address.geolocation.neighborhood = component.long_name;
      break;
    // Geolocation country
    case 'country':
      address.geolocation.country = component.long_name;
      break;
    // Street
    case 'route':
      address.street = component.long_name;
      break;
    // Street number
    case 'street_number':
      address.number = component.long_name;
      break;
    default:
      break;
  }
  return address;
}

// Function getGeometry()
function getGeometry(geometry) {
  return {
    coordinates: {
      latitude: Object.prototype.hasOwnProperty.call(geometry, 'location') && Object.prototype.hasOwnProperty.call(geometry.location, 'lat')
        ? geometry.location.lat
        : null,
      longitude: Object.prototype.hasOwnProperty.call(geometry, 'location') && Object.prototype.hasOwnProperty.call(geometry.location, 'lng')
        ? geometry.location.lng
        : null,
    },
    location: Object.prototype.hasOwnProperty.call(geometry, 'location_type') ? geometry.location_type : null,
    viewport: {
      northeast: {
        latitude: Object.prototype.hasOwnProperty.call(geometry, 'viewport') && Object.prototype.hasOwnProperty.call(geometry.viewport, 'northeast') &&
          Object.prototype.hasOwnProperty.call(geometry.viewport.northeast, 'lat') ? geometry.viewport.northeast.lat : null,
        longitude: Object.prototype.hasOwnProperty.call(geometry, 'viewport') && Object.prototype.hasOwnProperty.call(geometry.viewport, 'northeast') &&
          Object.prototype.hasOwnProperty.call(geometry.viewport.northeast, 'lng') ? geometry.viewport.northeast.lng : null,
      },
      southwest: {
        latitude: Object.prototype.hasOwnProperty.call(geometry, 'viewport') && Object.prototype.hasOwnProperty.call(geometry.viewport, 'southwest') &&
          Object.prototype.hasOwnProperty.call(geometry.viewport.southwest, 'lat') ? geometry.viewport.southwest.lat : null,
        longitude: Object.prototype.hasOwnProperty.call(geometry, 'viewport') && Object.prototype.hasOwnProperty.call(geometry.viewport, 'southwest') &&
          Object.prototype.hasOwnProperty.call(geometry.viewport.southwest, 'lng') ? geometry.viewport.southwest.lng : null,
      },
    },
  };
}

// Export function cleanCharacters()
exports.cleanCharacters = (string) => {
  let clean = string;
  const replaces = [
    { character: 'À', value: 'A' },
    { character: 'Á', value: 'A' },
    { character: 'Â', value: 'A' },
    { character: 'Ã', value: 'A' },
    { character: 'Ä', value: 'A' },
    { character: 'Å', value: 'A' },
    { character: 'Æ', value: 'AE' },
    { character: 'à', value: 'a' },
    { character: 'á', value: 'a' },
    { character: 'â', value: 'a' },
    { character: 'ã', value: 'a' },
    { character: 'ä', value: 'a' },
    { character: 'å', value: 'a' },
    { character: 'æ', value: 'ae' },
    { character: 'È', value: 'E' },
    { character: 'É', value: 'E' },
    { character: 'Ê', value: 'E' },
    { character: 'Ë', value: 'E' },
    { character: 'è', value: 'e' },
    { character: 'é', value: 'e' },
    { character: 'ê', value: 'e' },
    { character: 'ë', value: 'e' },
    { character: 'Ì', value: 'I' },
    { character: 'Í', value: 'I' },
    { character: 'Î', value: 'I' },
    { character: 'Ï', value: 'I' },
    { character: 'ì', value: 'i' },
    { character: 'í', value: 'i' },
    { character: 'î', value: 'i' },
    { character: 'ï', value: 'i' },
    { character: 'Ò', value: 'O' },
    { character: 'Ó', value: 'O' },
    { character: 'Ô', value: 'O' },
    { character: 'Õ', value: 'O' },
    { character: 'Ö', value: 'O' },
    { character: 'Ø', value: 'O' },
    { character: 'Œ', value: 'OE' },
    { character: 'ò', value: 'o' },
    { character: 'ó', value: 'o' },
    { character: 'ô', value: 'o' },
    { character: 'õ', value: 'o' },
    { character: 'ö', value: 'o' },
    { character: 'ø', value: 'o' },
    { character: 'œ', value: 'oe' },
    { character: 'Ù', value: 'U' },
    { character: 'Ú', value: 'U' },
    { character: 'Û', value: 'U' },
    { character: 'Ü', value: 'U' },
    { character: 'ù', value: 'u' },
    { character: 'ú', value: 'u' },
    { character: 'û', value: 'u' },
    { character: 'ü', value: 'u' },
    { character: 'Ç', value: 'C' },
    { character: 'Ð', value: 'E' },
    { character: 'Ñ', value: 'N' },
    { character: 'Š', value: 'S' },
    { character: 'Ý', value: 'Y' },
    { character: 'Ÿ', value: 'Y' },
    { character: 'ç', value: 'c' },
    { character: 'ð', value: 'e' },
    { character: 'ñ', value: 'n' },
    { character: 'š', value: 's' },
    { character: 'ý', value: 'y' },
    { character: 'ÿ', value: 'y' },
    { character: ' ', value: '+' },
  ];
  replaces.forEach((replace) => {
    const reg = new RegExp(replace.character, 'g');
    clean = clean.replace(reg, replace.value);
  });
  return clean;
};

// Export function getFormatted()
exports.getFormatted = () => ({
  geolocation: {
    city: null,
    country: null,
    neighborhood: null,
    state: null,
  },
  geometry: {
    coordinates: {
      latitude: null,
      longitude: null,
    },
    location: null,
    viewport: {
      northeast: {
        latitude: null,
        longitude: null,
      },
      southwest: {
        latitude: null,
        longitude: null,
      },
    },
  },
  location: null,
  partial_match: null,
  number: null,
  street: null,
});

// Export function getGeometry()
exports.parser = (formatted, address) => {
  if (address && Object.prototype.hasOwnProperty.call(address, 'status') && Object.prototype.hasOwnProperty.call(address, 'results')) {
    if (address.status === 'OK' && address.results.length > 0) {
      address.results.forEach((result) => {
        result.address_components.forEach((component) => {
          component.types.forEach((type) => {
            formatted = getAttributes(formatted, type, component);
          });
        });
        if (Object.prototype.hasOwnProperty.call(result, 'geometry')) {
          formatted.geometry = getGeometry(result.geometry);
        }
        formatted.location = result.formatted_address;
        if (Object.prototype.hasOwnProperty.call(result, 'partial_match')) {
          formatted.partial_match = result.partial_match;
        }
      });
      return formatted;
    }
  }
  return null;
};
