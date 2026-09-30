export interface NavDropdownItem {
  name: string;
  nameHi?: string;
  path: string;
  icon?: string;
  description?: string;
}

export interface NavDropdownColumn {
  title: string;
  titleHi?: string;
  items: NavDropdownItem[];
}

export interface NavDropdownMenu {
  id: string;
  label: string;
  labelHi: string;
  path: string;
  heading: string;
  headingHi: string;
  columns: NavDropdownColumn[];
  bottomCta: {
    label: string;
    path: string;
  };
}

export const MAIN_NAV_MENUS: NavDropdownMenu[] = [
  // 1. Hindi Shayari Dropdown
  {
    id: 'hindi-shayari',
    label: 'Hindi Shayari',
    labelHi: 'हिंदी शायरी',
    path: '/hindi-shayari/',
    heading: 'Hindi Shayari • हिंदी शायरी',
    headingHi: 'अहसास और जज़्बातों का रूहानी संगम',
    columns: [
      {
        title: 'Feelings (अहसास)',
        items: [
          { name: 'Love Shayari', nameHi: 'इश्क़ शायरी', path: '/love-shayari/', icon: '❤️' },
          { name: 'Sad Shayari', nameHi: 'दर्द भरी शायरी', path: '/sad-shayari/', icon: '💔' },
          { name: 'Dard Shayari', nameHi: 'गहरा दर्द', path: '/dard-shayari/', icon: '🥀' },
          { name: 'Breakup Shayari', nameHi: 'जुदाई शायरी', path: '/breakup-shayari/', icon: '💔' },
          { name: 'Emotional Shayari', nameHi: 'भावुक शायरी', path: '/emotional-shayari/', icon: '💭' },
        ]
      },
      {
        title: 'Style (अंदाज़)',
        items: [
          { name: '2 Line Shayari', nameHi: 'दो लाइन शायरी', path: '/2-line-shayari/', icon: '🌙' },
          { name: 'Heart Touching Shayari', nameHi: 'दिल छूने वाली', path: '/heart-touching-shayari/', icon: '✨' },
          { name: 'Attitude Shayari', nameHi: 'तेवर शायरी', path: '/attitude-shayari/', icon: '😎' },
          { name: 'Alone Shayari', nameHi: 'तन्हाई शायरी', path: '/alone-shayari/', icon: '🖤' },
          { name: 'Bewafa Shayari', nameHi: 'बेवफ़ा शायरी', path: '/bewafa-shayari/', icon: '🥀' },
        ]
      },
      {
        title: 'Relationships (रिश्ते)',
        items: [
          { name: 'Dosti Shayari', nameHi: 'दोस्ती शायरी', path: '/dosti-shayari/', icon: '👫' },
          { name: 'Romantic Shayari', nameHi: 'रोमांटिक शायरी', path: '/romantic-shayari/', icon: '❤️' },
          { name: 'Family Shayari', nameHi: 'परिवार शायरी', path: '/family-shayari/', icon: '👨‍👩‍👧' },
          { name: 'Mohabbat Shayari', nameHi: 'सच्ची मोहब्बत', path: '/mohabbat-shayari/', icon: '🌹' },
        ]
      }
    ],
    bottomCta: {
      label: 'Explore All Hindi Shayari →',
      path: '/hindi-shayari/'
    }
  },

  // 2. English Poetry Dropdown
  {
    id: 'english-poetry',
    label: 'English Poetry',
    labelHi: 'अंग्रेजी कविताएं',
    path: '/english-poetry/',
    heading: 'English Poetry • Contemporary Anthology',
    headingHi: 'Verses on love, melancholy, and quiet solitude',
    columns: [
      {
        title: 'Themes of Heart',
        items: [
          { name: 'Love Poetry', path: '/love-poetry/', icon: '❤️' },
          { name: 'Sad Poetry', path: '/sad-poetry/', icon: '💔' },
          { name: 'Heartbreak Poetry', path: '/heartbreak-poetry/', icon: '🥀' },
          { name: 'Romantic Poetry', path: '/romantic-poetry/', icon: '🌹' },
        ]
      },
      {
        title: 'Form & Stanza',
        items: [
          { name: 'Short Poems', path: '/short-poems/', icon: '🌙' },
          { name: 'Emotional Poems', path: '/emotional-poems/', icon: '✨' },
          { name: 'Life Poetry', path: '/life-poetry/', icon: '🌿' },
          { name: 'Deep Poetry', path: '/deep-poetry/', icon: '💭' },
        ]
      },
      {
        title: 'Perspectives',
        items: [
          { name: 'Inspirational Poetry', path: '/inspirational-poetry/', icon: '✨' },
          { name: 'Friendship Poems', path: '/friendship-poems/', icon: '👫' },
          { name: 'Relationship Poems', path: '/relationship-poems/', icon: '🌸' },
          { name: 'Modern Poetry', path: '/modern-poetry/', icon: '✒️' },
        ]
      }
    ],
    bottomCta: {
      label: 'Explore All English Poetry →',
      path: '/english-poetry/'
    }
  },

  // 3. Quotes Dropdown
  {
    id: 'quotes',
    label: 'Quotes',
    labelHi: 'अनमोल विचार',
    path: '/quotes/',
    heading: 'Quotes & Deep Thoughts • सुविचार संग्रह',
    headingHi: 'Inspiring proverbs and reflections on life and relationships',
    columns: [
      {
        title: 'Life & Solitude',
        items: [
          { name: 'Love Quotes', path: '/love-quotes/', icon: '❤️' },
          { name: 'Life Quotes', path: '/life-quotes/', icon: '🌿' },
          { name: 'Sad Quotes', path: '/sad-quotes/', icon: '💔' },
          { name: 'Motivational Quotes', path: '/motivational-quotes/', icon: '🔥' },
        ]
      },
      {
        title: 'Bonds & Mindset',
        items: [
          { name: 'Friendship Quotes', path: '/friendship-quotes/', icon: '👫' },
          { name: 'Deep Quotes', path: '/deep-quotes/', icon: '💭' },
          { name: 'Relationship Quotes', path: '/relationship-quotes/', icon: '🌸' },
          { name: 'Inspirational Quotes', path: '/inspirational-quotes/', icon: '✨' },
        ]
      }
    ],
    bottomCta: {
      label: 'Explore All Quotes →',
      path: '/quotes/'
    }
  },

  // 4. Poems Dropdown
  {
    id: 'poems',
    label: 'Poems',
    labelHi: 'कविताएं',
    path: '/poems/',
    heading: 'Poems & Verses • नज़्म व कविता संग्रह',
    headingHi: 'Lyrical reflections across traditions and languages',
    columns: [
      {
        title: 'Language & Origin',
        items: [
          { name: 'Hindi Poems (हिंदी कविताएं)', path: '/hindi-poems/', icon: '📜' },
          { name: 'English Poems', path: '/english-poems/', icon: '✒️' },
          { name: 'Original Poems', path: '/original-poems/', icon: '✨' },
        ]
      },
      {
        title: 'Genres & Length',
        items: [
          { name: 'Love Poems', path: '/love-poems/', icon: '❤️' },
          { name: 'Sad Poems', path: '/sad-poems/', icon: '💔' },
          { name: 'Short Poems', path: '/short-poems/', icon: '🌙' },
          { name: 'Life Poems', path: '/life-poems/', icon: '🌿' },
        ]
      }
    ],
    bottomCta: {
      label: 'Explore All Poems →',
      path: '/poems/'
    }
  },

  // 5. Status Dropdown
  {
    id: 'status',
    label: 'Status',
    labelHi: 'स्टेटस व कैप्शन',
    path: '/status/',
    heading: 'Status & Captions • व्हाट्सएप स्टेटस व कैप्शन',
    headingHi: 'Ready-to-copy short lines for WhatsApp, Instagram, and Facebook',
    columns: [
      {
        title: 'Platforms',
        items: [
          { name: 'WhatsApp Status', path: '/whatsapp-status/', icon: '📱' },
          { name: 'Instagram Captions', path: '/instagram-captions/', icon: '📸' },
          { name: 'Short Status', path: '/short-status/', icon: '✨' },
          { name: 'Trending Status', path: '/trending-status/', icon: '🔥' },
        ]
      },
      {
        title: 'Moods',
        items: [
          { name: 'Love Status', path: '/love-status/', icon: '❤️' },
          { name: 'Sad Status', path: '/sad-status/', icon: '💔' },
          { name: 'Attitude Status', path: '/attitude-status/', icon: '😎' },
          { name: 'Alone Status', path: '/alone-status/', icon: '🌙' },
        ]
      }
    ],
    bottomCta: {
      label: 'Explore All Status →',
      path: '/status/'
    }
  }
];

export const POPULAR_SEARCH_TERMS = [
  'Sad Shayari',
  'Love Shayari',
  '2 Line Shayari',
  'English Poetry',
  'Love Quotes',
  'WhatsApp Status',
  'Dard Shayari',
  'Attitude Shayari'
];
