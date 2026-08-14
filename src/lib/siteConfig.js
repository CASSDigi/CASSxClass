export const SITE = {
  name: "CASSxClass",
  tagline: "Details Define You",
  gmail: "cass41000@gmail.com",
  whatsapp: "923479119430", // no plus sign, digits only, used in wa.me links
  whatsappDisplay: "+92 347 9119430",
  socials: {
    instagram: "https://instagram.com/cassxclass",
    tiktok: "https://tiktok.com/@cassxclass",
    facebook: "https://facebook.com/cassxclass",
    pinterest: "https://pinterest.com/cassxclass",
  },
};

export const waLink = (message = "Hi CASSxClass, I have a question about your products.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
