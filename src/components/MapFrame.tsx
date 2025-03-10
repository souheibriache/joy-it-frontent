const MapFrame = () => {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13316.644349973129!2d2.3687998303822564!3d48.8546069580313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66c2d53f8d0cd%3A0xa8fabcd7afba85d!2sMydigitalschool%20Paris!5e0!3m2!1sen!2sfr!4v1739974975648!5m2!1sen!2sfr";

  return <iframe src={mapSrc} width="600" height="450" loading="lazy"></iframe>;
};

export default MapFrame;
