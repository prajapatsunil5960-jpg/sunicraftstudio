export const WHATSAPP_NUMBER = '918233850159';
export const WHATSAPP_DISPLAY = '8233850159';

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const categories = [
  { name: 'LED Photo Frames', icon: '✦', count: 1 },
  { name: 'Customized Frames', icon: '❑', count: 0 },
  { name: 'Handmade Frames', icon: '✿', count: 0 },
  { name: 'Acrylic Frames', icon: '◆', count: 0 },
  { name: 'Wooden Frames', icon: '⬡', count: 0 },
  { name: 'Photo Lamps', icon: '☀', count: 0 },
  { name: 'Mugs', icon: '☕', count: 0 },
  { name: 'Keychains', icon: '🔑', count: 0 },
  { name: 'Cushions', icon: '◈', count: 0 },
  { name: 'Clocks', icon: '◷', count: 0 },
  { name: 'Gift Sets', icon: '✲', count: 0 },
];

export const occasions = [
  'Birthday', 'Anniversary', 'Wedding', 'Engagement', "Valentine's Day",
  "Mother's Day", "Father's Day", 'Friendship Day', 'Raksha Bandhan',
  'Diwali', 'Christmas', 'New Year', 'Housewarming', 'Baby Shower', 'Graduation',
];

export const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Jaipur',
    rating: 5,
    product: 'LED Photo Frame',
    text: 'The LED frame exceeded my expectations! The glow is so beautiful and my husband absolutely loved it for our anniversary. Quality is premium.',
    image: 'https://images.pexels.com/photos/1820575/pexels-photo-1820575.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Rahul Verma',
    location: 'Delhi',
    rating: 5,
    product: 'Photo Collage Frame',
    text: 'Ordered a collage of 8 photos for my parents anniversary. The craftsmanship was incredible and delivery was fast. Highly recommend SuniCraftStudio!',
    image: 'https://images.pexels.com/photos/16160801/pexels-photo-16160801.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Anjali Mehta',
    location: 'Mumbai',
    rating: 5,
    product: 'Customized Mug',
    text: 'Got mugs printed for my entire friend group. The photo quality on the mug is sharp and has not faded after many washes. Loved it!',
    image: 'https://images.pexels.com/photos/28280965/pexels-photo-28280965.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Sunil Prajapat',
    location: 'Udaipur',
    rating: 5,
    product: 'Gift Hamper Set',
    text: 'The gift hamper was the perfect combo for my sister Raksha Bandhan. Everything was beautifully packaged and the personalization was spot on.',
    image: 'https://images.pexels.com/photos/38366748/pexels-photo-38366748.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export const faqs = [
  {
    q: 'How do I customize my product?',
    a: 'Simply choose a product, click Order on WhatsApp, and send us your photo and customization details. You can also fill out the order form on the product page with your text, photo, and delivery details.',
  },
  {
    q: 'What photo format should I upload?',
    a: 'We accept JPG, JPEG, and PNG files. For the best print quality, please upload high-resolution photos. We will send you a preview before printing for your approval.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most orders are dispatched within 2-3 business days and delivered within 5-7 days across India. You can mention your preferred delivery date and we will do our best to meet it.',
  },
  {
    q: 'Can I order in bulk for corporate gifting?',
    a: 'Yes! We handle bulk and corporate orders with special pricing. Contact us on WhatsApp at 8233850159 for a custom quote and bulk discount.',
  },
  {
    q: 'What is your return and refund policy?',
    a: 'Since every product is customized to your specifications, we do not accept returns. However, if your product arrives damaged or has a printing error, we will replace it free of charge.',
  },
  {
    q: 'How do I pay for my order?',
    a: 'You can pay via UPI, bank transfer, or cash on delivery (for select locations). Payment details are shared on WhatsApp once your order is confirmed.',
  },
];

