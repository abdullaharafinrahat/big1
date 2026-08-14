add it as faoundation index. 



make mobile friendly and add the header and footer.



<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bondhu.org - মানবতার সেবায় আমরা একসাথে</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts for Bengali -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#065f46',      /* Deep Emerald Green */
                        'primary-dark': '#043e2e', /* Very Dark Green */
                        'primary-light': '#047857',
                        'accent-red': '#dc2626',   /* Red for CTA buttons & badge */
                        'accent-red-hover': '#b91c1c'
                    },
                    fontFamily: {
                        'sans': ['"Hind Siliguri"', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Hind Siliguri', sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
        }
        /* Custom scrollbar for clean aesthetics */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        .section-heading-line {
            display: flex;
            align-items: center;
            text-align: center;
        }
        .section-heading-line::before,
        .section-heading-line::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #cbd5e1;
        }
        .section-heading-line:not(:empty)::before {
            margin-right: .75em;
        }
        .section-heading-line:not(:empty)::after {
            margin-left: .75em;
        }
    </style>
</head>
<body class="antialiased selection:bg-emerald-200">

    <!-- TOP UTILITY HEADER -->
    <header class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
                
                <!-- Logo & Tagline -->
                <div class="flex items-center space-x-3">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-accent-red font-bold text-2xl mr-2.5 border border-red-100 shadow-sm">
                            <i class="fa-solid font-bold text-red-600 fa-hand-holding-heart"></i>
                        </div>
                        <div>
                            <div class="flex items-center space-x-1">
                                <span class="text-2xl font-black text-accent-red tracking-tight">Bondhu</span>
                                <span class="text-2xl font-bold text-emerald-800">.org</span>
                            </div>
                            <p class="text-xs text-gray-500 font-medium">মানবতার সেবায় আমরা একসাথে</p>
                        </div>
                    </div>
                </div>

                <!-- Date Widgets (English, Bengali, Hijri) -->
                <div class="hidden md:flex items-center space-x-3 text-xs">
                    <!-- English Date -->
                    <div class="flex items-center bg-emerald-50/60 border border-emerald-100 rounded-md px-3 py-1.5">
                        <i class="fa-regular fa-calendar-days text-primary mr-2 text-sm"></i>
                        <div>
                            <span class="font-bold text-gray-800 block">08 July 2026</span>
                            <span class="text-[10px] text-gray-500 uppercase tracking-wider">English</span>
                        </div>
                    </div>
                    <!-- Bangla Date -->
                    <div class="flex items-center bg-rose-50/60 border border-rose-100 rounded-md px-3 py-1.5">
                        <i class="fa-solid fa-calendar-day text-accent-red mr-2 text-sm"></i>
                        <div>
                            <span class="font-bold text-gray-800 block">২৪ আষাঢ় ১৪৩৩</span>
                            <span class="text-[10px] text-gray-500">বাংলা</span>
                        </div>
                    </div>
                    <!-- Hijri Date -->
                    <div class="flex items-center bg-emerald-50/60 border border-emerald-100 rounded-md px-3 py-1.5">
                        <i class="fa-solid fa-moon text-emerald-700 mr-2 text-sm"></i>
                        <div>
                            <span class="font-bold text-gray-800 block">১০ মহররম ১৪৪৮</span>
                            <span class="text-[10px] text-gray-500">Hijri</span>
                        </div>
                    </div>
                </div>

                <!-- Language Selector & Login Button -->
                <div class="flex items-center space-x-2">
                    <div class="inline-flex rounded-md shadow-sm border border-gray-200 p-0.5 bg-gray-50 text-xs">
                        <button class="bg-primary text-white font-medium px-3 py-1 rounded shadow-sm">বাংলা</button>
                        <button class="text-gray-600 hover:text-gray-900 font-medium px-3 py-1 rounded transition">English</button>
                    </div>
                    <button class="bg-accent-red hover:bg-accent-red-hover text-white text-xs font-semibold px-4 py-1.5 rounded flex items-center transition shadow-sm">
                        <i class="fa-solid fa-user-lock mr-1.5"></i> Login
                    </button>
                </div>

            </div>
        </div>
    </header>

    <!-- MAIN NAVIGATION BAR -->
    <nav class="bg-primary text-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-12">
                
                <!-- Desktop Navigation Menu -->
                <div class="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
                    <a href="#" class="bg-emerald-800 text-white px-3 py-2 rounded-md flex items-center font-bold">
                        <i class="fa-solid fa-house mr-1.5"></i> হোম
                    </a>
                    <a href="#" class="hover:bg-emerald-700/70 text-gray-100 px-3 py-2 rounded-md transition">আমাদের সম্পর্কে</a>
                    <a href="#" class="hover:bg-emerald-700/70 text-gray-100 px-3 py-2 rounded-md transition">সেবাসমূহ</a>
                    <a href="#" class="hover:bg-emerald-700/70 text-gray-100 px-3 py-2 rounded-md transition">পরিচালনা পরিষদ</a>
                    <a href="#" class="hover:bg-emerald-700/70 text-gray-100 px-3 py-2 rounded-md transition">সকল সদস্য</a>
                    <a href="#" class="hover:bg-emerald-700/70 text-gray-100 px-3 py-2 rounded-md transition">নিউজ</a>
                    <a href="#" class="hover:bg-emerald-700/70 text-gray-100 px-3 py-2 rounded-md transition">গ্যালারি</a>
                    <a href="#" class="hover:bg-emerald-700/70 text-gray-100 px-3 py-2 rounded-md transition">যোগাযোগ</a>
                </div>

                <!-- Search Bar Button -->
                <div class="flex items-center space-x-2">
                    <button class="p-2 text-emerald-100 hover:text-white rounded-md hover:bg-emerald-700 focus:outline-none transition" title="Search">
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                    </button>
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-emerald-100 hover:text-white rounded-md hover:bg-emerald-700">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>

            </div>
        </div>

        <!-- Mobile Menu Nav Dropdown -->
        <div id="mobile-menu" class="hidden md:hidden bg-emerald-900 border-t border-emerald-800 px-4 pt-2 pb-4 space-y-1 text-sm font-medium">
            <a href="#" class="bg-emerald-800 text-white block px-3 py-2 rounded-md"><i class="fa-solid fa-house mr-2"></i> হোম</a>
            <a href="#" class="text-gray-200 hover:bg-emerald-800 block px-3 py-2 rounded-md">আমাদের সম্পর্কে</a>
            <a href="#" class="text-gray-200 hover:bg-emerald-800 block px-3 py-2 rounded-md">সেবাসমূহ</a>
            <a href="#" class="text-gray-200 hover:bg-emerald-800 block px-3 py-2 rounded-md">পরিচালনা পরিষদ</a>
            <a href="#" class="text-gray-200 hover:bg-emerald-800 block px-3 py-2 rounded-md">সকল সদস্য</a>
            <a href="#" class="text-gray-200 hover:bg-emerald-800 block px-3 py-2 rounded-md">নিউজ</a>
            <a href="#" class="text-gray-200 hover:bg-emerald-800 block px-3 py-2 rounded-md">গ্যালারি</a>
            <a href="#" class="text-gray-200 hover:bg-emerald-800 block px-3 py-2 rounded-md">যোগাযোগ</a>
        </div>
    </nav>

    <!-- HERO SLIDER SECTION -->
    <section class="relative bg-gray-900 text-white overflow-hidden">
        <div class="relative h-[320px] sm:h-[400px] md:h-[460px]">
            
            <!-- Hero Image Background -->
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop" 
                 alt="Volunteers assisting people" 
                 class="w-full h-full object-cover opacity-60">
            
            <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

            <!-- Content Overlay -->
            <div class="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
                <div class="max-w-xl space-y-4">
                    <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        মানবতার সেবায় 
