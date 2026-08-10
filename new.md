<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>সেবা সহায়ক - সব সেবার এক ঠিকানা</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts: Hind Siliguri for Bengali typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            500: '#10b981',
                            600: '#00a651',
                            700: '#008a43',
                            800: '#065f46',
                        }
                    },
                    fontFamily: {
                        sans: ['Hind Siliguri', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            font-family: 'Hind Siliguri', sans-serif;
            background-color: #f4f6f8;
            color: #333333;
        }
        
        .custom-shadow {
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        }

        .custom-card-shadow {
            box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        /* Smooth tab transition */
        .tab-btn {
            transition: all 0.2s ease-in-out;
        }

        /* Toast animation */
        @keyframes slideUp {
            from { transform: translateY(100%) translateX(-50%); opacity: 0; }
            to { transform: translateY(0) translateX(-50%); opacity: 1; }
        }
        .toast-animate {
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col antialiased">

    <!-- Top Mode Toggle Bar for Seamless Demo Experience -->
    <div class="bg-slate-900 text-white text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="font-medium text-slate-200">সেবা সহায়ক ওয়েব প্ল্যাটফর্ম</span>
                <span class="text-slate-400 hidden sm:inline">| মূল পোর্টাল এবং অ্যাডমিন প্যানেল ভিউ</span>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="switchView('split')" id="btn-view-split" class="px-3 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm">
                    <i data-lucide="columns" class="w-3.5 h-3.5 inline mr-1"></i>পাশাপাশি জোড়া ভিউ (Split Screen)
                </button>
                <button onclick="switchView('public')" id="btn-view-public" class="px-3 py-1 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
                    <i data-lucide="globe" class="w-3.5 h-3.5 inline mr-1"></i>পাবলিক পোটাল
                </button>
                <button onclick="switchView('admin')" id="btn-view-admin" class="px-3 py-1 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
                    <i data-lucide="layout-dashboard" class="w-3.5 h-3.5 inline mr-1"></i>অ্যাডমিন ড্যাশবোর্ড
                </button>
            </div>
        </div>
    </div>

    <!-- MAIN CONTAINER FOR SPLIT OR SINGLE VIEW -->
    <main id="main-container" class="flex-1 w-full max-w-[1720px] mx-auto p-3 md:p-5 transition-all duration-300">
        <div id="views-wrapper" class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            <!-- LEFT CONTAINER: PUBLIC PORTAL -->
            <div id="public-portal-container" class="bg-white rounded-2xl border border-gray-200 custom-card-shadow overflow-hidden flex flex-col min-h-[850px]">
                
                <!-- Navbar -->
                <header class="bg-white border-b border-gray-100 px-4 md:px-6 py-3.5 flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
                            <i data-lucide="sprout" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-gray-800 leading-tight">সেবা সহায়ক</h1>
                            <p class="text-[11px] text-emerald-700 font-medium -mt-0.5">সব সেবার এক ঠিকানা</p>
                        </div>
                    </div>

                    <!-- Desktop Nav Links -->
                    <nav class="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">
                        <a href="#" class="flex items-center gap-1.5 text-emerald-600 font-semibold hover:text-emerald-700">
                            <i data-lucide="home" class="w-4 h-4"></i> হোম
                        </a>
                        <a href="#" class="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                            <i data-lucide="layout-grid" class="w-4 h-4"></i> সকল সেবা
                        </a>
                        <a href="#" class="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                            <i data-lucide="phone-call" class="w-4 h-4"></i> জরুরি সেবা
                        </a>
                        <a href="#" class="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                            <i data-lucide="headphones" class="w-4 h-4"></i> যোগাযোগ
                        </a>
                    </nav>

                    <div class="flex items-center gap-2">
                        <button onclick="openAdminFormFromPublic()" class="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm transition-all shadow-sm flex items-center gap-1">
                            লগইন
                        </button>
                        <button class="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                            <i data-lucide="user" class="w-5 h-5"></i>
                        </button>
                    </div>
                </header>

                <!-- Public Portal Content -->
                <div class="p-4 md:p-6 flex-1 flex flex-col">
                    
                    <!-- Search Header Banner -->
                    <div class="text-center my-4 max-w-xl mx-auto w-full">
                        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">যেকোনো সেবা খুঁজুন</h2>
                        <p class="text-sm text-gray-500 mt-1">নাম, কীওয়ার্ড বা নম্বর লিখে সার্চ করুন</p>
                        
                        <!-- Search Box -->
                        <div class="mt-4 relative flex items-center shadow-sm rounded-xl border border-gray-300 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-500/20 bg-white overflow-hidden transition-all">
                            <i data-lucide="search" class="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none"></i>
                            <input 
                                type="text" 
                                id="public-search-input"
                                oninput="filterServices()"
                                placeholder="999 / 333 / 16123 / পুলিশ / কৃষি / হাসপাতাল..." 
                                class="w-full pl-11 pr-24 py-3 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
                            >
                            <button onclick="filterServices()" class="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm rounded-lg flex items-center gap-1.5 transition-colors shadow-sm">
                                <i data-lucide="search" class="w-4 h-4"></i> সার্চ
                            </button>
                        </div>
                    </div>

                    <!-- Category Filter Chips -->
                    <div class="flex items-center gap-2 overflow-x-auto py-2 my-2 no-scrollbar justify-start md:justify-center">
                        <button onclick="setCategoryFilter('all', this)" class="category-chip px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm transition-all">
                            সব সেবা
                        </button>
                        <button onclick="setCategoryFilter('government', this)" class="category-chip px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all">
                            সরকারি সেবা
                        </button>
                        <button onclick="setCategoryFilter('emergency', this)" class="category-chip px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all">
                            জরুরি সেবা
                        </button>
                        <button onclick="setCategoryFilter('health', this)" class="category-chip px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all">
                            স্বাস্থ্য সেবা
                        </button>
                        <button onclick="setCategoryFilter('agriculture', this)" class="category-chip px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all">
                            কৃষি সেবা
                        </button>
                        <button class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1">
                            আরও <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>

                    <!-- Services Grid -->
                    <div id="services-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        
                        <!-- Card 1: 999 Emergency -->
                        <div class="service-card bg-white rounded-xl border border-gray-200 p-4 relative hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between" data-category="emergency" data-title="জাতীয় জরুরি সেবা" data-number="999" data-tags="পুলিশ ফায়ার অ্যাম্বুলেন্স emergency">
                            <!-- Category Badge -->
                            <div class="absolute top-3 left-3">
                                <span class="bg-red-100 text-red-600 text-[11px] font-semibold px-2 py-0.5 rounded border border-red-200">
                                    জরুরি সেবা
                                </span>
                            </div>

                            <div>
                                <!-- Top info row -->
                                <div class="flex items-start justify-between pt-6 mb-3">
                                    <div class="flex items-center gap-3">
                                        <!-- Red Circle Badge with Icon -->
                                        <div class="w-14 h-14 rounded-full bg-red-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm relative">
                                            <i data-lucide="siren" class="w-5 h-5 mb-0.5"></i>
                                            <span class="text-xs font-extrabold leading-none">999</span>
                                        </div>
                                        <div>
                                            <h3 class="text-base font-bold text-gray-800 leading-snug">জাতীয় জরুরি সেবা</h3>
                                            <p class="text-xs text-gray-500 font-medium">পুলিশ, ফায়ার, অ্যাম্বুলেন্স</p>
                                            <p class="text-2xl font-black text-red-600 tracking-tight mt-0.5">999</p>
                                        </div>
                                    </div>
                                    <button onclick="copyToClipboard('999')" class="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-emerald-600 hover:text-emerald-700 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-all bg-white shadow-2xs">
                                        <i data-lucide="copy" class="w-3.5 h-3.5 text-gray-500"></i> কপি
                                    </button>
                                </div>

                                <!-- Time & Tag meta -->
                                <div class="flex items-center gap-4 text-xs text-gray-500 my-2 pt-1 border-t border-gray-100">
                                    <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-gray-400"></i> ২৪ ঘণ্টা</span>
                                    <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i> জরুরি সেবা</span>
                                </div>

                                <!-- Description -->
                                <div class="mt-2">
                                    <h4 class="text-xs font-bold text-gray-700">বিবরণ</h4>
                                    <p class="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                                        জরুরি প্রয়োজনে পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সহায়তার জন্য এই নম্বরে যোগাযোগ করুন।
                                    </p>
                                </div>
                            </div>

                            <!-- Footer action button -->
                            <div class="mt-4 pt-2 text-right">
                                <button onclick="showDetailsModal('জাতীয় জরুরি সেবা', '999', 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সহায়তার জন্য এই নম্বরে যোগাযোগ করা যায়। এটি একটি জাতীয় জরুরি সেবা নম্বর। দেশের যেকোনো স্থান থেকে ২৪ ঘণ্টা এই সেবা পাওয়া যায়।', 'জরুরি সেবা', '২৪ ঘণ্টা')" class="px-3.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                                    বিস্তারিত দেখুন <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Card 2: 333 Govt Info -->
                        <div class="service-card bg-white rounded-xl border border-gray-200 p-4 relative hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between" data-category="government" data-title="সরকারি তথ্য ও সেবা" data-number="333" data-tags="সরকারি তথ্য সেবা কেন্দ্র government">
                            <!-- Category Badge -->
                            <div class="absolute top-3 left-3">
                                <span class="bg-blue-100 text-blue-600 text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                                    সরকারি সেবা
                                </span>
                            </div>

                            <div>
                                <!-- Top info row -->
                                <div class="flex items-start justify-between pt-6 mb-3">
                                    <div class="flex items-center gap-3">
                                        <!-- Blue Circle Badge with Icon -->
                                        <div class="w-14 h-14 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm relative">
                                            <i data-lucide="landmark" class="w-5 h-5 mb-0.5"></i>
                                            <span class="text-xs font-extrabold leading-none">333</span>
                                        </div>
                                        <div>
                                            <h3 class="text-base font-bold text-gray-800 leading-snug">সরকারি তথ্য ও সেবা</h3>
                                            <p class="text-xs text-gray-500 font-medium">জাতীয় তথ্য সেবা কেন্দ্র</p>
                                            <p class="text-2xl font-black text-blue-600 tracking-tight mt-0.5">333</p>
                                        </div>
                                    </div>
                                    <button onclick="copyToClipboard('333')" class="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-emerald-600 hover:text-emerald-700 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-all bg-white shadow-2xs">
                                        <i data-lucide="copy" class="w-3.5 h-3.5 text-gray-500"></i> কপি
                                    </button>
                                </div>

                                <!-- Time & Tag meta -->
                                <div class="flex items-center gap-4 text-xs text-gray-500 my-2 pt-1 border-t border-gray-100">
                                    <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-gray-400"></i> ২৪ ঘণ্টা</span>
                                    <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i> সরকারি সেবা</span>
                                </div>

                                <!-- Description -->
                                <div class="mt-2">
                                    <h4 class="text-xs font-bold text-gray-700">বিবরণ</h4>
                                    <p class="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                                        সরকারি বিভিন্ন সেবা, তথ্য ও পরামর্শ পাওয়ার জন্য এই নম্বরে যোগাযোগ করা যায়।
                                    </p>
                                </div>
                            </div>

                            <!-- Footer action button -->
                            <div class="mt-4 pt-2 text-right">
                                <button onclick="showDetailsModal('সরকারি তথ্য ও সেবা', '333', 'সরকারি বিভিন্ন তথ্য, সামাজিক নিরাপত্তা বেষ্টনী, জেলা প্রশাসন ও পাসপোর্ট সংক্রান্ত তথ্যের জন্য ৩৩৩ নম্বরে বিনামূল্যে বা নির্ধারিত ফি-তে যোগাযোগ করা যায়।', 'সরকারি সেবা', '২৪ ঘণ্টা')" class="px-3.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                                    বিস্তারিত দেখুন <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Card 3: 16123 Agriculture -->
                        <div class="service-card bg-white rounded-xl border border-gray-200 p-4 relative hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between" data-category="agriculture" data-title="কৃষি কল সেন্টার" data-number="16123" data-tags="কৃষি তথ্য ও পরামর্শ agriculture">
                            <!-- Category Badge -->
                            <div class="absolute top-3 left-3">
                                <span class="bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded border border-emerald-200">
                                    কৃষি সেবা
                                </span>
                            </div>

                            <div>
                                <!-- Top info row -->
                                <div class="flex items-start justify-between pt-6 mb-3">
                                    <div class="flex items-center gap-3">
                                        <!-- Green Circle Badge with Icon -->
                                        <div class="w-14 h-14 rounded-full bg-emerald-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm relative">
                                            <i data-lucide="sprout" class="w-5 h-5 mb-0.5"></i>
                                            <span class="text-xs font-extrabold leading-none">16123</span>
                                        </div>
                                        <div>
                                            <h3 class="text-base font-bold text-gray-800 leading-snug">কৃষি কল সেন্টার</h3>
                                            <p class="text-xs text-gray-500 font-medium">কৃষি তথ্য ও পরামর্শ</p>
                                            <p class="text-2xl font-black text-emerald-600 tracking-tight mt-0.5">16123</p>
                                        </div>
                                    </div>
                                    <button onclick="copyToClipboard('16123')" class="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-emerald-600 hover:text-emerald-700 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-all bg-white shadow-2xs">
                                        <i data-lucide="copy" class="w-3.5 h-3.5 text-gray-500"></i> কপি
                                    </button>
                                </div>

                                <!-- Time & Tag meta -->
                                <div class="flex items-center gap-4 text-xs text-gray-500 my-2 pt-1 border-t border-gray-100">
                                    <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-gray-400"></i> সকাল ৮টা - রাত ৮টা</span>
                                    <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i> কৃষি সেবা</span>
                                </div>

                                <!-- Description -->
                                <div class="mt-2">
                                    <h4 class="text-xs font-bold text-gray-700">বিবরণ</h4>
                                    <p class="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                                        কৃষি বিষয়ক বিভিন্ন সমস্যা ও সমাধান, পরামর্শ এবং তথ্যের জন্য যোগাযোগ করুন।
                                    </p>
                                </div>
                            </div>

                            <!-- Footer action button -->
                            <div class="mt-4 pt-2 text-right">
                                <button onclick="showDetailsModal('কৃষি কল সেন্টার', '16123', 'কৃষি, ফসল, গবাদিপশু ও মৎস্য সম্পদ বিষয়ক যেকোনো জিজ্ঞাসার তাৎক্ষণিক সমাধান পেতে দেশের যেকোনো ফোন থেকে ১৬১২৩ নম্বরে কল করুন।', 'কৃষি সেবা', 'সকাল ৮টা - রাত ৮টা')" class="px-3.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                                    বিস্তারিত দেখুন <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Card 4: 109 Women & Child -->
                        <div class="service-card bg-white rounded-xl border border-gray-200 p-4 relative hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between" data-category="emergency" data-title="নারী ও শিশু সহায়তা" data-number="109" data-tags="নারী ও শিশু সহায়তা জাতীয় হটলাইন women child">
                            <!-- Category Badge -->
                            <div class="absolute top-3 left-3">
                                <span class="bg-purple-100 text-purple-700 text-[11px] font-semibold px-2 py-0.5 rounded border border-purple-200">
                                    নারী ও শিশু সেবা
                                </span>
                            </div>

                            <div>
                                <!-- Top info row -->
                                <div class="flex items-start justify-between pt-6 mb-3">
                                    <div class="flex items-center gap-3">
                                        <!-- Purple Circle Badge with Icon -->
                                        <div class="w-14 h-14 rounded-full bg-purple-700 text-white flex flex-col items-center justify-center shrink-0 shadow-sm relative">
                                            <i data-lucide="user-check" class="w-5 h-5 mb-0.5"></i>
                                            <span class="text-xs font-extrabold leading-none">109</span>
                                        </div>
                                        <div>
                                            <h3 class="text-base font-bold text-gray-800 leading-snug">নারী ও শিশু সহায়তা</h3>
                                            <p class="text-xs text-gray-500 font-medium">জাতীয় হটলাইন</p>
                                            <p class="text-2xl font-black text-purple-700 tracking-tight mt-0.5">109</p>
                                        </div>
                                    </div>
                                    <button onclick="copyToClipboard('109')" class="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-emerald-600 hover:text-emerald-700 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-all bg-white shadow-2xs">
                                        <i data-lucide="copy" class="w-3.5 h-3.5 text-gray-500"></i> কপি
                                    </button>
                                </div>

                                <!-- Time & Tag meta -->
                                <div class="flex items-center gap-4 text-xs text-gray-500 my-2 pt-1 border-t border-gray-100">
                                    <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-gray-400"></i> ২৪ ঘণ্টা</span>
                                    <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i> সহায়তা সেবা</span>
                                </div>

                                <!-- Description -->
                                <div class="mt-2">
                                    <h4 class="text-xs font-bold text-gray-700">বিবরণ</h4>
                                    <p class="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                                        নারী ও শিশু নির্যাতন, সহিংসতা বা যেকোনো সহায়তার জন্য এই নম্বরে যোগাযোগ করুন।
                                    </p>
                                </div>
                            </div>

                            <!-- Footer action button -->
                            <div class="mt-4 pt-2 text-right">
                                <button onclick="showDetailsModal('নারী ও শিশু সহায়তা', '109', 'নারী ও শিশু নির্যাতন প্রতিরোধে এই হটলাইন সেবা টোল ফ্রি হিসেবে ২৪ ঘণ্টা খোলা থাকে। যেকোনো জরুরি পরিস্থিতিতে ১০৯ এ কল দিয়ে আইনি ও কাউন্সিলিং সহায়তার সুযোগ রয়েছে।', 'সহায়তা সেবা', '২৪ ঘণ্টা')" class="px-3.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                                    বিস্তারিত দেখুন <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>

                    </div> <!-- End Grid -->

                    <!-- Public Footer -->
                    <footer class="mt-auto pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
                        <div>
                            © ২০২৪ সেবা সহায়ক, সকল অধিকার সংরক্ষিত।
                        </div>
                        <div class="flex items-center gap-4">
                            <a href="#" class="hover:text-emerald-600 transition-colors">গোপনীয়তা নীতি</a>
                            <a href="#" class="hover:text-emerald-600 transition-colors">ব্যবহারের শর্তাবলী</a>
                            <a href="#" class="hover:text-emerald-600 transition-colors">যোগাযোগ</a>
                        </div>
                    </footer>

                </div>
            </div>

            <!-- RIGHT CONTAINER: ADMIN DASHBOARD PANEL -->
            <div id="admin-panel-container" class="bg-white rounded-2xl border border-gray-200 custom-card-shadow overflow-hidden flex flex-col min-h-[850px]">
                
                <!-- Admin Header -->
                <header class="bg-white border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
                            <i data-lucide="sprout" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <h2 class="text-base font-bold text-gray-800 leading-tight">সেবা সহায়ক</h2>
                            <p class="text-[10px] text-emerald-700 font-medium -mt-0.5">সব সেবার এক ঠিকানা</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <button class="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 relative transition-colors">
                            <i data-lucide="bell" class="w-4 h-4"></i>
                            <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
                        </button>
                        <div class="flex items-center gap-2 pl-2 border-l border-gray-200">
                            <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs overflow-hidden border border-gray-300">
                                <i data-lucide="user" class="w-5 h-5 text-gray-600"></i>
                            </div>
                            <div class="text-left hidden sm:block">
                                <p class="text-xs font-bold text-gray-800 leading-tight">অ্যাডমিন</p>
                                <p class="text-[10px] text-gray-500">সুপার অ্যাডমিন</p>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Admin Layout Container (Sidebar + Content) -->
                <div class="flex flex-1 overflow-hidden">
                    
                    <!-- Sidebar Menu -->
                    <aside class="w-48 border-r border-gray-200 bg-gray-50/50 p-3 flex flex-col justify-between shrink-0 hidden sm:flex">
                        <nav class="space-y-1">
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                <i data-lucide="layout-dashboard" class="w-4 h-4 text-gray-500"></i> ড্যাশবোর্ড
                            </a>
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                <i data-lucide="layers" class="w-4 h-4 text-gray-500"></i> সকল সেবা
                            </a>
                            <!-- Active Item -->
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg shadow-sm transition-colors">
                                <i data-lucide="plus-circle" class="w-4 h-4 text-white"></i> নতুন সেবা যোগ করুন
                            </a>
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                <i data-lucide="grid" class="w-4 h-4 text-gray-500"></i> ক্যাটাগরি
                            </a>
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                <i data-lucide="users" class="w-4 h-4 text-gray-500"></i> ব্যবহারকারী
                            </a>
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                <i data-lucide="bar-chart-3" class="w-4 h-4 text-gray-500"></i> রিপোর্ট
                            </a>
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                <i data-lucide="settings" class="w-4 h-4 text-gray-500"></i> সেটিংস
                            </a>
                        </nav>

                        <div class="pt-4 border-t border-gray-200">
                            <a href="#" class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i> লগআউট
                            </a>
                        </div>
                    </aside>

                    <!-- Main Admin Content Area -->
                    <div class="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col justify-between bg-white">
                        
                        <div>
                            <!-- Page Title Banner -->
                            <div class="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                                <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-lg">
                                    +
                                </div>
                                <div>
                                    <h2 class="text-lg font-bold text-gray-800 leading-tight">নতুন সেবা যোগ করুন</h2>
                                    <p class="text-xs text-gray-500">সেবা সম্পর্কিত তথ্য দিন</p>
                                </div>
                            </div>

                            <!-- Add New Service Form -->
                            <form id="add-service-form" onsubmit="handleFormSubmit(event)" class="space-y-4">
                                
                                <!-- Row 1: Name & Number -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1">
                                            সেবার নাম <span class="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id="form-service-name"
                                            value="জাতীয় জরুরি সেবা" 
                                            required
                                            class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-800"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1">
                                            সার্ভিস নম্বর <span class="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id="form-service-number"
                                            value="999" 
                                            required
                                            class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-800"
                                        >
                                    </div>
                                </div>

                                <!-- Row 2: Type & Availability -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1">
                                            সেবার ধরন <span class="text-red-500">*</span>
                                        </label>
                                        <select id="form-service-type" class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-800 bg-white">
                                            <option value="জরুরি সেবা" selected>জরুরি সেবা</option>
                                            <option value="সরকারি সেবা">সরকারি সেবা</option>
                                            <option value="স্বাস্থ্য সেবা">স্বাস্থ্য সেবা</option>
                                            <option value="কৃষি সেবা">কৃষি সেবা</option>
                                            <option value="সহায়তা সেবা">সহায়তা সেবা</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1">
                                            সেবা পাওয়ার সময় <span class="text-red-500">*</span>
                                        </label>
                                        <select id="form-service-time" class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-800 bg-white">
                                            <option value="২৪ ঘণ্টা" selected>২৪ ঘণ্টা</option>
                                            <option value="সকাল ৮টা - রাত ৮টা">সকাল ৮টা - রাত ৮টা</option>
                                            <option value="সকাল ৯টা - বিকেল ৫টা">সকাল ৯টা - বিকেল ৫টা</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Row 3: Category & Logo/Icon -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1">
                                            ক্যাটাগরি <span class="text-red-500">*</span>
                                        </label>
                                        <select id="form-service-category" class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-800 bg-white">
                                            <option value="government" selected>সরকারি সেবা</option>
                                            <option value="emergency">জরুরি সেবা</option>
                                            <option value="health">স্বাস্থ্য সেবা</option>
                                            <option value="agriculture">কৃষি সেবা</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-700 mb-1">
                                            লোগো / আইকন
                                        </label>
                                        <div class="flex items-center gap-3 mt-1">
                                            <!-- Icon Badge Preview -->
                                            <div class="w-12 h-12 rounded-full bg-red-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                                                <i data-lucide="siren" class="w-4 h-4 mb-0.5"></i>
                                                <span class="text-[10px] font-extrabold leading-none">999</span>
                                            </div>
                                            <div>
                                                <label class="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 transition-colors shadow-2xs">
                                                    <i data-lucide="upload" class="w-3.5 h-3.5 text-gray-500"></i> ছবি আপলোড
                                                    <input type="file" class="hidden" accept="image/*">
                                                </label>
                                                <p class="text-[10px] text-gray-400 mt-1">JPG, PNG (সর্বোচ্চ 2MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Row 4: Detailed Description -->
                                <div>
                                    <label class="block text-xs font-semibold text-gray-700 mb-1">
                                        বিস্তারিত বিবরণ <span class="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        id="form-service-desc"
                                        rows="3" 
                                        required
                                        class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-800 leading-relaxed"
                                    >জরুরি প্রয়োজনে পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সহায়তার জন্য এই নম্বরে যোগাযোগ করা যায়। এটি একটি জাতীয় জরুরি সেবা নম্বর। দেশের যেকোনো স্থান থেকে ২৪ ঘণ্টা এই সেবা পাওয়া যায়।</textarea>
                                </div>

                                <!-- Row 5: Notice Alert Box -->
                                <div class="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                                    <i data-lucide="lightbulb" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
                                    <div class="text-xs text-emerald-900 space-y-1">
                                        <p class="font-bold text-emerald-800">সতর্কতা:</p>
                                        <ul class="list-disc list-inside text-emerald-700 space-y-0.5 text-[11px]">
                                            <li>সঠিক তথ্য দিন যাতে মানুষ উপকৃত হয়।</li>
                                            <li>ভুল তথ্য প্রদান করলে আপনার অ্যাকাউন্ট সীমিত করা হতে পারে।</li>
                                        </ul>
                                    </div>
                                </div>

                                <!-- Row 6: Submit Buttons -->
                                <div class="flex items-center justify-between pt-3">
                                    <button 
                                        type="button" 
                                        onclick="resetAdminForm()" 
                                        class="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-all shadow-2xs"
                                    >
                                        বাতিল করুন
                                    </button>

                                    <button 
                                        type="submit" 
                                        class="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                                    >
                                        <i data-lucide="check" class="w-4 h-4"></i> সেবা যোগ করুন
                                    </button>
                                </div>

                            </form>
                        </div>

                        <!-- Admin Footer -->
                        <footer class="mt-6 pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
                            <div>
                                © ২০২৪ সেবা সহায়ক, সকল অধিকার সংরক্ষিত।
                            </div>
                            <div class="flex items-center gap-4">
                                <a href="#" class="hover:text-emerald-600 transition-colors">গোপনীয়তা নীতি</a>
                                <a href="#" class="hover:text-emerald-600 transition-colors">ব্যবহারের শর্তাবলী</a>
                                <a href="#" class="hover:text-emerald-600 transition-colors">যোগাযোগ</a>
                            </div>
                        </footer>

                    </div>
                </div>

            </div> <!-- End Right View -->

        </div>
    </main>

    <!-- Floating Toast Notification (Exact match to bottom toast) -->
    <div id="copy-toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-4 py-2.5 rounded-xl border border-gray-200 shadow-xl flex items-center gap-3 text-xs font-semibold z-50 hidden toast-animate">
        <div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
        </div>
        <span id="toast-message">নম্বর কপি হয়েছে!</span>
        <button onclick="hideToast()" class="text-gray-400 hover:text-gray-600 ml-2">
            <i data-lucide="x" class="w-4 h-4"></i>
        </button>
    </div>

    <!-- Service Details Modal -->
    <div id="details-modal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 hidden">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button onclick="closeDetailsModal()" class="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
                    <i data-lucide="phone-call" class="w-6 h-6"></i>
                </div>
                <div>
                    <h3 id="modal-title" class="text-lg font-bold text-gray-800">জাতীয় জরুরি সেবা</h3>
                    <p id="modal-number" class="text-base font-extrabold text-emerald-600">999</p>
                </div>
            </div>

            <div class="space-y-3 text-xs text-gray-600">
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-gray-700">ধরন:</span>
                    <span id="modal-type" class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">জরুরি সেবা</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-gray-700">সময়সূচী:</span>
                    <span id="modal-time" class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">২৪ ঘণ্টা</span>
                </div>
                <div class="pt-2">
                    <span class="font-semibold text-gray-700 block mb-1">বিস্তারিত তথ্য:</span>
                    <p id="modal-desc" class="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
                        জরুরি প্রয়োজনে পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সহায়তার জন্য এই নম্বরে যোগাযোগ করুন।
                    </p>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-2">
                <button onclick="closeDetailsModal()" class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors">
                    বন্ধ করুন
                </button>
                <button id="modal-copy-btn" onclick="" class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm">
                    <i data-lucide="copy" class="w-3.5 h-3.5"></i> নম্বর কপি করুন
                </button>
            </div>
        </div>
    </div>

    <!-- Application Logic & Scripts -->
    <script>
        // Initialize Icons on load
        document.addEventListener("DOMContentLoaded", () => {
            lucide.createIcons();
        });

        // View Switching Logic (Split, Public only, Admin only)
        function switchView(mode) {
            const container = document.getElementById('views-wrapper');
            const publicBox = document.getElementById('public-portal-container');
            const adminBox = document.getElementById('admin-panel-container');
            
            const btnSplit = document.getElementById('btn-view-split');
            const btnPublic = document.getElementById('btn-view-public');
            const btnAdmin = document.getElementById('btn-view-admin');

            // Reset button styles
            [btnSplit, btnPublic, btnAdmin].forEach(btn => {
                btn.className = "px-3 py-1 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all";
            });

            if (mode === 'split') {
                container.className = "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start";
                publicBox.classList.remove('hidden');
                adminBox.classList.remove('hidden');
                btnSplit.className = "px-3 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm";
            } else if (mode === 'public') {
                container.className = "grid grid-cols-1 gap-6 max-w-4xl mx-auto";
                publicBox.classList.remove('hidden');
                adminBox.classList.add('hidden');
                btnPublic.className = "px-3 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm";
            } else if (mode === 'admin') {
                container.className = "grid grid-cols-1 gap-6 max-w-4xl mx-auto";
                publicBox.classList.add('hidden');
                adminBox.classList.remove('hidden');
                btnAdmin.className = "px-3 py-1 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm";
            }
        }

        // Copy to clipboard with Toast Notification
        let toastTimeout;
        function copyToClipboard(text) {
            // Clipboard fallback
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            // Show toast
            const toast = document.getElementById('copy-toast');
            const msg = document.getElementById('toast-message');
            msg.textContent = `নম্বর ${text} কপি হয়েছে!`;
            
            toast.classList.remove('hidden');

            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                hideToast();
            }, 3000);
        }

        function hideToast() {
            const toast = document.getElementById('copy-toast');
            toast.classList.add('hidden');
        }

        // Category Filtering
        let activeCategory = 'all';
        function setCategoryFilter(category, btnElement) {
            activeCategory = category;
            
            // Update Chip Styles
            document.querySelectorAll('.category-chip').forEach(chip => {
                chip.className = "category-chip px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all";
            });

            btnElement.className = "category-chip px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm transition-all";

            filterServices();
        }

        // Search and Filter Cards
        function filterServices() {
            const query = document.getElementById('public-search-input').value.toLowerCase().trim();
            const cards = document.querySelectorAll('.service-card');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                const title = card.getAttribute('data-title').toLowerCase();
                const number = card.getAttribute('data-number').toLowerCase();
                const tags = card.getAttribute('data-tags').toLowerCase();

                const matchesCategory = (activeCategory === 'all' || category === activeCategory);
                const matchesSearch = query === '' || title.includes(query) || number.includes(query) || tags.includes(query);

                if (matchesCategory && matchesSearch) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        // Details Modal Logic
        function showDetailsModal(title, number, desc, type, time) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-number').textContent = number;
            document.getElementById('modal-desc').textContent = desc;
            document.getElementById('modal-type').textContent = type;
            document.getElementById('modal-time').textContent = time;

            document.getElementById('modal-copy-btn').onclick = () => copyToClipboard(number);

            document.getElementById('details-modal').classList.remove('hidden');
        }

        function closeDetailsModal() {
            document.getElementById('details-modal').classList.add('hidden');
        }

        function openAdminFormFromPublic() {
            switchView('split');
            const form = document.getElementById('add-service-form');
            form.scrollIntoView({ behavior: 'smooth' });
        }

        // Add New Service Form Handler
        function handleFormSubmit(e) {
            e.preventDefault();

            const name = document.getElementById('form-service-name').value.trim();
            const number = document.getElementById('form-service-number').value.trim();
            const type = document.getElementById('form-service-type').value;
            const time = document.getElementById('form-service-time').value;
            const category = document.getElementById('form-service-category').value;
            const desc = document.getElementById('form-service-desc').value.trim();

            if (!name || !number || !desc) {
                alert('অনুগ্রহ করে সকল প্রয়োজনীয় ঘর পূরণ করুন।');
                return;
            }

            // Create new Service Card dynamically
            const grid = document.getElementById('services-grid');
            const newCard = document.createElement('div');
            newCard.className = "service-card bg-white rounded-xl border border-gray-200 p-4 relative hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between";
            newCard.setAttribute('data-category', category);
            newCard.setAttribute('data-title', name);
            newCard.setAttribute('data-number', number);
            newCard.setAttribute('data-tags', `${name} ${number} ${type}`);

            newCard.innerHTML = `
                <div class="absolute top-3 left-3">
                    <span class="bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded border border-emerald-200">
                        ${type}
                    </span>
                </div>
                <div>
                    <div class="flex items-start justify-between pt-6 mb-3">
                        <div class="flex items-center gap-3">
                            <div class="w-14 h-14 rounded-full bg-emerald-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm relative">
                                <i data-lucide="phone" class="w-5 h-5 mb-0.5"></i>
                                <span class="text-xs font-extrabold leading-none">${number}</span>
                            </div>
                            <div>
                                <h3 class="text-base font-bold text-gray-800 leading-snug">${name}</h3>
                                <p class="text-xs text-gray-500 font-medium">${type}</p>
                                <p class="text-2xl font-black text-emerald-600 tracking-tight mt-0.5">${number}</p>
                            </div>
                        </div>
                        <button onclick="copyToClipboard('${number}')" class="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-emerald-600 hover:text-emerald-700 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-all bg-white shadow-2xs">
                            <i data-lucide="copy" class="w-3.5 h-3.5 text-gray-500"></i> কপি
                        </button>
                    </div>
                    <div class="flex items-center gap-4 text-xs text-gray-500 my-2 pt-1 border-t border-gray-100">
                        <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-gray-400"></i> ${time}</span>
                        <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i> ${type}</span>
                    </div>
                    <div class="mt-2">
                        <h4 class="text-xs font-bold text-gray-700">বিবরণ</h4>
                        <p class="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">${desc}</p>
                    </div>
                </div>
                <div class="mt-4 pt-2 text-right">
                    <button onclick="showDetailsModal('${name}', '${number}', '${desc}', '${type}', '${time}')" class="px-3.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                        বিস্তারিত দেখুন <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            `;

            grid.prepend(newCard);
            lucide.createIcons();

            // Trigger notification
            copyToClipboard(number);
            const msg = document.getElementById('toast-message');
            msg.textContent = `নতুন সেবা '${name}' সফলভাবে যোগ হয়েছে!`;

            // Reset form input
            resetAdminForm();
        }

        function resetAdminForm() {
            document.getElementById('add-service-form').reset();
        }
    </script>
</body>
</html>
