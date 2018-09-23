// e.g. https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=CmRaAAAA3oVbfcxcwOkGs9OZp_fi3SA6Uet_GbmuGyEimnJQxCmN4aZoNMAO8NQFCAepA0-Pw4rWLNwGOrNSY7qqMtlPtkLqen36U0F6b6kLBDSHVJUNLrS_8qTzt04FyJz3_5OLEhCLJnpT1G88za9-LP2b5YdxGhTMGzDIi1EE_PgHHYY0erTnlYS6EQ&key=AIzaSyAbqz9XQOVIFRtl6X1sovgna3SHDJHtKM0
const getGooglePlacesPhotoURI = (photoReference, maxHeight, googlePlacesAPIKey) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxheight=${maxHeight}&photoreference=${photoReference}&key=${googlePlacesAPIKey}`;
};

export default getGooglePlacesPhotoURI;