<span class="text-emerald-400">আমরা একসাথে</span>
                    </h1>
                    <p class="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                        ত্রাণদান, চিকিৎসা সহায়তা, বস্ত্র বিতরণ, শিক্ষা ও সামাজিক কল্যাণ মূলক সর্বদাই মানুষের পাশে আছি।
                    </p>
                    <div class="pt-2 flex flex-wrap gap-3">
                        <button class="bg-accent-red hover:bg-accent-red-hover text-white text-sm sm:text-base font-semibold px-6 py-2.5 rounded-md shadow-lg flex items-center transition">
                            <i class="fa-solid fa-heart mr-2"></i> সহায়তা করুন
                        </button>
                        <button class="bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-semibold px-6 py-2.5 rounded-md shadow-lg flex items-center transition">
                            <i class="fa-solid fa-hand-holding-medical mr-2"></i> সেবা গ্রহণ করুন
                        </button>
                    </div>
                </div>
            </div>

            <!-- Slider Arrows -->
            <button class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

            <!-- Slider Pagination Indicators -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                <span class="w-3 h-3 rounded-full bg-accent-red inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-white/60 hover:bg-white cursor-pointer inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-white/60 hover:bg-white cursor-pointer inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-white/60 hover:bg-white cursor-pointer inline-block"></span>
            </div>

        </div>
    </section>

    <!-- NOTICE TICKER BAR -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center">
            
            <!-- Red Notice Badge -->
            <div class="bg-accent-red text-white text-xs sm:text-sm font-bold px-3 py-1 rounded flex items-center space-x-1 flex-shrink-0 z-10 shadow-sm">
                <i class="fa-solid fa-bullhorn text-xs mr-1 animate-pulse"></i>
                <span>নোটিশ</span>
            </div>

            <!-- Ticker Marquee text -->
            <div class="overflow-hidden whitespace-nowrap ml-3 text-xs sm:text-sm text-gray-700 font-medium flex-1">
                <div class="inline-block animate-marquee pl-4">
                    বন্যাউপদ্রুত এলাকায় ত্রাণ সহায়তার কার্যক্রম চলছে। আপনার সহযোগিতায় আমরা আরও বেশি মানুষকে সহায়তা করতে পারব।
                </div>
            </div>

            <!-- Right link -->
            <a href="#" class="text-xs sm:text-sm text-accent-red hover:underline font-semibold flex items-center flex-shrink-0 ml-2">
                সব নোটিশ দেখুন <i class="fa-solid fa-arrow-right-long ml-1 text-xs"></i>
            </a>

        </div>
    </div>

    <!-- OUR SERVICES SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div class="text-center mb-8">
            <h2 class="section-heading-line text-2xl sm:text-3xl font-extrabold text-gray-800">
                আমাদের সেবাসমূহ
            </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <!-- Service 1: Relief -->
            <div class="bg-red-50/50 hover:bg-red-50 border border-red-100 rounded-xl p-4 text-center transition duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow">
                <div class="w-12 h-12 mx-auto rounded-full bg-red-100 text-accent-red flex items-center justify-center text-xl mb-3">
                    <i class="fa-solid fa-hand-holding-heart"></i>
                </div>
                <h3 class="font-bold text-gray-800 text-base mb-1">ত্রাণ সহায়তা</h3>
                <p class="text-xs text-gray-500 mb-3 line-clamp-2">দুর্যোগের সময় দুর্গতদের পাশে আমরা সব সময়</p>
                <a href="#" class="inline-block border border-red-200 text-accent-red text-xs font-semibold px-3 py-1 rounded hover:bg-accent-red hover:text-white transition">বিস্তারিত দেখুন</a>
            </div>

            <!-- Service 2: Medical -->
            <div class="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center transition duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow">
                <div class="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-primary flex items-center justify-center text-xl mb-3">
                    <i class="fa-solid fa-user-doctor"></i>
                </div>
                <h3 class="font-bold text-gray-800 text-base mb-1">চিকিৎসা সহায়তা</h3>
                <p class="text-xs text-gray-500 mb-3 line-clamp-2">চিকিৎসা না পাওয়া অসহায় রোগীদের বিনামূল্যে ঔষধ ও চিকিৎসা সেবা প্রদান</p>
                <a href="#" class="inline-block border border-emerald-200 text-primary text-xs font-semibold px-3 py-1 rounded hover:bg-primary hover:text-white transition">বিস্তারিত দেখুন</a>
            </div>

            <!-- Service 3: Blood -->
            <div class="bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-xl p-4 text-center transition duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow">
                <div class="w-12 h-12 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-3">
                    <i class="fa-solid fa-droplet"></i>
                </div>
                <h3 class="font-bold text-gray-800 text-base mb-1">রক্ত সহায়তা</h3>
                <p class="text-xs text-gray-500 mb-3 line-clamp-2">জরুরি রক্তের প্রয়োজনে এগিয়ে আসুন, জীবন বাঁচান</p>
                <a href="#" class="inline-block border border-rose-200 text-rose-600 text-xs font-semibold px-3 py-1 rounded hover:bg-rose-600 hover:text-white transition">বিস্তারিত দেখুন</a>
            </div>

            <!-- Service 4: Education -->
            <div class="bg-sky-50/50 hover:bg-sky-50 border border-sky-100 rounded-xl p-4 text-center transition duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow">
                <div class="w-12 h-12 mx-auto rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xl mb-3">
                    <i class="fa-solid fa-book-open"></i>
                </div>
                <h3 class="font-bold text-gray-800 text-base mb-1">শিক্ষা সহায়তা</h3>
                <p class="text-xs text-gray-500 mb-3 line-clamp-2">শিক্ষা উপকরণ ও বৃত্তির মাধ্যমে অসহায় শিক্ষার্থীদের সহযোগিতা</p>
                <a href="#" class="inline-block border border-sky-200 text-sky-600 text-xs font-semibold px-3 py-1 rounded hover:bg-sky-600 hover:text-white transition">বিস্তারিত দেখুন</a>
            </div>

            <!-- Service 5: Social -->
            <div class="bg-amber-50/50 hover:bg-amber-50 border border-amber-100 rounded-xl p-4 text-center transition duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow">
                <div class="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-3">
                    <i class="fa-solid fa-users"></i>
                </div>
                <h3 class="font-bold text-gray-800 text-base mb-1">সামাজিক সহায়তা</h3>
                <p class="text-xs text-gray-500 mb-3 line-clamp-2">আবহাওয়া ও দরিদ্র মানুষের জন্য সামাজিক সচেতনতা কার্যক্রম</p>
                <a href="#" class="inline-block border border-amber-200 text-amber-600 text-xs font-semibold px-3 py-1 rounded hover:bg-amber-600 hover:text-white transition">বিস্তারিত দেখুন</a>
            </div>

            <!-- Service 6: Emergency -->
            <div class="bg-purple-50/50 hover:bg-purple-50 border border-purple-100 rounded-xl p-4 text-center transition duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow">
                <div class="w-12 h-12 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-3">
                    <i class="fa-solid fa-truck-medical"></i>
                </div>
                <h3 class="font-bold text-gray-800 text-base mb-1">জরুরি সহায়তা</h3>
                <p class="text-xs text-gray-500 mb-3 line-clamp-2">জরুরি সেবার জন্য আমরা সর্বদা প্রস্তুত</p>
                <a href="#" class="inline-block border border-purple-200 text-purple-600 text-xs font-semibold px-3 py-1 rounded hover:bg-purple-600 hover:text-white transition">বিস্তারিত দেখুন</a>
            </div>

        </div>
    </section>

    <!-- CHAIRMAN MESSAGE & BOARD SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Left 2 Cols: Chairman Message -->
            <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
                
                <div class="w-44 flex-shrink-0 text-center">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop" 
                         alt="Chairman Photo" 
                         class="w-36 h-40 object-cover rounded-lg border-2 border-emerald-600 mx-auto shadow-sm">
                    <h4 class="font-bold text-gray-900 text-sm mt-2">জনাব মোঃ শফিকুল ইসলাম</h4>
                    <span class="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-100 inline-block mt-1">চেয়ারম্যান</span>
                </div>

                <div class="flex-1 space-y-3">
                    <div class="flex items-center space-x-2 text-emerald-800 font-bold text-lg border-b border-gray-100 pb-2">
                        <i class="fa-solid fa-quote-left text-accent-red text-2xl"></i>
                        <span>চেয়ারম্যানের বার্তা</span>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed italic">
                        মানুষের মুখে হাসি ফোটানোই আমাদের মূল লক্ষ্য। সমাজের প্রতিটি স্তরের মানুষকে সহায়তা করা, তাদের পাশে দাঁড়ানো এবং একটি সুন্দর মানবিক সমাজ গঠন করা আমাদের অঙ্গীকার। আসুন, আমরা সবাই মিলে একটি মানবিক বাংলাদেশ গড়ে তুলি।
                    </p>
                    <div class="pt-2 border-t border-gray-100 text-right">
                        <p class="font-bold text-gray-800 text-sm">জনাব মোঃ শফিকুল ইসলাম</p>
                        <p class="text-xs text-gray-500">চেয়ারম্যান</p>
                    </div>
                </div>

            </div>

            <!-- Right 1 Col: Board Members -->
            <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-gray-800 text-center border-b border-gray-100 pb-2 text-base mb-4">
                        পরিচালনা পরিষদ সম্মাননা
                    </h3>
                    <div class="grid grid-cols-3 gap-3 text-center">
                        <div>
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" class="w-12 h-12 rounded-full mx-auto border object-cover">
                            <p class="text-[11px] font-semibold text-gray-800 mt-1 truncate">তানজিম আহমেদ</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" class="w-12 h-12 rounded-full mx-auto border object-cover">
                            <p class="text-[11px] font-semibold text-gray-800 mt-1 truncate">আরিফ রহমান</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" class="w-12 h-12 rounded-full mx-auto border object-cover">
                            <p class="text-[11px] font-semibold text-gray-800 mt-1 truncate">সাইফুল ইসলাম</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop" class="w-12 h-12 rounded-full mx-auto border object-cover">
                            <p class="text-[11px] font-semibold text-gray-800 mt-1 truncate">রাকিব হোসেন</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" class="w-12 h-12 rounded-full mx-auto border object-cover">
                            <p class="text-[11px] font-semibold text-gray-800 mt-1 truncate">মোঃ ইমরান</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop" class="w-12 h-12 rounded-full mx-auto border object-cover">
                            <p class="text-[11px] font-semibold text-gray-800 mt-1 truncate">তাহমিদ হাসান</p>
                        </div>
                    </div>
                </div>

                <div class="mt-4 text-center">
                    <a href="#" class="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center transition shadow-sm">
                        সব সদস্য দেখুন <i class="fa-solid fa-arrow-right-long ml-1.5"></i>
                    </a>
                </div>
            </div>

        </div>
    </section>

    <!-- ALL MEMBERS PROFILES SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div class="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
            <h2 class="text-xl sm:text-2xl font-extrabold text-gray-800">
                — সকল সদস্য পরিচিতি —
            </h2>
            <a href="#" class="text-xs sm:text-sm text-primary font-bold hover:underline flex items-center">
                সবাই দেখুন <i class="fa-solid fa-arrow-right-long ml-1"></i>
            </a>
        </div>

        <div class="relative">
            <!-- Carousel Controls -->
            <button class="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-emerald-600 hover:text-white transition">
                <i class="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button class="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-emerald-600 hover:text-white transition">
                <i class="fa-solid fa-chevron-right text-xs"></i>
            </button>

            <!-- Grid of Members -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                
                <!-- Member 1 -->
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow transition">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" class="w-20 h-24 object-cover mx-auto rounded border mb-2">
                    <h4 class="font-bold text-gray-800 text-xs truncate">আল আমিন রানা</h4>
                    <p class="text-[11px] text-gray-500">সহ-সভাপতি</p>
                </div>

                <!-- Member 2 -->
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow transition">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" class="w-20 h-24 object-cover mx-auto rounded border mb-2">
                    <h4 class="font-bold text-gray-800 text-xs truncate">আফিয়া আক্তার</h4>
                    <p class="text-[11px] text-gray-500">সাধারণ সম্পাদক</p>
                </div>

                <!-- Member 3 -->
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow transition">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" class="w-20 h-24 object-cover mx-auto rounded border mb-2">
                    <h4 class="font-bold text-gray-800 text-xs truncate">মাহমুদুল হাসান</h4>
                    <p class="text-[11px] text-gray-500">যুগ্ম সাধারণ সম্পাদক</p>
                </div>

                <!-- Member 4 -->
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow transition">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" class="w-20 h-24 object-cover mx-auto rounded border mb-2">
                    <h4 class="font-bold text-gray-800 text-xs truncate">শারমিন আক্তার</h4>
                    <p class="text-[11px] text-gray-500">সাংগঠনিক সম্পাদক</p>
                </div>

                <!-- Member 5 -->
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow transition">
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" class="w-20 h-24 object-cover mx-auto rounded border mb-2">
                    <h4 class="font-bold text-gray-800 text-xs truncate">মোঃ রাকিব হাসান</h4>
                    <p class="text-[11px] text-gray-500">অর্থ সম্পাদক</p>
                </div>

                <!-- Member 6 -->
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow transition">
                    <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop" class="w-20 h-24 object-cover mx-auto rounded border mb-2">
                    <h4 class="font-bold text-gray-800 text-xs truncate">নাজমুল হক</h4>
                    <p class="text-[11px] text-gray-500">দপ্তর সম্পাদক</p>
                </div>

            </div>
        </div>

    </section>

    <!-- LATEST NEWS SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div class="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
            <h2 class="text-xl sm:text-2xl font-extrabold text-gray-800">
                সর্বশেষ নিউজ
            </h2>
            <a href="#" class="text-xs sm:text-sm text-primary font-bold hover:underline flex items-center">
                সব নিউজ দেখুন <i class="fa-solid fa-arrow-right-long ml-1"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <!-- News Card 1 -->
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div class="relative h-40">
                    <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=500&auto=format&fit=crop" class="w-full h-full object-cover">
                    <span class="absolute top-2 left-2 bg-accent-red text-white text-[10px] font-bold px-2 py-0.5 rounded">ত্রাণ কার্যক্রম</span>
                </div>
                <div class="p-3.5">
                    <h3 class="font-bold text-gray-800 text-sm hover:text-primary cursor-pointer line-clamp-2 leading-snug">
                        বন্যাউপদ্রুত এলাকায় ত্রাণ বিতরণ কার্যক্রম অব্যাহত
                    </h3>
                    <div class="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                        <span><i class="fa-regular fa-calendar mr-1"></i> 07 July 2026</span>
                        <span><i class="fa-regular fa-eye mr-1"></i> 1.2K</span>
                    </div>
                </div>
            </div>

            <!-- News Card 2 -->
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div class="relative h-40">
                    <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=500&auto=format&fit=crop" class="w-full h-full object-cover">
                    <span class="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">রক্তদান</span>
                </div>
                <div class="p-3.5">
                    <h3 class="font-bold text-gray-800 text-sm hover:text-primary cursor-pointer line-clamp-2 leading-snug">
                        স্বেচ্ছায় রক্তদান কর্মসূচি অনুষ্ঠিত
                    </h3>
                    <div class="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                        <span><i class="fa-regular fa-calendar mr-1"></i> 06 July 2026</span>
                        <span><i class="fa-regular fa-eye mr-1"></i> 890</span>
                    </div>
                </div>
            </div>

            <!-- News Card 3 -->
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div class="relative h-40">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=500&auto=format&fit=crop" class="w-full h-full object-cover">
                    <span class="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">স্বাস্থ্য সেবা</span>
                </div>
                <div class="p-3.5">
                    <h3 class="font-bold text-gray-800 text-sm hover:text-primary cursor-pointer line-clamp-2 leading-snug">
                        ফ্রি মেডিকেল ক্যাম্পেইনের আয়োজন করা হয়
                    </h3>
                    <div class="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                        <span><i class="fa-regular fa-calendar mr-1"></i> 05 July 2026</span>
                        <span><i class="fa-regular fa-eye mr-1"></i> 1.5K</span>
                    </div>
                </div>
            </div>

            <!-- News Card 4 -->
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div class="relative h-40">
                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop" class="w-full h-full object-cover">
                    <span class="absolute top-2 left-2 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">শিক্ষা সহায়তা</span>
                </div>
                <div class="p-3.5">
                    <h3 class="font-bold text-gray-800 text-sm hover:text-primary cursor-pointer line-clamp-2 leading-snug">
                        অসহায় শিক্ষার্থীদের মাঝে শিক্ষা উপকরণ বিতরণ
                    </h3>
                    <div class="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                        <span><i class="fa-regular fa-calendar mr-1"></i> 04 July 2026</span>
                        <span><i class="fa-regular fa-eye mr-1"></i> 980</span>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <!-- PHOTO & VIDEO GALLERY SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Photo Gallery Column -->
            <div>
                <div class="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                    <h3 class="text-lg font-extrabold text-gray-800 flex items-center">
                        <i class="fa-regular fa-images text-primary mr-2"></i> ছবি গ্যালারি
                    </h3>
                    <a href="#" class="text-xs text-primary font-bold hover:underline">সব ছবি দেখুন -></a>
                </div>

                <div class="grid grid-cols-3 gap-2">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover rounded border hover:opacity-90 transition cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover rounded border hover:opacity-90 transition cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover rounded border hover:opacity-90 transition cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover rounded border hover:opacity-90 transition cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover rounded border hover:opacity-90 transition cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover rounded border hover:opacity-90 transition cursor-pointer">
                </div>
            </div>

            <!-- Video Gallery Column -->
            <div>
                <div class="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                    <h3 class="text-lg font-extrabold text-gray-800 flex items-center">
                        <i class="fa-solid fa-video text-accent-red mr-2"></i> ভিডিও গ্যালারি
                    </h3>
                    <a href="#" class="text-xs text-primary font-bold hover:underline">সব ভিডিও দেখুন -></a>
                </div>

                <div class="grid grid-cols-3 gap-3">
                    
                    <div class="space-y-1">
                        <div class="relative rounded overflow-hidden group cursor-pointer border">
                            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover">
                            <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition">
                                <i class="fa-regular fa-circle-play text-white text-2xl"></i>
                            </div>
                            <span class="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded">02:45</span>
                        </div>
                        <p class="text-[11px] font-semibold text-gray-800 line-clamp-1">ত্রাণ বিতরণ কার্যক্রম</p>
                    </div>

                    <div class="space-y-1">
                        <div class="relative rounded overflow-hidden group cursor-pointer border">
                            <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover">
                            <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition">
                                <i class="fa-regular fa-circle-play text-white text-2xl"></i>
                            </div>
                            <span class="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded">03:12</span>
                        </div>
                        <p class="text-[11px] font-semibold text-gray-800 line-clamp-1">রক্তদান কর্মসূচি</p>
                    </div>

                    <div class="space-y-1">
                        <div class="relative rounded overflow-hidden group cursor-pointer border">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=300&auto=format&fit=crop" class="w-full h-24 object-cover">
                            <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition">
                                <i class="fa-regular fa-circle-play text-white text-2xl"></i>
                            </div>
                            <span class="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded">04:06</span>
                        </div>
                        <p class="text-[11px] font-semibold text-gray-800 line-clamp-1">ফ্রি মেডিকেল ক্যাম্প</p>
                    </div>

                </div>
            </div>

        </div>
    </section>

    <!-- PARTNERS SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div class="text-center mb-6">
            <h2 class="section-heading-line text-lg font-bold text-gray-700">
                সহযোগী প্রতিষ্ঠান
            </h2>
        </div>

        <div class="relative flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm overflow-hidden">
            
            <button class="text-gray-400 hover:text-gray-700 px-2">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center flex-1 mx-4 text-center">
                <!-- Partner 1 -->
                <div class="flex items-center justify-center font-black text-rose-700 text-lg tracking-wider">
                    <i class="fa-solid fa-hand-holding-medical text-rose-600 mr-1 text-xl"></i> BPAC
                </div>
                <!-- Partner 2 -->
                <div class="flex items-center justify-center font-bold text-red-600 text-xs">
                    <i class="fa-solid fa-crescent-moon text-red-600 mr-1.5 text-lg"></i> Red Crescent
