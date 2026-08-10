<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>বাসা খুঁজ - Basha Khuj App Workflow</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts: Hind Siliguri & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#00A651',
                        'primary-dark': '#008741',
                        'primary-light': '#E6F6ED',
                    },
                    fontFamily: {
                        sans: ['Hind Siliguri', 'Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>

    <style>
        body {
            font-family: 'Hind Siliguri', 'Inter', sans-serif;
            background-color: #f3f4f6;
        }
        /* Hide scrollbars for clean app previews while preserving scrollability */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .mobile-screen {
            width: 320px;
            height: 640px;
            border-radius: 20px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border: 4px solid #e5e7eb;
            position: relative;
        }
        .screen-card-badge {
            background-color: #ffffff;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800 min-h-screen flex flex-col">

    <!-- Top Global Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center space-x-3">
                <div class="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
                    <i class="fa-solid fa-house-circle-check text-xl"></i>
                </div>
                <div>
                    <h1 class="text-xl font-bold text-gray-900 leading-tight">বাসা খুঁজ <span class="text-xs font-normal bg-green-100 text-primary px-2 py-0.5 rounded-full">Pro</span></h1>
                    <p class="text-xs text-gray-500">House Renting & Owner Management UI Flow</p>
                </div>
            </div>

            <!-- View Mode Switcher -->
            <div class="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-medium">
                <button id="btn-view-all" onclick="switchView('all')" class="px-4 py-1.5 rounded-lg bg-white shadow-sm text-primary font-semibold transition-all">
                    <i class="fa-solid fa-grid-2 mr-1.5"></i> ১০টি স্ক্রিন ভিউ (Grid)
                </button>
                <button id="btn-view-demo" onclick="switchView('interactive')" class="px-4 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 transition-all">
                    <i class="fa-solid fa-mobile-screen-button mr-1.5"></i> ইন্টারেক্টিভ সিমুলেটর
                </button>
            </div>
        </div>
    </header>

    <!-- MAIN CONTENT CONTAINER -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">

        <!-- ================= VIEW 1: GRID OVERVIEW OF ALL 10 SCREENS ================= -->
        <div id="view-all-screens" class="space-y-8">
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 class="text-base font-bold text-gray-800">অ্যাপলিকেশন ফ্লো ওভারভিউ (১০টি স্ক্রিন)</h2>
                    <p class="text-xs text-gray-500">আপনার দেওয়া ডিজাইনের হুবহু ১০টি স্ক্রিন নিচে সাজানো হলো। যে কোনো একটি স্ক্রিনের ওপর ক্লিক করে সরাসরি ইন্টারেক্টিভ টেস্ট করুন।</p>
                </div>
                <div class="text-xs text-gray-500 flex items-center gap-4">
                    <span><i class="fa-solid fa-circle text-primary text-[10px]"></i> প্রাইমারি কালার: #00A651</span>
                    <span><i class="fa-solid fa-circle text-amber-500 text-[10px]"></i> পেন্ডিং স্ট্যাটাস</span>
                </div>
            </div>

            <!-- Grid Container for 10 screens -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
                
                <!-- 1. Search Page -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(1)">
                        <!-- Content rendered via HTML component template -->
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-1"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">1. Search Page</span>
                </div>

                <!-- 2. Search Result -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(2)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-2"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">2. Search Result</span>
                </div>

                <!-- 3. Property Details -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(3)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-3"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">3. Property Details</span>
                </div>

                <!-- 4. Login / Register -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(4)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-4"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">4. Login / Register</span>
                </div>

                <!-- 5. Booking Form -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(5)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-5"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">5. Booking Form</span>
                </div>

                <!-- 6. Booking Submitted -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(6)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-6"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">6. Booking Submitted</span>
                </div>

                <!-- 7. Owner Dashboard -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(7)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-7"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">7. Owner Dashboard</span>
                </div>

                <!-- 8. Payment -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(8)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-8"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">8. Payment (Owner Pays ৳50)</span>
                </div>

                <!-- 9. Payment Success -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(9)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-9"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">9. Payment Success</span>
                </div>

                <!-- 10. Information Unlocked -->
                <div class="flex flex-col items-center">
                    <div class="mobile-screen transform transition-all hover:scale-105 cursor-pointer" onclick="openInteractiveAt(10)">
                        <div class="screen-content h-full flex flex-col bg-white overflow-y-auto no-scrollbar" id="static-screen-10"></div>
                    </div>
                    <span class="mt-2 text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">10. Information Unlocked</span>
                </div>

            </div>
        </div>

        <!-- ================= VIEW 2: INTERACTIVE SIMULATOR ================= -->
        <div id="view-interactive" class="hidden flex flex-col items-center justify-center py-4">
            
            <!-- Quick Screen Selector Navigation Toolbar -->
            <div class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm mb-6 max-w-2xl w-full flex flex-wrap items-center justify-center gap-1.5 text-xs">
                <span class="text-gray-400 font-semibold px-2">Jump to:</span>
                <button onclick="goToScreen(1)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="1">1. Search</button>
                <button onclick="goToScreen(2)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="2">2. Results</button>
                <button onclick="goToScreen(3)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="3">3. Details</button>
                <button onclick="goToScreen(4)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="4">4. Login</button>
                <button onclick="goToScreen(5)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="5">5. Booking</button>
                <button onclick="goToScreen(6)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="6">6. Submitted</button>
                <button onclick="goToScreen(7)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="7">7. Dashboard</button>
                <button onclick="goToScreen(8)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="8">8. Payment</button>
                <button onclick="goToScreen(9)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="9">9. Paid</button>
                <button onclick="goToScreen(10)" class="nav-step-btn px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all font-medium" data-screen="10">10. Unlocked</button>
            </div>

            <!-- Single Mobile Frame Simulator -->
            <div class="mobile-screen w-[360px] h-[720px] shadow-2xl border-8 border-gray-800 rounded-[36px] overflow-hidden bg-white relative">
                <!-- Phone Top Bar Notch / Dynamic Island -->
                <div class="bg-gray-800 text-white px-6 py-1 text-[10px] flex justify-between items-center z-30">
                    <span>9:41</span>
                    <div class="w-16 h-3 bg-black rounded-full mx-auto"></div>
                    <div class="flex items-center space-x-1">
                        <i class="fa-solid fa-signal text-[9px]"></i>
                        <i class="fa-solid fa-wifi text-[9px]"></i>
                        <i class="fa-solid fa-battery-full text-[9px]"></i>
                    </div>
                </div>

                <!-- Screen Mount Point -->
                <div id="interactive-screen-container" class="h-full flex flex-col overflow-y-auto no-scrollbar pb-6">
                    <!-- Dynamic screen content will be inserted here -->
                </div>
            </div>

            <!-- Hint text -->
            <p class="text-xs text-gray-500 mt-4 text-center">
                <i class="fa-regular fa-lightbulb text-amber-500 mr-1"></i> স্ক্রিনের বাটনে সরাসরি ক্লিক করে লাইভ ইউজার ফ্লো টেস্ট করতে পারেন।
            </p>
        </div>

    </main>

    <script>
        // Data & Image Assets (High quality architectural placeholder photos)
        const IMAGES = {
            villa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
            house2: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
            house3: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
            flat: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
        };

        // Screen Components Generator
        function getCommonHeader(titleOverride) {
            return `
                <div class="p-2.5 bg-white border-b border-gray-100 flex items-center justify-between text-xs sticky top-0 z-20">
                    <div class="flex items-center space-x-1 font-bold text-primary">
                        <i class="fa-solid fa-house text-sm"></i>
                        <span class="text-xs">বাসা খুঁজ</span>
                    </div>
                    <div class="flex items-center space-x-2 text-[10px]">
                        <span class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                            <i class="fa-regular fa-calendar text-[9px] mr-0.5"></i> 08 Aug, 2026
                        </span>
                        <span class="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded border border-gray-200">বাংলা</span>
                        <button onclick="goToScreen(4)" class="bg-primary text-white px-2 py-0.5 rounded font-semibold hover:bg-primary-dark">Login</button>
                    </div>
                </div>
            `;
        }

        // ================= SCREEN TEMPLATES =================

        // Screen 1: Search Page
        function renderScreen1() {
            return `
                ${getCommonHeader()}
                <div class="p-3 space-y-3 bg-gray-50 flex-1">
                    <h2 class="text-sm font-bold text-center text-gray-800">আপনার পছন্দের বাসা খুঁজুন</h2>
                    
                    <!-- Search input -->
                    <div class="flex gap-1">
                        <div class="relative flex-1">
                            <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-2 text-gray-400 text-xs"></i>
                            <input type="text" placeholder="বাড়ি / এলাকা / নাম / Keyword লিখুন" class="w-full text-[11px] pl-7 pr-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                        </div>
                        <button onclick="goToScreen(2)" class="bg-primary text-white px-3 py-1.5 rounded-lg text-xs hover:bg-primary-dark">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <!-- Filter Dropdowns Grid -->
                    <div class="grid grid-cols-3 gap-1.5 text-[10px]">
                        <select class="p-1 border border-gray-300 rounded bg-white text-gray-600"><option>বিভাগ</option></select>
                        <select class="p-1 border border-gray-300 rounded bg-white text-gray-600"><option>জেলা</option></select>
                        <select class="p-1 border border-gray-300 rounded bg-white text-gray-600"><option>উপজেলা</option></select>
                        <select class="p-1 border border-gray-300 rounded bg-white text-gray-600"><option>ইউনিয়ন</option></select>
                        <select class="p-1 border border-gray-300 rounded bg-white text-gray-600"><option>ওয়ার্ড</option></select>
                        <select class="p-1 border border-gray-300 rounded bg-white text-gray-600"><option>ভিলেজ</option></select>
                    </div>

                    <!-- Recent Results Section -->
                    <div class="pt-1">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs font-bold text-gray-800">সাম্প্রতিক ফলাফল</span>
                            <span class="text-[10px] text-gray-400">01</span>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-2">
                            <!-- Card 1 -->
                            <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                                <img src="${IMAGES.villa}" class="w-full h-16 object-cover rounded mb-1" alt="Green Villa">
                                <h3 class="text-[11px] font-bold text-gray-800 leading-tight">Green Villa</h3>
                                <p class="text-[9px] text-gray-500">মালিক: Md. Karim</p>
                                <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> মিরপুর, ঢাকা</p>
                                <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 10,000 - ৳15,000</p>
                                <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                            </div>
                            
                            <!-- Card 2 -->
                            <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                                <img src="${IMAGES.house2}" class="w-full h-16 object-cover rounded mb-1" alt="Sunshine Home">
                                <h3 class="text-[11px] font-bold text-gray-800 leading-tight">Sunshine Home</h3>
                                <p class="text-[9px] text-gray-500">মালিক: Rashed Ali</p>
                                <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> উত্তরা, ঢাকা</p>
                                <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 12,000 - ৳18,000</p>
                                <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                            </div>

                            <!-- Card 3 -->
                            <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                                <img src="${IMAGES.house3}" class="w-full h-16 object-cover rounded mb-1" alt="Family House">
                                <h3 class="text-[11px] font-bold text-gray-800 leading-tight">Family House</h3>
                                <p class="text-[9px] text-gray-500">মালিক: Jamal Uddin</p>
                                <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> বনশ্রী, ঢাকা</p>
                                <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 8,000 - ৳12,000</p>
                                <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                            </div>

                            <!-- Card 4 -->
                            <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                                <img src="${IMAGES.flat}" class="w-full h-16 object-cover rounded mb-1" alt="River View House">
                                <h3 class="text-[11px] font-bold text-gray-800 leading-tight">River View House</h3>
                                <p class="text-[9px] text-gray-500">মালিক: Mahbub</p>
                                <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> গাজীপুর, ঢাকা</p>
                                <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 9,000 - ৳14,000</p>
                                <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Screen 2: Search Result
        function renderScreen2() {
            return `
                ${getCommonHeader()}
                <div class="p-3 space-y-3 bg-gray-50 flex-1">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-1.5">
                            <button onclick="goToScreen(1)" class="text-gray-600 text-xs"><i class="fa-solid fa-arrow-left"></i></button>
                            <div>
                                <h2 class="text-xs font-bold text-gray-800">সার্চ ফলাফল</h2>
                                <p class="text-[9px] text-gray-500">মোট ফলাফল: 24 টি</p>
                            </div>
                        </div>
                        <button class="bg-white border border-gray-300 text-gray-700 text-[10px] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                            <i class="fa-solid fa-sliders text-primary"></i> ফিল্টার
                        </button>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <!-- Card 1 -->
                        <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                            <img src="${IMAGES.villa}" class="w-full h-16 object-cover rounded mb-1" alt="Green Villa">
                            <h3 class="text-[11px] font-bold text-gray-800 leading-tight">Green Villa</h3>
                            <p class="text-[9px] text-gray-500">মালিক: Md. Karim</p>
                            <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> মিরপুর, ঢাকা</p>
                            <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 10,000 - ৳15,000</p>
                            <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                        </div>
                        
                        <!-- Card 2 -->
                        <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                            <img src="${IMAGES.house2}" class="w-full h-16 object-cover rounded mb-1" alt="Sunshine Home">
                            <h3 class="text-[11px] font-bold text-gray-800 leading-tight">Sunshine Home</h3>
                            <p class="text-[9px] text-gray-500">মালিক: Rashed Ali</p>
                            <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> উত্তরা, ঢাকা</p>
                            <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 12,000 - ৳18,000</p>
                            <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                        </div>

                        <!-- Card 3 -->
                        <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                            <img src="${IMAGES.house3}" class="w-full h-16 object-cover rounded mb-1" alt="Family House">
                            <h3 class="text-[11px] font-bold text-gray-800 leading-tight">Family House</h3>
                            <p class="text-[9px] text-gray-500">মালিক: Jamal Uddin</p>
                            <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> বনশ্রী, ঢাকা</p>
                            <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 8,000 - ৳12,000</p>
                            <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                        </div>

                        <!-- Card 4 -->
                        <div onclick="goToScreen(3)" class="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:border-primary">
                            <img src="${IMAGES.flat}" class="w-full h-16 object-cover rounded mb-1" alt="Modern Flat">
                            <h3 class="text-[11px] font-bold text-gray-800 leading-tight">Modern Flat</h3>
                            <p class="text-[9px] text-gray-500">মালিক: Sohel Rana</p>
                            <p class="text-[9px] text-gray-500"><i class="fa-solid fa-location-dot text-primary text-[8px]"></i> ধানমন্ডি, ঢাকা</p>
                            <p class="text-[10px] font-bold text-gray-900 mt-0.5">৳ 11,000 - ৳16,000</p>
                            <button class="w-full mt-1 bg-primary text-white text-[9px] py-0.5 rounded font-medium">বিস্তারিত</button>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div class="flex items-center justify-center space-x-1 pt-2 text-[10px]">
                        <button class="w-5 h-5 rounded bg-primary text-white font-bold">1</button>
                        <button class="w-5 h-5 rounded bg-white text-gray-700 border border-gray-200">2</button>
                        <button class="w-5 h-5 rounded bg-white text-gray-700 border border-gray-200">3</button>
                        <span class="text-gray-400 px-0.5">...</span>
                        <button class="w-5 h-5 rounded bg-white text-gray-700 border border-gray-200">6</button>
                    </div>
                </div>
            `;
        }

        // Screen 3: Property Details
        function renderScreen3() {
            return `
                <div class="p-2 bg-white flex items-center justify-between border-b border-gray-100">
                    <button onclick="goToScreen(2)" class="text-gray-700 text-xs"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="text-xs font-bold text-gray-800">Property Details</span>
                    <div class="flex items-center space-x-2 text-gray-600 text-xs">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-solid fa-share-nodes"></i>
                    </div>
                </div>

                <div class="bg-gray-50 flex-1 flex flex-col justify-between">
                    <div class="p-3 space-y-2.5 overflow-y-auto">
                        <!-- Image Gallery Preview -->
                        <div class="relative rounded-lg overflow-hidden">
                            <img src="${IMAGES.villa}" class="w-full h-32 object-cover" alt="Green Villa">
                            <span class="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">1/4</span>
                            <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                                <span class="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                                <span class="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                            </div>
                        </div>

                        <!-- Title & Badge -->
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-sm font-bold text-gray-900">Green Villa</h2>
                                <p class="text-[10px] text-gray-600 mt-0.5"><i class="fa-solid fa-user text-gray-400 text-[9px]"></i> মালিক: Md. Karim</p>
                                <p class="text-[10px] text-gray-600"><i class="fa-solid fa-location-dot text-primary text-[9px]"></i> ঠিকানা: মিরপুর, ঢাকা</p>
                                <p class="text-[10px] text-gray-600"><i class="fa-solid fa-house text-gray-400 text-[9px]"></i> ধরন: Family House</p>
                                <p class="text-[10px] font-bold text-gray-900 mt-0.5"><i class="fa-solid fa-money-bill-wave text-primary text-[9px]"></i> ভাড়া: ৳10,000 - ৳15,000</p>
                            </div>
                            <span class="bg-green-100 text-primary border border-green-300 text-[9px] font-bold px-2 py-0.5 rounded-full">Available</span>
                        </div>

                        <!-- Features icons -->
                        <div class="border-t border-b border-gray-200 py-2 my-1">
                            <h4 class="text-[10px] font-bold text-gray-800 mb-1.5">বিস্তারিত তথ্য</h4>
                            <div class="grid grid-cols-4 gap-1 text-center text-[9px] text-gray-700">
                                <div class="bg-white p-1 rounded border border-gray-100"><i class="fa-solid fa-bed text-primary block text-xs mb-0.5"></i> 2 Bed</div>
                                <div class="bg-white p-1 rounded border border-gray-100"><i class="fa-solid fa-bath text-primary block text-xs mb-0.5"></i> 2 Bath</div>
                                <div class="bg-white p-1 rounded border border-gray-100"><i class="fa-solid fa-utensils text-primary block text-xs mb-0.5"></i> 1 Kitchen</div>
                                <div class="bg-white p-1 rounded border border-gray-100"><i class="fa-solid fa-border-all text-primary block text-xs mb-0.5"></i> 1 Balcony</div>
                            </div>
                        </div>

                        <!-- Additional Specs -->
                        <div class="text-[10px] space-y-0.5 text-gray-600">
                            <p><span class="font-semibold text-gray-800">এরিয়া:</span> 1200 sft</p>
                            <p><span class="font-semibold text-gray-800">তলা:</span> 2nd Floor</p>
                            <p><span class="font-semibold text-gray-800">পার্কিং:</span> Available</p>
                            <p><span class="font-semibold text-gray-800">অন্যান্য:</span> Electricity, Water, Gas</p>
                        </div>
                    </div>

                    <!-- Bottom Fixed Action Button -->
                    <div class="p-2.5 bg-white border-t border-gray-200">
                        <button onclick="goToScreen(4)" class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-sm">
                            <i class="fa-regular fa-calendar-check text-sm"></i> Booking করুন
                        </button>
                    </div>
                </div>
            `;
        }

        // Screen 4: Login / Register
        function renderScreen4() {
            return `
                <div class="p-2 bg-white flex items-center justify-between border-b border-gray-100">
                    <button onclick="goToScreen(3)" class="text-gray-700 text-xs"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="text-xs font-bold text-gray-800">Login</span>
                    <span></span>
                </div>

                <div class="p-4 bg-white flex-1 flex flex-col justify-center items-center text-center space-y-4">
                    <!-- Shield House Logo -->
                    <div class="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center border border-green-200 text-primary text-2xl">
                        <i class="fa-solid fa-house-lock"></i>
                    </div>

                    <div>
                        <h2 class="text-base font-bold text-gray-900">Login করুন</h2>
                        <p class="text-[10px] text-gray-500">Booking করার জন্য Login করুন</p>
                    </div>

                    <!-- Form Inputs -->
                    <div class="w-full space-y-2.5 text-left text-[11px]">
                        <div>
                            <label class="text-[10px] text-gray-600 block mb-0.5 font-medium">মোবাইল নম্বর</label>
                            <input type="text" value="01XXXXXXXXX" class="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-primary">
                        </div>
                        <div>
                            <label class="text-[10px] text-gray-600 block mb-0.5 font-medium">পাসওয়ার্ড</label>
                            <div class="relative">
                                <input type="password" placeholder="পাসওয়ার্ড লিখুন" value="••••••••" class="w-full p-2 pr-8 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-primary">
                                <i class="fa-regular fa-eye absolute right-2.5 top-2.5 text-gray-400 text-xs"></i>
                            </div>
                        </div>
                        <div class="text-right">
                            <a href="#" class="text-[10px] text-primary hover:underline font-medium">পাসওয়ার্ড ভুলে গেছেন?</a>
                        </div>
                    </div>

                    <div class="w-full space-y-2 pt-2">
                        <button onclick="goToScreen(5)" class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 rounded-lg shadow-sm">Login</button>
                        <div class="text-[10px] text-gray-500 pt-1">Account নেই?</div>
                        <button onclick="goToScreen(5)" class="w-full bg-white text-primary border border-primary text-xs font-bold py-1.5 rounded-lg hover:bg-green-50">Register করুন</button>
                    </div>
                </div>
            `;
        }

        // Screen 5: Booking Form
        function renderScreen5() {
            return `
                <div class="p-2 bg-white flex items-center justify-between border-b border-gray-100">
                    <button onclick="goToScreen(4)" class="text-gray-700 text-xs"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="text-xs font-bold text-gray-800">Booking Request</span>
                    <span></span>
                </div>

                <div class="p-3 bg-gray-50 flex-1 flex flex-col justify-between">
                    <div class="space-y-3">
                        <!-- Customer Info -->
                        <div class="bg-white p-2.5 rounded-lg border border-gray-200 space-y-2 text-[11px]">
                            <h3 class="font-bold text-gray-800 text-xs border-b pb-1">আপনার তথ্য</h3>
                            <div>
                                <label class="text-[10px] text-gray-500 block">নাম</label>
                                <input type="text" value="Md. Shariful Islam" class="w-full p-1.5 border border-gray-300 rounded text-gray-800 mt-0.5">
                            </div>
                            <div>
                                <label class="text-[10px] text-gray-500 block">মোবাইল</label>
                                <input type="text" value="01XXXXXXXXX" class="w-full p-1.5 border border-gray-300 rounded text-gray-800 mt-0.5">
                            </div>
                            <div>
                                <label class="text-[10px] text-gray-500 block">ঠিকানা</label>
                                <input type="text" value="ধানমন্ডি, ঢাকা" class="w-full p-1.5 border border-gray-300 rounded text-gray-800 mt-0.5">
                            </div>
                        </div>

                        <!-- Appointment Time -->
                        <div class="bg-white p-2.5 rounded-lg border border-gray-200 space-y-2 text-[11px]">
                            <h3 class="font-bold text-gray-800 text-xs border-b pb-1">সাক্ষাতের সময়</h3>
                            <div>
                                <label class="text-[10px] text-gray-500 block">তারিখ</label>
                                <div class="relative mt-0.5">
                                    <input type="text" value="10 August 2026" class="w-full p-1.5 pr-7 border border-gray-300 rounded text-gray-800">
                                    <i class="fa-regular fa-calendar-days absolute right-2 top-2 text-gray-400 text-xs"></i>
                                </div>
                            </div>
                            <div>
                                <label class="text-[10px] text-gray-500 block">সময়</label>
                                <div class="relative mt-0.5">
                                    <input type="text" value="04:00 PM" class="w-full p-1.5 pr-7 border border-gray-300 rounded text-gray-800">
                                    <i class="fa-regular fa-clock absolute right-2 top-2 text-gray-400 text-xs"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Optional Message -->
                        <div class="bg-white p-2.5 rounded-lg border border-gray-200 text-[11px]">
                            <label class="text-[10px] font-semibold text-gray-700 block mb-1">মেসেজ (ঐচ্ছিক)</label>
                            <textarea class="w-full p-1.5 border border-gray-300 rounded text-gray-800 h-12 text-[10px]">আমি বাসাটি দেখতে চাই।</textarea>
                        </div>
                    </div>

                    <button onclick="goToScreen(6)" class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 rounded-lg mt-3 shadow-sm">
                        Submit Booking
                    </button>
                </div>
            `;
        }

        // Screen 6: Booking Submitted
        function renderScreen6() {
            return `
                <div class="p-4 bg-white flex-1 flex flex-col justify-between text-center">
                    <div class="my-auto space-y-3">
                        <!-- Success Check Badge -->
                        <div class="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg ring-8 ring-green-100">
                            <i class="fa-solid fa-check"></i>
                        </div>

                        <h2 class="text-sm font-bold text-gray-900 leading-tight">Booking Submitted Successfully!</h2>
                        <p class="text-[10px] text-gray-500">আপনার Request সফলভাবে পাঠানো হয়েছে।</p>

                        <!-- Summary Card -->
                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[10px] text-left space-y-1.5">
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-500">Booking ID</span>
                                <span class="font-bold text-gray-800">#BK000125</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-500">Property</span>
                                <span class="font-semibold text-gray-800">Green Villa</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-500">তারিখ</span>
                                <span class="text-gray-800">10 August 2026</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-500">সময়</span>
                                <span class="text-gray-800">04:00 PM</span>
                            </div>
                            <div class="flex justify-between items-center pt-0.5">
                                <span class="text-gray-500">Status</span>
                                <span class="bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full text-[9px]">Pending</span>
                            </div>
                        </div>
                    </div>

                    <button onclick="goToScreen(7)" class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 rounded-lg shadow-sm">
                        My Bookings
                    </button>
                </div>
            `;
        }

        // Screen 7: Owner Dashboard
        function renderScreen7() {
            return `
                <div class="p-2.5 bg-white border-b border-gray-100 flex items-center justify-between text-xs sticky top-0 z-10">
                    <button class="text-gray-600"><i class="fa-solid fa-bars"></i></button>
                    <span class="font-bold text-gray-800">Owner Dashboard</span>
                    <button class="text-gray-600 relative">
                        <i class="fa-regular fa-bell"></i>
                        <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>

                <div class="p-3 bg-gray-50 flex-1 space-y-3">
                    <!-- Stats Grid -->
                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                            <span class="text-base font-bold text-gray-800 block">12</span>
                            <span class="text-[9px] text-gray-500">Total Property</span>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                            <span class="text-base font-bold text-gray-800 block">18</span>
                            <span class="text-[9px] text-gray-500">Total Booking</span>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                            <span class="text-base font-bold text-gray-800 block">6</span>
                            <span class="text-[9px] text-gray-500">Pending</span>
                        </div>
                    </div>

                    <!-- Requests Section Header -->
                    <div class="flex justify-between items-center text-xs">
                        <span class="font-bold text-gray-800">Booking Requests</span>
                        <a href="#" class="text-[10px] text-primary font-semibold">View All</a>
                    </div>

                    <!-- Request Card 1 (Pending Payment) -->
                    <div class="bg-white rounded-xl border border-gray-200 p-2.5 space-y-2 shadow-sm">
                        <div class="flex gap-2">
                            <img src="${IMAGES.villa}" class="w-12 h-12 object-cover rounded-lg" alt="Green Villa">
                            <div class="flex-1 text-[10px]">
                                <div class="flex justify-between items-start">
                                    <h4 class="font-bold text-gray-900 text-[11px]">Green Villa</h4>
                                    <span class="bg-blue-100 text-blue-600 font-bold px-1.5 py-0.2 rounded text-[8px]">New</span>
                                </div>
                                <p class="text-gray-500">Booking ID: <span class="font-semibold text-gray-700">#BK000125</span></p>
                                <p class="text-gray-500"><i class="fa-regular fa-calendar text-[9px]"></i> 10 Aug 2026 &nbsp;<i class="fa-regular fa-clock text-[9px]"></i> 04:00 PM</p>
                                <p class="text-[9px] text-gray-400">Request Received</p>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-2 rounded-lg border border-dashed border-gray-300 text-center space-y-1">
                            <div class="flex items-center justify-center space-x-1 text-[10px] font-bold text-gray-700">
                                <i class="fa-solid fa-lock text-gray-500"></i>
                                <span>Contact Information</span>
                            </div>
                            <p class="text-[9px] text-gray-500">তথ্য দেখতে পেমেন্ট করুন</p>
                            <button onclick="goToScreen(8)" class="w-full bg-white text-primary border border-primary font-bold text-[10px] py-1 rounded-md hover:bg-green-50 shadow-sm flex items-center justify-center gap-1">
                                <span>৳50 Pay & View</span>
                            </button>
                        </div>
                    </div>

                    <!-- Request Card 2 -->
                    <div class="bg-white rounded-xl border border-gray-200 p-2.5 text-[10px] shadow-sm">
                        <div class="flex gap-2">
                            <img src="${IMAGES.house2}" class="w-10 h-10 object-cover rounded-lg" alt="Sunshine Home">
                            <div class="flex-1">
                                <div class="flex justify-between items-start">
                                    <h4 class="font-bold text-gray-900">Sunshine Home</h4>
                                    <span class="bg-amber-100 text-amber-600 font-semibold px-1.5 py-0.2 rounded text-[8px]">Pending</span>
                                </div>
                                <p class="text-gray-500">Booking ID: #BK000124</p>
                                <p class="text-gray-500"><i class="fa-regular fa-calendar text-[9px]"></i> 09 Aug 2026 &nbsp;<i class="fa-regular fa-clock text-[9px]"></i> 02:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Screen 8: Payment (Owner Pays ৳50)
        function renderScreen8() {
            return `
                <div class="p-2 bg-white flex items-center justify-between border-b border-gray-100">
                    <button onclick="goToScreen(7)" class="text-gray-700 text-xs"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="text-xs font-bold text-gray-800">Payment</span>
                    <span></span>
                </div>

                <div class="p-3 bg-gray-50 flex-1 flex flex-col justify-between">
                    <div class="space-y-3">
                        <!-- Booking Summary -->
                        <div class="bg-white p-2.5 rounded-lg border border-gray-200 space-y-1.5 text-[10px]">
                            <h3 class="font-bold text-gray-800 text-[11px] border-b pb-1">Booking Information</h3>
                            <div class="flex justify-between"><span class="text-gray-500">Property</span><span class="font-bold">Green Villa</span></div>
                            <div class="flex justify-between"><span class="text-gray-500">Booking ID</span><span class="font-mono text-gray-700">#BK000125</span></div>
                            <div class="flex justify-between"><span class="text-gray-500">Requested Date</span><span>10 Aug 2026</span></div>
                            <div class="flex justify-between"><span class="text-gray-500">Requested Time</span><span>04:00 PM</span></div>
                        </div>

                        <!-- Locked Information Box -->
                        <div class="bg-white p-3 rounded-lg border border-gray-200 text-center space-y-2">
                            <div class="flex items-center justify-center space-x-1 text-xs font-bold text-gray-800">
                                <i class="fa-solid fa-lock text-red-500"></i>
                                <span>Contact Information</span>
                                <span class="bg-red-100 text-red-600 text-[8px] px-1 rounded">Locked</span>
                            </div>
                            <p class="text-[10px] text-gray-500">এই Booking-এর তথ্য দেখতে ৳৫০ পেমেন্ট করুন।</p>
                            <div class="pt-2 border-t">
                                <span class="text-[10px] text-gray-400 block">Amount</span>
                                <span class="text-xl font-extrabold text-gray-900">৳ 50</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <button onclick="goToScreen(9)" class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 rounded-lg shadow-sm flex items-center justify-center gap-1.5">
                            Pay ৳50
                        </button>
                        <p class="text-[9px] text-gray-400 text-center flex items-center justify-center gap-1">
                            <i class="fa-solid fa-shield-halved"></i> Secure Payment
                        </p>
                    </div>
                </div>
            `;
        }

        // Screen 9: Payment Success
        function renderScreen9() {
            return `
                <div class="p-4 bg-white flex-1 flex flex-col justify-between text-center">
                    <div class="my-auto space-y-3">
                        <div class="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg ring-8 ring-green-100">
                            <i class="fa-solid fa-check"></i>
                        </div>

                        <div>
                            <h2 class="text-sm font-bold text-gray-900">Payment Successful!</h2>
                            <p class="text-[10px] text-gray-500">পেমেন্ট সফল হয়েছে।</p>
                        </div>

                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[10px] text-left space-y-1.5">
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-500">Booking ID</span>
                                <span class="font-bold text-gray-800">#BK000125</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span class="text-gray-500">Amount</span>
                                <span class="font-bold text-gray-800">৳50</span>
                            </div>
                            <div class="flex justify-between items-center pt-0.5">
                                <span class="text-gray-500">Status</span>
                                <span class="bg-green-100 text-primary font-bold px-2 py-0.5 rounded-full text-[9px]">Paid</span>
                            </div>
                        </div>

                        <div class="pt-2 text-[10px] text-gray-600">
                            <p class="font-bold text-gray-800">Contact Information</p>
                            <p class="text-gray-500">এখন আপনি তথ্য দেখতে পারবেন।</p>
                        </div>
                    </div>

                    <button onclick="goToScreen(10)" class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 rounded-lg shadow-sm">
                        View Information
                    </button>
                </div>
            `;
        }

        // Screen 10: Information Unlocked
        function renderScreen10() {
            return `
                <div class="p-2 bg-white flex items-center justify-between border-b border-gray-100">
                    <button onclick="goToScreen(9)" class="text-gray-700 text-xs"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="text-xs font-bold text-gray-800">Information Unlocked</span>
                    <span></span>
                </div>

                <div class="p-3 bg-gray-50 flex-1 flex flex-col justify-between">
                    <div class="space-y-3">
                        <!-- Mini Header Card -->
                        <div class="bg-white p-2 rounded-lg border border-gray-200 flex gap-2 items-center">
                            <img src="${IMAGES.villa}" class="w-10 h-10 object-cover rounded" alt="Green Villa">
                            <div class="text-[10px]">
                                <h3 class="font-bold text-gray-900">Green Villa</h3>
                                <p class="text-gray-500">Booking ID: <span class="font-mono text-gray-700">#BK000125</span></p>
                            </div>
                        </div>

                        <!-- Unlocked User Info -->
                        <div class="bg-white p-3 rounded-lg border border-gray-200 space-y-2 text-[10px]">
                            <h3 class="font-bold text-gray-800 text-xs border-b pb-1">User Information</h3>
                            
                            <div class="flex justify-between py-1 border-b">
                                <span class="text-gray-500">নাম</span>
                                <span class="font-bold text-gray-900">Md. Shariful Islam</span>
                            </div>
                            
                            <div class="flex justify-between items-center py-1 border-b">
                                <span class="text-gray-500">মোবাইল</span>
                                <span class="font-mono font-bold text-gray-900 flex items-center gap-1">
                                    017XXXXXXXX <i class="fa-solid fa-phone text-primary text-[10px]"></i>
                                </span>
                            </div>

                            <div class="flex justify-between py-1 border-b">
                                <span class="text-gray-500">ঠিকানা</span>
                                <span class="text-gray-800">ধানমন্ডি, ঢাকা</span>
                            </div>

                            <div class="flex justify-between py-1 border-b">
                                <span class="text-gray-500">সাক্ষাতের তারিখ</span>
                                <span class="text-gray-800">10 August 2026</span>
                            </div>

                            <div class="flex justify-between py-1 border-b">
                                <span class="text-gray-500">সাক্ষাতের সময়</span>
                                <span class="text-gray-800">04:00 PM</span>
                            </div>

                            <div class="py-1">
                                <span class="text-gray-500 block mb-0.5">মেসেজ</span>
                                <p class="bg-gray-50 p-1.5 rounded text-gray-700 italic border border-gray-200">আমি বাসাটি দেখতে চাই।</p>
                            </div>
                        </div>
                    </div>

                    <!-- Call Action Button -->
                    <a href="tel:01700000000" class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-md text-center mt-3">
                        <i class="fa-solid fa-phone"></i> Call Now
                    </a>
                </div>
            `;
        }

        // Mapping Screen Numbers to Generators
        const screenRenderers = {
            1: renderScreen1,
            2: renderScreen2,
            3: renderScreen3,
            4: renderScreen4,
            5: renderScreen5,
            6: renderScreen6,
            7: renderScreen7,
            8: renderScreen8,
            9: renderScreen9,
            10: renderScreen10
        };

        // Initialize Overview Grid with all 10 screens static view
        function renderAllStaticScreens() {
            for (let i = 1; i <= 10; i++) {
                const el = document.getElementById(`static-screen-${i}`);
                if (el && screenRenderers[i]) {
                    el.innerHTML = screenRenderers[i]();
                }
            }
        }

        // Active Interactive Screen State
        let currentInteractiveScreen = 1;

        function goToScreen(screenNumber) {
            currentInteractiveScreen = screenNumber;
            
            // Render inside simulator container
            const container = document.getElementById('interactive-screen-container');
            if (container && screenRenderers[screenNumber]) {
                container.innerHTML = screenRenderers[screenNumber]();
            }

            // Update nav step buttons highlight
            document.querySelectorAll('.nav-step-btn').forEach(btn => {
                const num = parseInt(btn.getAttribute('data-screen'));
                if (num === screenNumber) {
                    btn.classList.add('bg-primary', 'text-white');
                    btn.classList.remove('bg-gray-100', 'text-gray-700');
                } else {
                    btn.classList.remove('bg-primary', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-700');
                }
            });

            // Auto scroll container to top
            if (container) container.scrollTop = 0;
        }

        function switchView(mode) {
            const gridView = document.getElementById('view-all-screens');
            const demoView = document.getElementById('view-interactive');
            const btnAll = document.getElementById('btn-view-all');
            const btnDemo = document.getElementById('btn-view-demo');

            if (mode === 'all') {
                gridView.classList.remove('hidden');
                demoView.classList.add('hidden');
                btnAll.className = "px-4 py-1.5 rounded-lg bg-white shadow-sm text-primary font-semibold transition-all";
                btnDemo.className = "px-4 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 transition-all";
            } else {
                gridView.classList.add('hidden');
                demoView.classList.remove('hidden');
                btnDemo.className = "px-4 py-1.5 rounded-lg bg-white shadow-sm text-primary font-semibold transition-all";
                btnAll.className = "px-4 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 transition-all";
                goToScreen(currentInteractiveScreen);
            }
        }

        function openInteractiveAt(screenNumber) {
            switchView('interactive');
            goToScreen(screenNumber);
        }

        // Initialize App on DOM ready
        window.addEventListener('DOMContentLoaded', () => {
            renderAllStaticScreens();
            goToScreen(1);
        });
    </script>
</body>
</html>
