// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) return;

    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Function to set the theme and update the icon
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Apply the saved theme, or system preference if no saved theme
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        setTheme(systemTheme);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    });
}

// Language Switcher Functionality
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Initialize language switcher
function initializeLanguageSwitcher() {
    const languageOptions = document.querySelectorAll('.language-option');
    if (!languageOptions.length) return;

    // Set initial active state
    const updateActiveState = () => {
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === currentLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', currentLanguage);
    };

    // Set initial state
    updateActiveState();

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            if (lang && lang !== currentLanguage) {
                currentLanguage = lang;
                localStorage.setItem('preferredLanguage', lang);
                updateActiveState();
                translatePage(lang);
            }
        });
    });
}

// Translation function
function translatePage(lang) {
    // Get all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key] && translations[key][lang]) {
            element.textContent = translations[key][lang];
        }
    });
}

// Translations object - add more translations as needed
const translations = {
    // Navigation
    'nav.logo': { en: 'Yadav Bhandari', ne: 'यादव भण्डारी' },
    'nav.home': { en: 'Home', ne: 'गृहपृष्ठ' },
    'nav.about': { en: 'About', ne: 'हाम्रो बारे' },
    'nav.services': { en: 'Services', ne: 'सेवाहरू' },
    'nav.portfolio': { en: 'Portfolio', ne: 'पोर्टफोलियो' },
    'nav.contact': { en: 'Contact', ne: 'सम्पर्क' },
    'nav.education': { en: 'Education', ne: 'शिक्षा' },
    'nav.commercial-banks': { en: 'Commercial Banks', ne: 'वाणिज्य बैंकहरू' },
    'nav.development-banks': { en: 'Development Banks', ne: 'विकास बैंकहरू' },
    'nav.finance': { en: 'Finance', ne: 'वित्त' },
    'nav.hotels': { en: 'Hotels', ne: 'होटलहरू' },
    'nav.hydro-power': { en: 'Hydro Power', ne: 'जलविद्युत' },
    'nav.investment': { en: 'Investment', ne: 'लगानी' },
    'nav.life-insurance': { en: 'Life Insurance', ne: 'जीवन बीमा' },
    'nav.manufacturing': { en: 'Manufacturing', ne: 'उत्पादन' },
    'nav.microfinance': { en: 'Microfinance', ne: 'सूक्ष्मवित्त' },
    'nav.non-life-insurance': { en: 'Non Life Insurance', ne: 'गैर-जीवन बीमा' },
    'nav.others': { en: 'Others', ne: 'अन्य' },
    'nav.tradings': { en: 'Tradings', ne: 'व्यापार' },
    
    // About Section
    'about.title': { en: 'About Me', ne: 'मेरो बारेमा' },
    'about.text': { 
        en: 'With over 5 years of hands-on experience in the stock market sector in Nepal, I specialize in technical analysis, fundamental research, and strategic investment planning. My expertise lies in identifying high-potential stocks and market trends to help investors make profitable decisions.',
        ne: 'नेपालको शेयर बजार क्षेत्रमा ५ वर्ष भन्दा बढीको व्यावहारिक अनुभव सहित, म प्राविधिक विश्लेषण, मौलिक अनुसन्धान, र रणनीतिक लगानी योजनामा विशेषज्ञ छु। मेरो विशेषज्ञता उच्च सम्भावित शेयरहरू र बजार प्रवृत्तिहरू पहिचान गर्नमा छ जसले लगानीकर्ताहरूलाई नाफामूलक निर्णयहरू गर्न मद्दत गर्दछ।'
    },
    
    // Expertise
    'expertise.fundamental-analysis': { en: 'Fundamental Analysis', ne: 'मौलिक विश्लेषण' },
    'expertise.fundamental-analysis-text': { 
        en: 'Comprehensive evaluation of company financials, industry position, and economic factors to determine intrinsic value.',
        ne: 'कम्पनीको वित्तीय विवरण, उद्योगको स्थिति, र आर्थिक कारकहरूको व्यापक मूल्यांकन गरेर आन्तरिक मूल्य निर्धारण गर्ने प्रक्रिया।'
    },
    'expertise.technical-analysis': { en: 'Technical Analysis', ne: 'प्राविधिक विश्लेषण' },
    'expertise.technical-analysis-text': { 
        en: 'In-depth market analysis using technical indicators and chart patterns to identify trading opportunities.',
        ne: 'प्राविधिक संकेतक र चार्टका प्रारूपहरू प्रयोग गरेर बजारको गहिरो विश्लेषण गर्ने र व्यापारको अवसरहरू पहिचान गर्ने प्रक्रिया।'
    },
    'expertise.investment-strategies': { en: 'Investment Strategies', ne: 'लगानी रणनीतिहरू' },
    'expertise.investment-strategies-text': { 
        en: 'Customized investment approaches tailored to individual risk tolerance and financial goals.',
        ne: 'व्यक्तिगत जोखिम सहनशीलता र वित्तीय लक्ष्यहरू अनुसार अनुकूलित लगानी दृष्टिकोण।'
    },
    'expertise.portfolio-management': { en: 'Portfolio Management', ne: 'पोर्टफोलियो व्यवस्थापन' },
    'expertise.portfolio-management-text': { 
        en: 'Professional portfolio management to optimize returns while managing risk effectively.',
        ne: 'जोखिम प्रभावकारी रूपमा व्यवस्थापन गर्दै फाइदा अधिकतम गर्न पेशेवर पोर्टफोलियो व्यवस्थापन।'
    },
    
    // Values
    'values.title': { en: 'Values:', ne: 'मूल्यहरू:' },
    'values.text': { 
        en: 'Integrity, Curiosity, Growth, Collaboration',
        ne: 'ईमान्दारी, जिज्ञासा, विकास, सहकार्य'
    },
    
    // Services
    'services.title': { en: 'My Services', ne: 'मेरा सेवाहरू' },
    'services.nepse-market-analysis': { en: 'NEPSE Market Analysis', ne: 'नेप्से बजार विश्लेषण' },
    'services.nepse-market-analysis-text': { 
        en: 'Comprehensive technical and fundamental analysis of NEPSE-listed companies to identify high-potential investment opportunities.',
        ne: 'नेप्सेमा सूचीकृत कम्पनीहरूको व्यापक प्राविधिक र मौलिक विश्लेषण गरेर उच्च सम्भावित लगानीका अवसरहरू पहिचान गर्ने सेवा।'
    },
    'services.portfolio-management': { en: 'Portfolio Management', ne: 'पोर्टफोलियो व्यवस्थापन' },
    'services.portfolio-management-text': { 
        en: 'Customized investment portfolios designed to match your financial goals and risk tolerance.',
        ne: 'तपाईंको वित्तीय लक्ष्य र जोखिम सहनशीलतालाई मिल्ने गरी तयार गरिएको अनुकूलित लगानी पोर्टफोलियो।'
    },
    'services.technical-trading': { en: 'Technical Trading', ne: 'प्राविधिक व्यापार' },
    'services.technical-trading-text': { 
        en: 'Advanced technical analysis and trading strategies for active traders in the NEPSE market.',
        ne: 'नेप्से बजारमा सक्रिय व्यापारीहरूका लागि उन्नत प्राविधिक विश्लेषण र व्यापार रणनीतिहरू।'
    },
    'services.investment-education': { en: 'Investment Education', ne: 'लगानी शिक्षा' },
    'services.investment-education-text': { 
        en: 'Learn the art of stock market investing through personalized coaching and training programs.',
        ne: 'व्यक्तिगत प्रशिक्षण र तालिम कार्यक्रमहरू मार्फत शेयर बजारमा लगानीको कला सिक्नुहोस्।'
    },
    
    // Portfolio
    'portfolio.title': { en: 'Investment Strategies', ne: 'लगानी रणनीतिहरू' },
    'portfolio.long-term-investing': { en: 'Long-term Investing', ne: 'दीर्घकालीन लगानी' },
    'portfolio.long-term-investing-text': { 
        en: 'Fundamental analysis approach to identify undervalued stocks with strong growth potential for long-term wealth creation.',
        ne: 'दीर्घकालीन सम्पत्ति सिर्जनाका लागि मजबुत वृद्धिको सम्भावना भएका कम मूल्यांकन भएका शेयरहरू पहिचान गर्न मौलिक विश्लेषण दृष्टिकोण।'
    },
    'portfolio.swing-trading': { en: 'Swing Trading', ne: 'स्विङ ट्रेडिङ' },
    'portfolio.swing-trading-text': { 
        en: 'Medium-term trading strategy capturing price swings in trending stocks using technical analysis.',
        ne: 'प्रवृत्ति भएका शेयरहरूमा मध्यम अवधिको मूल्य परिवर्तनलाई प्राविधिक विश्लेषण प्रयोग गरेर समात्ने व्यापार रणनीति।'
    },
    'portfolio.sector-rotation': { en: 'Sector Rotation', ne: 'क्षेत्र घुमाउने रणनीति' },
    'portfolio.sector-rotation-text': { 
        en: 'Strategy focusing on shifting investments among different market sectors to capitalize on economic cycles.',
        ne: 'आर्थिक चक्रहरूबाट फाइदा लिन विभिन्न बजार क्षेत्रहरू बीच लगानी सार्न केन्द्रित रणनीति।'
    },
    'portfolio.learn-more': { en: 'Learn More', ne: 'थप जान्नुहोस्' },
    
    // Blog
    'blog.title': { en: 'Market Insights', ne: 'बजार अन्तर्दृष्टिहरू' },
    'blog.nepse-market-outlook': { en: 'NEPSE Market Outlook 2025', ne: 'नेप्से बजार आउटलुक २०८२' },
    'blog.nepse-market-outlook-text': { 
        en: 'Analyzing the current market trends and identifying potential sectors for investment in the coming months...',
        ne: 'हालको बजार प्रवृत्तिहरूको विश्लेषण र आउँदो महिनाहरूमा लगानीका लागि सम्भावित क्षेत्रहरू पहिचान गर्दै...'
    },
    'blog.mastering-technical-analysis': { en: 'Mastering Technical Analysis', ne: 'प्राविधिक विश्लेषणमा निपुणता' },
    'blog.mastering-technical-analysis-text': { 
        en: 'Learn the essential technical indicators and chart patterns every NEPSE trader should know...',
        ne: 'प्रत्येक नेप्से व्यापारीले जान्नु पर्ने आवश्यक प्राविधिक संकेतक र चार्टका प्रारूपहरू सिक्नुहोस्...'
    },
    'blog.building-a-diversified-portfolio': { en: 'Building a Diversified Portfolio', ne: 'विविधीकृत पोर्टफोलियो निर्माण' },
    'blog.building-a-diversified-portfolio-text': { 
        en: 'Strategies for creating a well-balanced investment portfolio in the Nepalese stock market...',
        ne: 'नेपाली शेयर बजारमा राम्रोसँग सन्तुलित लगानी पोर्टफोलियो सिर्जना गर्ने रणनीतिहरू...'
    },
    'blog.read-more': { en: 'Read More', ne: 'पूरै पढ्नुहोस्' },
    
    // Testimonials
    'testimonials.title': { en: 'Testimonials', ne: 'प्रशंसापत्रहरू' },
    'testimonials.text-1': { 
        en: '\"Yadav\'s market analysis helped me make 35% returns in just 6 months. His insights into NEPSE are invaluable!\"',
        ne: '\"यादवको बजार विश्लेषणले मलाई केवल ६ महिनामै ३५% फाइदा गर्न मद्दत गर्यो। नेप्सेको बारेमा उनको अन्तर्दृष्टि अमूल्य छ!\"'
    },
    'testimonials.author-1': { en: '— Rajesh S.', ne: '— राजेश एस.' },
    'testimonials.text-2': { 
        en: '\"The best investment advice I\'ve received. His technical analysis of NEPSE is spot on and has transformed my portfolio.\"',
        ne: '\"मैले पाएको उत्कृष्ट लगानी सल्लाह। नेप्सेको उनको प्राविधिक विश्लेषण एकदम सटीक छ र मेरो पोर्टफोलियोलाई परिवर्तन गरिदिएको छ।\"'
    },
    'testimonials.author-2': { en: '— Anita M.', ne: '— अनीता एम.' },
    
    // Contact
    'contact.title': { en: 'Get In Touch', ne: 'सम्पर्क गर्नुहोस्' },
    'contact.name': { en: 'Name', ne: 'नाम' },
    'contact.email': { en: 'Email', ne: 'इमेल' },
    'contact.message': { en: 'Message', ne: 'सन्देश' },
    'contact.send-message': { en: 'Send Message', ne: 'सन्देश पठाउनुहोस्' },
    'contact.email-title': { en: 'Email', ne: 'इमेल' },
    'contact.phone-title': { en: 'Phone', ne: 'फोन' },
    'contact.office-title': { en: 'Office', ne: 'कार्यालय' },
    
    // Analysis
    'analysis.title': { en: 'Commercial Banks Analysis', ne: 'वाणिज्य बैंकहरूको विश्लेषण' },
    'analysis.capital-adequacy-ratio': { en: '🔑 1. Capital Adequacy Ratio (CAR)', ne: '🔑 १. पूँजी पर्याप्तता अनुपात (कार)' },
    'analysis.capital-adequacy-ratio-text': { 
        en: 'This ratio shows how much capital a bank has to cover its loans and risks.',
        ne: 'यो अनुपातले बैंकले आफनो ऋण तथा जोखिमलाई धान्न कति पूँजी छ भन्ने देखाउँछ।'
    },
    'analysis.capital-adequacy-ratio-important': { 
        en: 'Why Important: Strong CAR (>11%) = safe and well-managed bank.',
        ne: 'किन महत्त्वपूर्ण: बलियो कार (>११%) = सुरक्षित र राम्रोसँग व्यवस्थापित बैंक।'
    },
    'analysis.capital-adequacy-ratio-regulator': { 
        en: 'Regulator\'s Minimum: NRB requires minimum 11% Total Capital Adequacy Ratio.',
        ne: 'नियामकको न्यूनतम: नेपाल राष्ट्र बैंकले कम्तिमा ११% कुल पूँजी पर्याप्तता अनुपात आवश्यक पार्छ।'
    },
    
    // Hero Section
    'hero.title': { en: 'Yadav Bhandari', ne: 'यादव भण्डारी' },
    'hero.subtitle': { 
        en: 'NEPSE Investment Expert | Stock Market Trader | Financial Advisor', 
        ne: 'नेप्से लगानी विशेषज्ञ | शेयर बजार व्यापारी | वित्तीय सल्लाहकार'
    },
    'hero.cta': { en: 'Get In Touch', ne: 'सम्पर्क गर्नुहोस्' },
    
    // Add more translations as needed
};

// Apply translations and initialize components on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize language switcher and set initial language
    initializeLanguageSwitcher();
    translatePage(currentLanguage);
    initializeThemeToggle();
});
