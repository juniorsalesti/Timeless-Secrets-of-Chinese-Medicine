import { Recipe } from '../types';

export const BOOK_METADATA = {
  title: "Ancient Secrets of Chinese Medicine",
  subtitle: "100 Traditional Recipes Inspired by Eastern Wisdom for Everyday Wellness",
  author: "Master Lin",
  coverDescription: "The cover art showcases the warm and serene figure of Master Lin, an elderly Asian woman with kind eyes and a gentle smile, dressed in a natural beige linen robe. She tenderly cradles a steaming handcrafted ceramic teacup with both hands. Surrounding her portrait, traditional botanicals drift in harmonious balance: fresh ginger slices, ruby-red goji berries, cinnamon sticks, golden chrysanthemum blossoms, and fresh mint sprigs set against a textured watercolor wash in tones of rice paper, bamboo green, and vintage sepia. The title typography is refined in a deep earthy brown, evoking warmth, heritage, and quiet mindfulness.",
};

export const PAGE_CONTENTS = {
  page1_cover: {
    title: BOOK_METADATA.title,
    subtitle: BOOK_METADATA.subtitle,
    author: BOOK_METADATA.author,
    artDescription: BOOK_METADATA.coverDescription
  },

  page2_copyright: {
    title: "Copyright & Legal Disclaimer",
    sections: [
      {
        heading: "Intellectual Property & Legal Protection",
        content: "Copyright © Master Lin. All rights reserved worldwide. No part of this digital publication may be reproduced, distributed, stored in a retrieval system, or transmitted in any form or by any means—electronic, mechanical, photocopying, recording, or otherwise—without prior written permission from the author and publishers."
      },
      {
        heading: "Health & Wellness Educational Notice",
        content: "All content contained within this book—including stories, cultural lore, home remedies, herbal infusions, soothing broths, and lifestyle recommendations—is provided solely for EDUCATIONAL, CULTURAL, and INFORMATIONAL purposes. This material reflects time-honored traditional practices passed down across generations in Eastern folk wisdom."
      },
      {
        heading: "No Medical Advice",
        content: "The information and recipes in this book DO NOT constitute medical advice, clinical diagnosis, prescription, or therapeutic treatment. They are NOT a substitute for personalized professional healthcare, medical supervision, or clinical care provided by licensed physicians, registered dietitians, or qualified medical practitioners."
      },
      {
        heading: "No Claims of Cure or Miracles",
        content: "This book makes no promises or guarantees to diagnose, treat, cure, or prevent any illness, disease, or chronic health condition. True vitality is the fruit of an ongoing balanced lifestyle. If you are pregnant, nursing, elderly, managing a chronic condition, or taking prescription medications, always consult your physician or healthcare provider before introducing new herbs, spices, or dietary changes into your daily routine."
      }
    ]
  },

  page3_presentation: {
    title: "Meet Master Lin",
    subtitle: "A grandmother's tender touch and the soothing scent of tea in a clay pot",
    textParagraphs: [
      "Hello, my dear reader. Welcome to this warm, cozy corner of our book.",
      "My name is Master Lin. I am in my sixties, blessed with a rich life, and my heart always fills with joy whenever I see someone pull up a chair to share a warm cup of tea. I grew up in a peaceful rural village cradled by mist-veiled green mountains in Asia. Life moved there without the frantic rush of today's world.",
      "Everything I learned about caring for the body and calming the spirit didn't come from prestigious academic libraries or sterile classrooms. It came straight from the sunlit, fragrant kitchen of my grandmother and mother. I remember it as vividly as if it were yesterday: the rhythmic thud of the stone mortar grinding toasted black sesame seeds, the spicy warmth of ginger simmering on the hearth, and the gentle patience with which they laid out fresh chrysanthemum petals to dry in the late afternoon sun.",
      "Whenever a neighbor woke up feeling under the weather, downhearted, or sluggish with a heavy stomach, there was no panic. My grandmother would quietly open an antique camphorwood chest where she kept hand-stitched, yellowed journals penned with bamboo brushes and calligraphy ink. She would read a few lines, step into her herb garden or pantry, pick out three or four simple whole ingredients, and brew a soothing broth or a fragrant herbal tea.",
      "Within a few gentle spoonfuls and a handful of kind, reassuring words, the person's face would soften. The sparkle returned to their eyes, and their body settled into its natural state of ease. Our family preserved and refined these notebooks across generations, treating each recipe as a precious treasure of human tenderness.",
      "Today, when I look around our modern world, I see so many people over forty-five feeling chronically exhausted, rushing from morning to night, wrestling with restless sleep, and worrying about family and health. I see weary hearts and tired bodies quietly yearning for a moment to pause.",
      "That is why I opened my family's heirloom keepsake chest to share these 100 traditional recipes with you. They are not bitter or complicated remedies. They are comforting gestures of love served in a cup or a bowl, designed to help you listen to your own body and nourish yourself every single day."
    ]
  },

  page4_message: {
    title: "A Message from Master Lin",
    subtitle: "Pull up a chair and pour yourself a warm cup",
    paragraphs: [
      "Dear reader,",
      "I want you to imagine that right now, we are sitting together on a quiet veranda, listening to the gentle rustle of bamboo leaves in the breeze, watching the steam rise softly from a freshly poured cup of tea.",
      "If this book found its way into your hands, it was no accident. I believe your body, your mind, and your spirit were asking for a moment of genuine kindness and respite.",
      "Too often with the passing years, we forget how powerful simplicity truly is. We are taught to believe that caring for our well-being requires expensive supplements, elaborate routines, or distant remedies. But the wisdom of our ancestors teaches the exact opposite: true wellness lives in what is honest and wholesome—in the simple staples already resting in your kitchen pantry, and in the loving patience of preparing something good for yourself.",
      "Do not rush through these pages as if checking items off a to-do list. Let go of pressure. Treat each recipe as a small gift you give yourself at the end of a long day or in the quiet stillness of a blessed morning.",
      "I wish with all my heart that every sip and every spoonful brings comfort to your home, ease to your days, and deep peace to your journey.",
      "With all of a grandmother's warmth,",
      "— Master Lin"
    ]
  },

  page5_howToUse: {
    title: "How to Use This Book",
    subtitle: "Your journey at your own pace, free from pressure",
    steps: [
      {
        number: "1",
        title: "Browse Freely and Unhurriedly",
        description: "You don't need to read this book cover to cover like a textbook. Think of it like a wooden tea cabinet: open it whenever you wish and choose the recipe that best matches how you feel today."
      },
      {
        number: "2",
        title: "Find Your Perfect Chapter",
        description: "We organized these 100 recipes into 10 thematic chapters—from soothing restless nights to comforting stiff joints and easing digestion. Simply check the table of contents and go directly to what you need."
      },
      {
        number: "3",
        title: "Simple, Accessible Everyday Ingredients",
        description: "Most recipes call for staples you already have in your pantry or can easily find at your local grocery store (like ginger, cinnamon, lemon, garlic, honey, and fresh mint). If you cannot find an exotic botanical, don't worry: your mindful, loving intention is always the most important ingredient."
      },
      {
        number: "4",
        title: "Integrate Gently into Your Routine",
        description: "Try one or two recipes each week at a relaxed pace. Notice how your body welcomes the warmth and aroma of gentle, nourishing drinks. Turn it into a comforting daily ritual."
      }
    ]
  },

  page6_structure: {
    title: "How Each Recipe Is Structured",
    subtitle: "A thoughtful layout designed for your everyday ease",
    components: [
      {
        tag: "Introduction",
        text: "A brief, heartwarming note on the traditional purpose and cultural spirit behind the combination."
      },
      {
        tag: "Ingredients",
        text: "A clear list using practical home measurements (teaspoons, tablespoons, cups, slices)."
      },
      {
        tag: "Preparation",
        text: "Clear, step-by-step instructions without culinary jargon or complex equipment."
      },
      {
        tag: "How to Enjoy",
        text: "The best times and conditions to savor the recipe (warm, before bed, or first thing in the morning)."
      },
      {
        tag: "Precautions",
        text: "Sensible, straightforward reminders to keep everything safe and balanced."
      },
      {
        tag: "Eastern Lore & Wisdom",
        text: "The rich cultural symbolism and historical background behind the traditional ingredients."
      },
      {
        tag: "Master Lin's Tip",
        text: "An affectionate grandmotherly secret to make the taste and experience even more delightful."
      }
    ]
  },

  page7_mtcExplanation: {
    title: "What is Traditional Chinese Medicine?",
    subtitle: "The art of daily balance explained simply and warmly",
    sections: [
      {
        title: "The Body as a Harmonious Garden",
        content: "Set aside complex jargon and rigid theoretical systems. To the ancient Eastern sages, the human body functions very much like a flourishing garden. If a garden receives relentless scorching sun and no rain, the soil parches and the flowers wither. If it is flooded with cold rain and shaded from sunlight, the roots rot and the dampness stagnates. The secret of vibrant wellness is keeping the garden in temperate harmony: neither too hot nor too cold, neither completely idle nor frantically overworked."
      },
      {
        title: "The Power of Gentle Warmth",
        content: "In traditional Eastern thought, our digestive system is viewed as a gentle stewpot at the center of the body. When we constantly douse it with icy drinks and heavy, cold food, we pour cold water onto the cooking fire, forcing our vital energy into overdrive. That is why Master Lin places so much value on warm herbal teas, comforting broths, and aromatics that tenderly kindle your internal hearth."
      },
      {
        title: "The Five Pillars of a Peaceful Life",
        content: "True holistic wellness goes far beyond drinking herbal tea. It rests on five humble daily practices: eating fresh whole food with gratitude, sipping warm liquids in unhurried intervals, turning in early to rest the mind, moving the body with gentle grace, and harboring thoughts of goodwill and peace in your heart."
      }
    ]
  },

  page8_ingredientsGuide: {
    title: "Essential Kitchen Ingredients",
    subtitle: "Cultural insights and traditional wisdom from our pantry",
    items: [
      { name: "Ginger", desc: "Prized for thousands of years for bringing comforting warmth to the stomach and dispelling damp chills." },
      { name: "Cinnamon", desc: "A fragrant, aromatic bark that offers cozy comfort, warms the chest, and brightens dreary days." },
      { name: "Lemon", desc: "A vibrant citrus companion celebrated for morning freshness, awakening vital energy with crisp lightness." },
      { name: "Garlic", desc: "The time-honored guardian of traditional kitchens, relied upon since antiquity to bolster household vitality." },
      { name: "Honey", desc: "Nature's golden nectar that coats a dry throat, brings wholesome sweetness, and soothes sensitive tissues." },
      { name: "Goji Berry", desc: "Jewel-like red berries cherished across Asia for supporting bright, clear vision and youthful stamina." },
      { name: "Jujube (Red Date)", desc: "A sweet traditional fruit often simmered in broths to replenish vital energy and promote a serene spirit." },
      { name: "Peppermint & Mint", desc: "Refreshing leaves perfect for calming an agitated mind, releasing head tension, and cooling the stomach." },
      { name: "Chrysanthemum", desc: "A delicate, aromatic flower steeped in Eastern traditions to soothe tired eyes and bring clear lightness to the head." },
      { name: "Chamomile", desc: "The quintessential flower of evening tranquility, beloved by grandmothers worldwide to unwind at dusk." },
      { name: "Fennel & Anise", desc: "Sweet aromatic seeds offering gentle digestive comfort, soothing bloating and fullness after meals." },
      { name: "Rosemary", desc: "The uplifting herb that fills the kitchen with invigorating scent, clears mental fog, and renews daily resolve." },
      { name: "Green Tea", desc: "The ancient beverage of Eastern mindfulness that clears the mind, supports alert focus, and purifies daily habits." },
      { name: "Black Sesame", desc: "A noble seed of ancestral cooking used to nourish deep reserves, fortify the hair, and sustain endurance." }
    ]
  },

  page9_bestPractices: {
    title: "How to Get the Most from These Recipes",
    subtitle: "Simple guidance to turn everyday preparation into a nurturing self-care ritual",
    tips: [
      {
        title: "1. Prioritize Fresh Ingredients and Filtered Water",
        text: "Whenever possible, choose crisp herbs, firm ginger root, and clean, filtered water. The care you pour into your kettle directly shapes the vitality of your brew."
      },
      {
        title: "2. Sip Warm Liquids in Small, Mindful Sips",
        text: "Avoid scalding hot or ice-cold drinks. Warmth is the temperature of nourishment—it allows your digestive center to receive the brew in total comfort."
      },
      {
        title: "3. Cultivate a Brief Moment of Pause",
        text: "While the water heats and the herbs release their fragrant steam, step away from screens and devices for ten minutes. Take a deep breath and savor the gentle aroma."
      },
      {
        title: "4. Honor Sleep and Your Body's Natural Rhythms",
        text: "Restful sleep is the ultimate restorer of vitality. Enjoy evening herbal teas at least an hour before bedtime and retreat to a quiet, dark sanctuary."
      },
      {
        title: "5. Embrace Consistency Over Perfection",
        text: "Savoring one warm cup with mindfulness three times a week does far more good than trying ten recipes in a single day out of restlessness. Balance unfolds step by step."
      }
    ]
  },

  page10_tableOfContents: {
    title: "Table of Contents",
    subtitle: "100 Traditional Recipes Divided into 10 Thematic Chapters",
    chapters: [
      { id: 1, title: "Chapter 1", name: "Traditional Remedies for Cold & Flu Comfort", count: 10 },
      { id: 2, title: "Chapter 2", name: "Traditional Recipes for Digestion & Gut Harmony", count: 10 },
      { id: 3, title: "Chapter 3", name: "Traditional Recipes for Memory & Mental Clarity", count: 10 },
      { id: 4, title: "Chapter 4", name: "Traditional Recipes for Deep Sleep & Anxiety Relief", count: 10 },
      { id: 5, title: "Chapter 5", name: "Traditional Recipes for Blood Pressure & Circulation", count: 10 },
      { id: 6, title: "Chapter 6", name: "Traditional Recipes for Joint Ease & Flexibility", count: 10 },
      { id: 7, title: "Chapter 7", name: "Traditional Recipes for Radiant Skin, Hair & Nails", count: 10 },
      { id: 8, title: "Chapter 8", name: "Traditional Recipes for Clean Energy & Daily Stamina", count: 10 },
      { id: 9, title: "Chapter 9", name: "Traditional Recipes for Metabolism & Natural Lightness", count: 10 },
      { id: 10, title: "Chapter 10", name: "Master Lin's Heritage & Longevity Elixirs", count: 10 }
    ]
  },

  introChapter1: {
    title: "Chapter 1: Traditional Remedies for Cold & Flu Comfort",
    subtitle: "The cozy warmth of home-brewed tea to keep the chill away",
    paragraphs: [
      "When the chilly winds of seasonal change blow outside, or when you feel that sudden shiver along the back of your neck warning that your defenses are low, nothing is more comforting than the sweet aroma of ginger and cinnamon simmering gently on the stove.",
      "In traditional Eastern lore, catching a cold is understood as 'cold wind' attempting to settle into the skin and respiratory pathways. To counter this chill, grandmothers have always turned to wholesome kitchen staples that stoke a gentle, reassuring fire within.",
      "In this opening chapter, I have selected 10 time-honored recipes that offer fragrant steam and soothing warmth, giving your body the comforting embrace it needs through chilly, rainy days."
    ],
    mestraLinClosingQuote: "Now that you know a little of my story, I warmly invite you to walk with me through these recipes passed down across generations. May they bring quiet care, warmth, and wellness into your daily life."
  }
};