Society
                </div>
                <!-- Partner 3 -->
                <div class="flex items-center justify-center font-bold text-blue-800 text-xs">
                    <i class="fa-solid fa-dharmachakra text-blue-700 mr-1 text-lg"></i> Rotary
International
                </div>
                <!-- Partner 4 -->
                <div class="flex items-center justify-center font-bold text-sky-700 text-xs">
                    <i class="fa-solid fa-earth-americas text-sky-600 mr-1 text-lg"></i> UNITED NATIONS
BANGLADESH
                </div>
                <!-- Partner 5 -->
                <div class="flex items-center justify-center font-bold text-emerald-800 text-xs">
                    <i class="fa-solid fa-building-columns text-emerald-700 mr-1 text-lg"></i> Islami Bank
Bangladesh PLC.
                </div>
                <!-- Partner 6 -->
                <div class="flex items-center justify-center font-extrabold text-pink-600 text-lg">
                    bKash
                </div>
            </div>

            <button class="text-gray-400 hover:text-gray-700 px-2">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

        </div>

    </section>

    <!-- LOCATION & CONTACT CARDS SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Contact Us Box -->
            <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
                <h3 class="font-extrabold text-gray-800 text-base border-b border-gray-100 pb-2">
                    যোগাযোগ করুন
                </h3>
                <div class="space-y-2 text-xs text-gray-600">
                    <p class="flex items-start">
                        <i class="fa-solid fa-location-dot text-primary mt-0.5 mr-2.5 text-sm"></i>
                        <span>House # 12, Road # 05,
