const images = {
  aloo_paratha: 'aloo_paratha.JPG',
  baingan_barta: 'baingan_barta.JPG',
  butter_chicken: 'butter_chicken.JPG',
  catering_samosa: 'catering_samosa.JPG',
  chana_masala: 'chana_masala.JPG',
  chicken_biryani: 'chicken_biryani.JPG',
  chicken_biryanis: 'chicken_biryanis.JPG',
  chicken_kofta: 'chicken_kofta.JPG',
  chicken_korma: 'chicken_korma.JPG',
  chicken_vindaloo: 'chicken_vindaloo.JPG',
  chivda: 'chivda.JPG',
  kheer: 'kheer.JPG',
  kulchas: 'kulchas.JPG',
  lachha_paratha: 'lachha_paratha.JPG',
  lamb_curry: 'lamb_curry.JPG',
  lemonade: 'lemonade.JPG',
  mango_kulfi: 'mango_kulfi.JPG',
  mango_lassi: 'mango_lassi.JPG',
  pakoras: 'pakoras.JPG',
  paneer_makhani: 'paneer_makhani.JPG',
  paneer_tikka_masala: 'paneer_tikka_masala.JPG',
  potato_chips: 'potato_chips.JPG',
  rasgulla: 'rasgulla.JPG',
  rice_aloo_palak: 'rice_aloo_palak.JPG',
  roasted_chickpeas: 'roasted_chickpeas.JPG',
  safron_rice: 'safron_rice.JPG',
  vegetable_biryani: 'vegetable_biryani.JPG',

  // Add all the other images here, following the same pattern
};

export async function getImageSource(imageName) {
  const imagePath = images[imageName];
  if (!imagePath) return null;
  try {
    const imageModule = await import(`../data/${imagePath}`);
    return imageModule.default;
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
}