export interface ChapterIntro {
  title: string;
  subtitle: string;
  paragraphs: string[];
  mestraLinClosingQuote: string;
}

export const CHAPTER_INTROS: Record<number, ChapterIntro> = {
  1: {
    title: "Chapter 1: Traditional Remedies for Cold & Flu Comfort",
    subtitle: "The cozy warmth of home-brewed tea to keep the chill away",
    paragraphs: [
      "When the chilly winds of seasonal change blow outside, or when you feel that sudden shiver along the back of your neck warning that your defenses are low, nothing is more comforting than the sweet aroma of ginger and cinnamon simmering gently on the stove.",
      "In traditional Eastern lore, catching a cold is understood as 'cold wind' attempting to settle into the skin and respiratory pathways. To counter this chill, grandmothers have always turned to wholesome kitchen staples that stoke a gentle, reassuring fire within.",
      "In this opening chapter, I have selected 10 time-honored recipes that offer fragrant steam and soothing warmth, giving your body the comforting embrace it needs through chilly, rainy days."
    ],
    mestraLinClosingQuote: "The warmth of a steaming cup sipped in quiet peace melts away the cold and brings a smile back to your face."
  },
  2: {
    title: "Chapter 2: Traditional Recipes for Digestion & Gut Harmony",
    subtitle: "Gentle comfort to warm, soothe, and balance your body's core",
    paragraphs: [
      "In Traditional Chinese Medicine, the stomach and spleen are seen as the golden cauldron where nourishment is transformed into pure vitality. When we eat on the run or rely on icy foods, that internal flame sputters.",
      "The recipes in this chapter are designed to ease bloating, relieve post-meal heaviness, and restore a calm, natural rhythm to your digestive center.",
      "Choose one of the 10 recipes below to savor after lunch or dinner and feel immediate ease settle over your core."
    ],
    mestraLinClosingQuote: "When the belly is at peace, the entire body exhales with relief and the mind becomes effortlessly light."
  },
  3: {
    title: "Chapter 3: Traditional Recipes for Memory & Mental Clarity",
    subtitle: "Wholesome nourishment to brighten your thoughts and clear mental fatigue",
    paragraphs: [
      "In our fast-paced modern world, overloaded with constant information and daily obligations, it is only natural for the mind to tire and focus to fade as afternoon turns to evening.",
      "Ancestral cooking has long treasured specific fruits, seeds, and blossoms that nourish the brain, promote smooth circulation to the head, and disperse mental fog.",
      "Explore these 10 teas and broths crafted to foster quiet focus, a vivid memory, and serene composure during study, reading, and creative work."
    ],
    mestraLinClosingQuote: "A tranquil mind is like a clear mountain lake: it reflects wisdom without being stirred into turmoil."
  },
  4: {
    title: "Chapter 4: Traditional Recipes for Deep Sleep & Anxiety Relief",
    subtitle: "Gentle herbs and fragrant flowers to quiet the heart and rest in peace",
    paragraphs: [
      "The night was made for the body to rest and the spirit to replenish in the deep stillness of sleep. When the mind refuses to stop racing, the body yearns for genuine comfort.",
      "Here you will find traditional preparations featuring chamomile, nutmeg, lemongrass, and jujube seeds—botanicals cherished for generations to invite peaceful slumber.",
      "Brew your favorite recipe an hour before retiring, dim the harsh lights, and prepare for a restful, restorative night."
    ],
    mestraLinClosingQuote: "Rest in the quiet knowing that today did its best. Tomorrow the sun rises anew."
  },
  5: {
    title: "Chapter 5: Traditional Recipes for Blood Pressure & Circulation",
    subtitle: "A smooth, refreshing current of vitality through your body's vessels",
    paragraphs: [
      "Blood and Qi (vital energy) should flow through our pathways like a calm river—free of turbulence, tension, or stagnation.",
      "Chrysanthemum blossoms, mulberry leaves, mild garlic, and apple peels are beloved traditional staples known to cool excess internal heat and soften the heart's rhythm.",
      "Enjoy these 10 recipes designed to bring lightness to the chest, refresh the head, and nurture harmonious whole-body circulation."
    ],
    mestraLinClosingQuote: "Breathe deeply, sip slowly, and feel your heart beat to nature's unhurried rhythm."
  },
  6: {
    title: "Chapter 6: Traditional Recipes for Joint Ease & Flexibility",
    subtitle: "Warmth and loving relief to soothe stiff joints and restore freedom of movement",
    paragraphs: [
      "With maturity and the arrival of damp, chilly weather, our joints—especially the knees, hands, and shoulders—can hold onto stiffness and morning ache.",
      "The ancestral secret for easing joints is dispelling deep dampness and infusing gentle warmth into tendons with warming spices like turmeric, ginger, cinnamon, and sesame.",
      "Experience these 10 invigorating teas and broths and feel suppleness and ease return to your daily steps."
    ],
    mestraLinClosingQuote: "The warmth you cultivate today prepares your body to walk with confidence and ease tomorrow."
  },
  7: {
    title: "Chapter 7: Traditional Recipes for Radiant Skin, Hair & Nails",
    subtitle: "Natural luster and deep replenishment blooming from the inside out",
    paragraphs: [
      "In Eastern holistic wisdom, glowing skin and strong hair are the outward mirror of a body that is richly nourished from within.",
      "Goji berries, red dates, whole rice, and wild rose petals are treasured remedies used to hydrate tissues and bring vitality back to complexion and hair.",
      "Discover these 10 beauty elixirs and tonics, and transform your daily self-care into an act of genuine self-kindness."
    ],
    mestraLinClosingQuote: "True beauty is vitality overflowing as serenity in the eyes."
  },
  8: {
    title: "Chapter 8: Traditional Recipes for Clean Energy & Daily Stamina",
    subtitle: "Subtle, jitter-free vitality to brighten and sustain your daily routine",
    paragraphs: [
      "Replenishing daily vitality without resorting to harsh stimulants or nervous energy is one of the highest arts of Eastern wisdom.",
      "Gentle ginseng, crisp green tea with apple, oats with honey, and wholesome seeds deliver sustained, grounded stamina that carries you through the day without crashes.",
      "Explore the 10 recipes in this chapter to start your mornings with an open chest, clear head, and calm vigor."
    ],
    mestraLinClosingQuote: "Enduring energy is that which is cultivated with care and unhurried patience."
  },
  9: {
    title: "Chapter 9: Traditional Recipes for Metabolism & Natural Lightness",
    subtitle: "Harmonious cleansing and buoyant lightness without strain or deprivation",
    paragraphs: [
      "Kindling the metabolism in traditional Eastern philosophy does not mean crash dieting; it means stoking the digestive fire and gently shedding stagnant fluid retention.",
      "Hibiscus, sun-dried orange peel, raw apple cider vinegar, and dandelion root work together to deflate puffiness and sweep away residue naturally.",
      "Savor these 10 light, cleansing preparations to feel lighter on your feet, free of bloating, and invigorated throughout.",
    ],
    mestraLinClosingQuote: "Patience and consistency are the golden keys to an energized, buoyant body."
  },
  10: {
    title: "Chapter 10: Master Lin's Heritage & Longevity Elixirs",
    subtitle: "The most treasured family heirloom recipes handed down through generations",
    paragraphs: [
      "In this concluding chapter, I have gathered the crown jewels from my grandmother's personal recipe journals—treasured preparations guarded with deep affection across decades.",
      "These are restorative longevity broths, noble flower teas, and whole-body tonics that celebrate gratitude for life and family warmth.",
      "May these 10 heritage recipes bring peace, health, and vibrant longevity to you and everyone you hold dear."
    ],
    mestraLinClosingQuote: "Blessed be your path. May the wisdom of the ancients always illuminate your days."
  }
};