Dhanmondi, Dhaka-1205, Bangladesh</span>
                    </p>
                    <p class="flex items-center">
                        <i class="fa-solid fa-phone text-primary mr-2.5 text-sm"></i>
                        <span>01712-345678</span>
                    </p>
                    <p class="flex items-center">
                        <i class="fa-solid fa-envelope text-primary mr-2.5 text-sm"></i>
                        <span>info@bondhu.org</span>
                    </p>
                    <p class="flex items-center">
                        <i class="fa-solid fa-globe text-primary mr-2.5 text-sm"></i>
                        <span>www.bondhu.org</span>
                    </p>
                </div>
                <div class="pt-2 flex items-center space-x-2">
                    <a href="#" class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:opacity-90"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs hover:opacity-90"><i class="fa-brands fa-youtube"></i></a>
                    <a href="#" class="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs hover:opacity-90"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" class="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs hover:opacity-90"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>

            <!-- Our Location / Map Box -->
            <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2">
                <h3 class="font-extrabold text-gray-800 text-base border-b border-gray-100 pb-2">
                    আমাদের অবস্থান
                </h3>
                <div class="h-36 rounded border overflow-hidden relative">
                    <!-- Embedded Map Graphic Simulation -->
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-white/30 flex items-center justify-center">
                        <div class="bg-white px-3 py-1.5 rounded shadow-lg border border-gray-200 text-center">
                            <p class="text-xs font-bold text-gray-800">Bondhu Social Foundation</p>
                            <p class="text-[10px] text-gray-500">House # 12, Road # 05, Dhanmondi</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Office Timing & Live Camera View -->
            <div class="space-y-4">
                <!-- Office Timing -->
                <div class="bg-emerald-900 text-white rounded-xl p-4 shadow-sm flex items-start space-x-3">
                    <i class="fa-regular fa-clock text-emerald-300 text-2xl mt-1"></i>
                    <div>
                        <h4 class="font-bold text-sm text-emerald-100">অফিস চলাকালীন সময়</h4>
                        <p class="text-xs text-emerald-200 mt-1">শনিবার - বৃহস্পতিবার</p>
                        <p class="text-xs text-white font-semibold">সকাল ৯:০০ টা - বিকাল ৫:০০ টা</p>
                        <p class="text-[11px] text-emerald-300">(শুক্রবার বন্ধ)</p>
                    </div>
                </div>

                <!-- Live Camera Views -->
                <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-2">
                    <h4 class="font-bold text-gray-800 text-xs border-b border-gray-100 pb-1">
                        ক্যামেরা / লাইভ ভিউ
                    </h4>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="relative rounded overflow-hidden border">
                            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=200&auto=format&fit=crop" class="w-full h-16 object-cover">
                            <span class="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded animate-pulse">LIVE</span>
                            <span class="absolute bottom-1 left-1 text-white text-[9px] font-medium drop-shadow">Live Camera 01</span>
                        </div>
                        <div class="relative rounded overflow-hidden border">
                            <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=200&auto=format&fit=crop" class="w-full h-16 object-cover">
                            <span class="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded animate-pulse">LIVE</span>
                            <span class="absolute bottom-1 left-1 text-white text-[9px] font-medium drop-shadow">Live Camera 02</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- FOOTER SECTION -->
    <footer class="bg-primary text-gray-200 mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                
                <!-- Col 1: About -->
                <div class="space-y-3">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent-red font-bold text-lg">
                            <i class="fa-solid fa-hand-holding-heart"></i>
                        </div>
                        <span class="text-xl font-bold text-white tracking-tight">Bondhu<span class="text-emerald-300">.org</span></span>
                    </div>
                    <p class="text-xs text-emerald-100 leading-relaxed">
                        Bondhu.org একটি সামাজিক ও মানবিক প্রতিষ্ঠান। আমরা অসহায় মানুষের পাশে দাঁড়িয়ে এবং সেবার মাধ্যমে একটি সুন্দর সমাজ গঠন করতে কাজ করে যাচ্ছি।
                    </p>
                    <div class="flex space-x-2 text-xs pt-1">
                        <a href="#" class="w-7 h-7 rounded bg-emerald-800 flex items-center justify-center hover:bg-emerald-700 text-white"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="w-7 h-7 rounded bg-emerald-800 flex items-center justify-center hover:bg-emerald-700 text-white"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#" class="w-7 h-7 rounded bg-emerald-800 flex items-center justify-center hover:bg-emerald-700 text-white"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>

                <!-- Col 2: Quick Links -->
                <div>
                    <h4 class="font-bold text-white text-sm border-b border-emerald-700 pb-2 mb-3">দ্রুত লিংক</h4>
                    <ul class="space-y-1.5 text-xs text-emerald-100">
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> হোম</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> আমাদের সম্পর্কে</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> সেবাসমূহ</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> নিউজ</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> গ্যালারি</a></li>
                    </ul>
                </div>

                <!-- Col 3: Services -->
                <div>
                    <h4 class="font-bold text-white text-sm border-b border-emerald-700 pb-2 mb-3">সেবা সমূহ</h4>
                    <ul class="space-y-1.5 text-xs text-emerald-100">
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> ত্রাণ সহায়তা</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> চিকিৎসা সহায়তা</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> রক্ত সহায়তা</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> শিক্ষা সহায়তা</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> জরুরি সহায়তা</a></li>
                    </ul>
                </div>

                <!-- Col 4: Helpful Links -->
                <div>
                    <h4 class="font-bold text-white text-sm border-b border-emerald-700 pb-2 mb-3">সহায়ক লিংক</h4>
                    <ul class="space-y-1.5 text-xs text-emerald-100">
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> নীতিমালা</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> শর্তাবলী</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> গোপনীয়তা নীতি</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> যোগাযোগ</a></li>
                        <li><a href="#" class="hover:underline flex items-center"><i class="fa-solid fa-chevron-right text-[9px] mr-1.5 text-emerald-400"></i> সাইট ম্যাপ</a></li>
                    </ul>
                </div>

                <!-- Col 5: Newsletter -->
                <div>
                    <h4 class="font-bold text-white text-sm border-b border-emerald-700 pb-2 mb-3">আমাদের সাথে যুক্ত থাকুন</h4>
                    <p class="text-xs text-emerald-200 mb-2">আমাদের সর্বশেষ আপডেট পেতে ইমেইল সাবস্ক্রাইব করে রাখুন।</p>
                    <form class="space-y-2" onsubmit="event.preventDefault();">
                        <input type="email" placeholder="আপনার ইমেইল লিখুন" class="w-full text-xs px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none">
                        <button type="submit" class="w-full bg-accent-red hover:bg-accent-red-hover text-white text-xs font-semibold py-2 rounded transition">সাবস্ক্রাইব</button>
                    </form>
                </div>

            </div>
        </div>

        <!-- Bottom Sub-Footer -->
        <div class="bg-primary-dark border-t border-emerald-900 py-3 text-xs text-emerald-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p>© 2026 Bondhu.org. All Rights Reserved.</p>
                <div class="flex space-x-4">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                    <span>|</span>
                    <a href="#" class="hover:underline">Terms & Conditions</a>
                    <span>|</span>
                    <a href="#" class="hover:underline">Support</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- INTERACTIVE JAVASCRIPT LOGIC -->
    <script>
        // Toggle Mobile Menu
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    </script>
</body>
</html>

