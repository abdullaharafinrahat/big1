<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bondhu Foundation - NGO & Volunteer Platform</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Font Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#eefef4',
                            100: '#d6fcd8',
                            500: '#00a651',
                            600: '#008a42',
                            700: '#006c33',
                            800: '#03542a',
                        },
                        darkbg: '#0f172a',
                        darkcard: '#1e293b'
                    },
                    fontFamily: {
                        sans: ['Inter', 'Noto Sans Bengali', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #00a651;
            border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
            background: #1e293b;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #334155;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800 font-sans antialiased min-h-screen flex flex-col custom-scrollbar">

    <!-- Top Direct View Switcher Navigation Bar -->
    <div class="bg-gray-900 text-white py-2 px-4 shadow-md sticky top-0 z-50 flex flex-wrap items-center justify-between gap-2 text-xs border-b border-gray-800">
        <div class="flex items-center space-x-2">
            <span class="bg-brand-500 font-bold px-2 py-0.5 rounded text-white text-[11px] uppercase tracking-wider">Screen Previewer</span>
            <span class="hidden md:inline text-gray-300">Jump directly to any of the 13 reference UI screens:</span>
        </div>
        <div class="flex flex-wrap gap-1 items-center overflow-x-auto py-1 max-w-full">
            <button onclick="switchView(1)" id="btn-view-1" class="view-btn px-2.5 py-1 rounded bg-brand-500 text-white font-semibold transition hover:opacity-90">1. Search</button>
            <button onclick="switchView(2)" id="btn-view-2" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">2. Details</button>
            <button onclick="switchView(3)" id="btn-view-3" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">3. Posts</button>
            <button onclick="switchView(4)" id="btn-view-4" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">4. Activities</button>
            <button onclick="switchView(5)" id="btn-view-5" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">5. Jobs</button>
            <button onclick="switchView(6)" id="btn-view-6" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">6. Job Spec</button>
            <button onclick="switchView(7)" id="btn-view-7" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">7. Application</button>
            <button onclick="switchView(8)" id="btn-view-8" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">8. Verification</button>
            <button onclick="switchView(9)" id="btn-view-9" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">9. Chairman</button>
            <button onclick="switchView(10)" id="btn-view-10" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">10. Contact</button>
            <button onclick="switchView(11)" id="btn-view-11" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">11. Login</button>
            <button onclick="switchView(12)" id="btn-view-12" class="view-btn px-2.5 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 font-semibold transition">12. Drawer</button>
            <button onclick="switchView(13)" id="btn-view-13" class="view-btn px-2.5 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition">13. Dashboard (Dark)</button>
        </div>
    </div>

    <!-- Main Navigation Header (Shared Header Across Pages) -->
    <header class="bg-white border-b border-gray-200 sticky top-[41px] z-40 shadow-sm" id="main-header">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <!-- Brand Logo -->
                <div class="flex items-center space-x-3 cursor-pointer" onclick="switchView(1)">
                    <div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-emerald-700 rounded-full flex items-center justify-center text-white shadow-md">
                        <i class="fa-solid font-bold fa-hand-holding-heart text-2xl"></i>
                    </div>
                    <div>
                        <span class="text-xl font-bold text-gray-900 block leading-tight">Bondhu Foundation</span>
                        <span class="text-xs text-brand-600 font-medium tracking-wide">Empowering Communities</span>
                    </div>
                </div>

                <!-- Multi-Calendar Widget (Exactly as in prompt image) -->
                <div class="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 space-x-3 text-xs">
                    <div class="text-brand-500 text-lg">
                        <i class="fa-regular fa-calendar-days"></i>
                    </div>
                    <div class="border-r border-gray-200 pr-3">
                        <div class="font-bold text-gray-800">12 August 2026</div>
                        <div class="text-gray-500 text-[10px]">Gregorian Calendar</div>
                    </div>
                    <div class="border-r border-gray-200 pr-3">
                        <div class="font-semibold text-gray-700">25 শ্রাবণ ১৪৩৩</div>
                        <div class="text-gray-500 text-[10px]">Bengali Calendar</div>
                    </div>
                    <div>
                        <div class="font-semibold text-gray-700">07 Safar 1448</div>
                        <div class="text-gray-500 text-[10px]">Hijri Calendar</div>
                    </div>
                </div>

                <!-- Nav Menu Links -->
                <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
                    <button onclick="switchView(1)" class="hover:text-brand-500 transition py-1 border-b-2 border-transparent hover:border-brand-500">Home</button>
                    <button onclick="switchView(3)" class="hover:text-brand-500 transition py-1 border-b-2 border-transparent hover:border-brand-500">Posts</button>
                    <button onclick="switchView(4)" class="hover:text-brand-500 transition py-1 border-b-2 border-transparent hover:border-brand-500">Activities</button>
                    <button onclick="switchView(5)" class="hover:text-brand-500 transition py-1 border-b-2 border-transparent hover:border-brand-500">Jobs</button>
                    <button onclick="switchView(10)" class="hover:text-brand-500 transition py-1 border-b-2 border-transparent hover:border-brand-500">Contact</button>
                </nav>

                <!-- Header Buttons -->
                <div class="flex items-center space-x-3">
                    <button onclick="switchView(11)" class="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md text-sm font-semibold shadow-sm transition flex items-center space-x-2">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <span>Login</span>
                    </button>
                    <button onclick="toggleUserDrawer()" class="p-2 text-gray-600 hover:bg-gray-100 rounded-md md:hidden">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- App Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

        <!-- VIEW 1: Organization Search / Listing -->
        <div id="view-1" class="view-container">
            <!-- Search Banner -->
            <div class="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center mb-8 shadow-sm">
                <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Search any keyword</h1>
                <p class="text-gray-500 text-sm max-w-xl mx-auto mb-6">Search organization, activity, job, location and more...</p>
                <div class="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
                    <div class="relative flex-1">
                        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" placeholder="Search any keyword..." class="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm bg-white shadow-sm">
                    </div>
                    <button class="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition">Search</button>
                </div>
            </div>

            <!-- Organizations Grid -->
            <div class="mb-4 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Organizations</h2>
                    <p class="text-gray-500 text-xs">Showing 24 organizations</p>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Org Card 1 -->
                <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
                    <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-brand-500 mb-3 border border-emerald-100">
                        <i class="fa-solid fa-hand-holding-heart text-3xl"></i>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800 mb-1">Bondhu Foundation</h3>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-brand-700 mb-2">
                        <i class="fa-solid fa-circle-check mr-1 text-brand-500"></i> Verified
                    </span>
                    <p class="text-xs text-gray-500 mb-2"><i class="fa-regular fa-calendar text-gray-400 mr-1"></i> Join Date: 12 Mar 2024</p>
                    <div class="flex items-center space-x-1 text-xs text-amber-500 mb-4">
                        <i class="fa-solid fa-star"></i>
                        <span class="font-bold text-gray-700">4.8</span>
                        <span class="text-gray-400">(128)</span>
                    </div>
                    <button onclick="switchView(2)" class="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg text-sm shadow-sm transition">View Details</button>
                </div>

                <!-- Org Card 2 -->
                <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
                    <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3 border border-blue-100">
                        <i class="fa-solid fa-hands-holding-circle text-3xl"></i>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800 mb-1">Humanity First BD</h3>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-brand-700 mb-2">
                        <i class="fa-solid fa-circle-check mr-1 text-brand-500"></i> Verified
                    </span>
                    <p class="text-xs text-gray-500 mb-2"><i class="fa-regular fa-calendar text-gray-400 mr-1"></i> Join Date: 05 Jan 2024</p>
                    <div class="flex items-center space-x-1 text-xs text-amber-500 mb-4">
                        <i class="fa-solid fa-star"></i>
                        <span class="font-bold text-gray-700">4.7</span>
                        <span class="text-gray-400">(95)</span>
                    </div>
                    <button onclick="switchView(2)" class="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg text-sm shadow-sm transition">View Details</button>
                </div>

                <!-- Org Card 3 -->
                <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
                    <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3 border border-green-100">
                        <i class="fa-solid fa-seedling text-3xl"></i>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800 mb-1">Safe Life Society</h3>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-brand-700 mb-2">
                        <i class="fa-solid fa-circle-check mr-1 text-brand-500"></i> Verified
                    </span>
                    <p class="text-xs text-gray-500 mb-2"><i class="fa-regular fa-calendar text-gray-400 mr-1"></i> Join Date: 20 Feb 2024</p>
                    <div class="flex items-center space-x-1 text-xs text-amber-500 mb-4">
                        <i class="fa-solid fa-star"></i>
                        <span class="font-bold text-gray-700">4.9</span>
                        <span class="text-gray-400">(110)</span>
                    </div>
                    <button onclick="switchView(2)" class="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg text-sm shadow-sm transition">View Details</button>
                </div>

                <!-- Org Card 4 -->
                <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
                    <div class="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-3 border border-purple-100">
                        <i class="fa-solid fa-people-group text-3xl"></i>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800 mb-1">Hope for All</h3>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-brand-700 mb-2">
                        <i class="fa-solid fa-circle-check mr-1 text-brand-500"></i> Verified
                    </span>
                    <p class="text-xs text-gray-500 mb-2"><i class="fa-regular fa-calendar text-gray-400 mr-1"></i> Join Date: 12 Nov 2023</p>
                    <div class="flex items-center space-x-1 text-xs text-amber-500 mb-4">
                        <i class="fa-solid fa-star"></i>
                        <span class="font-bold text-gray-700">4.6</span>
                        <span class="text-gray-400">(78)</span>
                    </div>
                    <button onclick="switchView(2)" class="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg text-sm shadow-sm transition">View Details</button>
                </div>
            </div>
            
            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #1: Organization Search / Listing View
            </div>
        </div>

        <!-- VIEW 2: Organization Details -->
        <div id="view-2" class="view-container hidden">
            <!-- Organization Cover Header -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div class="h-48 bg-gradient-to-r from-emerald-600 to-teal-800 relative">
                    <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80" alt="Volunteers Cover" class="w-full h-full object-cover opacity-40">
                </div>
                <div class="px-6 py-4 relative flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 gap-4">
                    <div class="flex flex-col sm:flex-row items-center sm:items-end space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                        <div class="w-28 h-28 bg-white p-2 rounded-full shadow-lg border-2 border-brand-500 relative">
                            <div class="w-full h-full bg-emerald-50 rounded-full flex items-center justify-center text-brand-500">
                                <i class="fa-solid fa-hand-holding-heart text-4xl"></i>
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-center sm:justify-start space-x-2">
                                <h1 class="text-2xl font-bold text-gray-900">Bondhu Foundation</h1>
                                <span class="bg-emerald-100 text-brand-700 text-xs px-2 py-0.5 rounded font-semibold inline-flex items-center">
                                    <i class="fa-solid fa-circle-check text-brand-500 mr-1"></i> Verified
                                </span>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">Join Date: 12 March 2024 &bull; <i class="fa-solid fa-star text-amber-500"></i> 4.8 (128 Reviews)</p>
                        </div>
                    </div>
                    <button class="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg shadow-sm transition flex items-center space-x-2">
                        <i class="fa-solid fa-plus"></i>
                        <span>Follow</span>
                    </button>
                </div>
            </div>

            <!-- Ticker Notice Bar -->
            <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-6 flex items-center text-xs text-emerald-900 space-x-3">
                <span class="bg-brand-500 text-white px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center space-x-1 shrink-0">
                    <i class="fa-solid fa-bullhorn"></i>
                    <span>Latest Notice</span>
                </span>
                <p class="truncate font-medium">Blood Donation Campaign will be held on 20 August 2026 at Dhaka Medical College.</p>
            </div>

            <!-- Chairman Quote Message Card -->
            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
                <div class="relative shrink-0">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" alt="MD. Sajjad Hossain" class="w-24 h-24 rounded-full object-cover border-2 border-brand-500 shadow">
                </div>
                <div class="text-center md:text-left flex-1">
                    <h3 class="text-lg font-bold text-gray-900">Chairman Message</h3>
                    <p class="text-xs font-semibold text-brand-600 mb-2">MD. Sajjad Hossain - Chairman</p>
                    <p class="text-gray-600 italic text-sm leading-relaxed mb-3">
                        "বন্যা ও দুর্যোগে দুর্দশাগ্রস্ত মানুষের পাশে দাঁড়ানো আমাদের সবার মানবিক দায়িত্ব। আসুন আমরা সবাই মিলে একটি সুন্দর সমাজ গড়ে তুলি।"
                    </p>
                    <button onclick="switchView(9)" class="text-xs bg-brand-500 text-white font-medium px-4 py-1.5 rounded hover:bg-brand-600 transition inline-block">Read More</button>
                </div>
            </div>

            <!-- Organization Metrics Stats Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center shadow-sm">
                    <div class="text-2xl sm:text-3xl font-extrabold text-brand-500 mb-1">150+</div>
                    <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activities</div>
                </div>
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center shadow-sm">
                    <div class="text-2xl sm:text-3xl font-extrabold text-brand-500 mb-1">25K+</div>
                    <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Beneficiaries</div>
                </div>
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center shadow-sm">
                    <div class="text-2xl sm:text-3xl font-extrabold text-brand-500 mb-1">300+</div>
                    <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Volunteers</div>
                </div>
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center shadow-sm">
                    <div class="text-2xl sm:text-3xl font-extrabold text-brand-500 mb-1">50+</div>
                    <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</div>
                </div>
            </div>

            <div class="text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #2: Organization Details View
            </div>
        </div>

        <!-- VIEW 3: Posts / News -->
        <div id="view-3" class="view-container hidden">
            <div class="bg-emerald-800 text-white p-6 rounded-2xl mb-6 shadow-sm">
                <h1 class="text-3xl font-bold">All Posts</h1>
                <p class="text-xs text-emerald-200 mt-1">Home / Posts</p>
            </div>

            <!-- Category Pill Filters -->
            <div class="flex items-center space-x-2 overflow-x-auto pb-4 mb-4 text-xs font-medium">
                <button class="px-4 py-2 bg-brand-500 text-white rounded-full shadow-sm">All</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">News</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Activities</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Events</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Notice</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Jobs</button>
            </div>

            <!-- Posts Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Post Card 1 -->
                <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" alt="News" class="w-full h-40 object-cover">
                    <div class="p-4">
                        <span class="bg-emerald-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Events</span>
                        <h3 class="font-bold text-gray-900 mt-2 text-sm line-clamp-2">New Project Launched for Education Support</h3>
                        <p class="text-xs text-gray-400 mt-1"><i class="fa-regular fa-clock mr-1"></i> 10 Aug 2026</p>
                        <a href="#" class="text-xs text-brand-600 font-semibold mt-3 inline-block hover:underline">Read More &rarr;</a>
                    </div>
                </div>

                <!-- Post Card 2 -->
                <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                    <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80" alt="News" class="w-full h-40 object-cover">
                    <div class="p-4">
                        <span class="bg-emerald-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Activities</span>
                        <h3 class="font-bold text-gray-900 mt-2 text-sm line-clamp-2">Blood Donation Campaign Successfully Completed</h3>
                        <p class="text-xs text-gray-400 mt-1"><i class="fa-regular fa-clock mr-1"></i> 08 Aug 2026</p>
                        <a href="#" class="text-xs text-brand-600 font-semibold mt-3 inline-block hover:underline">Read More &rarr;</a>
                    </div>
                </div>

                <!-- Post Card 3 -->
                <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80" alt="News" class="w-full h-40 object-cover">
                    <div class="p-4">
                        <span class="bg-emerald-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">News</span>
                        <h3 class="font-bold text-gray-900 mt-2 text-sm line-clamp-2">Tree Plantation Program at Rajshahi Region</h3>
                        <p class="text-xs text-gray-400 mt-1"><i class="fa-regular fa-clock mr-1"></i> 05 Aug 2026</p>
                        <a href="#" class="text-xs text-brand-600 font-semibold mt-3 inline-block hover:underline">Read More &rarr;</a>
                    </div>
                </div>

                <!-- Post Card 4 -->
                <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                    <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80" alt="News" class="w-full h-40 object-cover">
                    <div class="p-4">
                        <span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Notice</span>
                        <h3 class="font-bold text-gray-900 mt-2 text-sm line-clamp-2">Office Closed on the Occasion of Eid</h3>
                        <p class="text-xs text-gray-400 mt-1"><i class="fa-regular fa-clock mr-1"></i> 03 Aug 2026</p>
                        <a href="#" class="text-xs text-brand-600 font-semibold mt-3 inline-block hover:underline">Read More &rarr;</a>
                    </div>
                </div>

                <!-- Post Card 5 -->
                <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80" alt="News" class="w-full h-40 object-cover">
                    <div class="p-4">
                        <span class="bg-emerald-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Activities</span>
                        <h3 class="font-bold text-gray-900 mt-2 text-sm line-clamp-2">Winter Clothes Distribution Program 2026</h3>
                        <p class="text-xs text-gray-400 mt-1"><i class="fa-regular fa-clock mr-1"></i> 01 Aug 2026</p>
                        <a href="#" class="text-xs text-brand-600 font-semibold mt-3 inline-block hover:underline">Read More &rarr;</a>
                    </div>
                </div>

                <!-- Post Card 6 -->
                <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" alt="News" class="w-full h-40 object-cover">
                    <div class="p-4">
                        <span class="bg-emerald-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">News</span>
                        <h3 class="font-bold text-gray-900 mt-2 text-sm line-clamp-2">New Partnership with Local Hospitals</h3>
                        <p class="text-xs text-gray-400 mt-1"><i class="fa-regular fa-clock mr-1"></i> 31 Jul 2026</p>
                        <a href="#" class="text-xs text-brand-600 font-semibold mt-3 inline-block hover:underline">Read More &rarr;</a>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #3: Posts / News Listing View
            </div>
        </div>

        <!-- VIEW 4: Social Activities -->
        <div id="view-4" class="view-container hidden">
            <div class="bg-purple-900 text-white p-6 rounded-2xl mb-6 shadow-sm">
                <h1 class="text-3xl font-bold">Social Activities</h1>
                <p class="text-xs text-purple-200 mt-1">Home / Social Activities</p>
            </div>

            <div class="flex items-center space-x-2 overflow-x-auto pb-4 mb-4 text-xs font-medium">
                <button class="px-4 py-2 bg-brand-500 text-white rounded-full">All</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Blood Donation</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Education</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Relief</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Environment</button>
                <button class="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 rounded-full border border-gray-200">Health</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Activity 1 -->
                <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=500&q=80" class="w-full h-36 object-cover" alt="Blood Donation">
                    <div class="p-4">
                        <h3 class="font-bold text-gray-900 text-sm mb-2">Blood Donation Campaign</h3>
                        <p class="text-xs text-gray-500 mb-1"><i class="fa-regular fa-calendar text-brand-500 mr-1"></i> 10 Aug 2026</p>
                        <p class="text-xs text-gray-500 mb-3"><i class="fa-solid fa-location-dot text-brand-500 mr-1"></i> Dhaka</p>
                        <button class="w-full py-1.5 border border-brand-500 text-brand-600 hover:bg-brand-50 text-xs font-semibold rounded transition">View Details</button>
                    </div>
                </div>

                <!-- Activity 2 -->
                <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80" class="w-full h-36 object-cover" alt="Winter Clothes">
                    <div class="p-4">
                        <h3 class="font-bold text-gray-900 text-sm mb-2">Winter Clothes Distribution</h3>
                        <p class="text-xs text-gray-500 mb-1"><i class="fa-regular fa-calendar text-brand-500 mr-1"></i> 08 Aug 2026</p>
                        <p class="text-xs text-gray-500 mb-3"><i class="fa-solid fa-location-dot text-brand-500 mr-1"></i> Gazipur</p>
                        <button class="w-full py-1.5 border border-brand-500 text-brand-600 hover:bg-brand-50 text-xs font-semibold rounded transition">View Details</button>
                    </div>
                </div>

                <!-- Activity 3 -->
                <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80" class="w-full h-36 object-cover" alt="Tree Plantation">
                    <div class="p-4">
                        <h3 class="font-bold text-gray-900 text-sm mb-2">Tree Plantation Program</h3>
                        <p class="text-xs text-gray-500 mb-1"><i class="fa-regular fa-calendar text-brand-500 mr-1"></i> 05 Aug 2026</p>
                        <p class="text-xs text-gray-500 mb-3"><i class="fa-solid fa-location-dot text-brand-500 mr-1"></i> Rajshahi</p>
                        <button class="w-full py-1.5 border border-brand-500 text-brand-600 hover:bg-brand-50 text-xs font-semibold rounded transition">View Details</button>
                    </div>
                </div>

                <!-- Activity 4 -->
                <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=500&q=80" class="w-full h-36 object-cover" alt="Food Distribution">
                    <div class="p-4">
                        <h3 class="font-bold text-gray-900 text-sm mb-2">Food Distribution Program</h3>
                        <p class="text-xs text-gray-500 mb-1"><i class="fa-regular fa-calendar text-brand-500 mr-1"></i> 01 Aug 2026</p>
                        <p class="text-xs text-gray-500 mb-3"><i class="fa-solid fa-location-dot text-brand-500 mr-1"></i> Narayanganj</p>
                        <button class="w-full py-1.5 border border-brand-500 text-brand-600 hover:bg-brand-50 text-xs font-semibold rounded transition">View Details</button>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #4: Social Activities View
            </div>
        </div>

        <!-- VIEW 5: Available Jobs -->
        <div id="view-5" class="view-container hidden">
            <div class="bg-amber-600 text-white p-6 rounded-2xl mb-6 shadow-sm">
                <h1 class="text-3xl font-bold">Available Jobs</h1>
                <p class="text-xs text-amber-100 mt-1">Home / Jobs</p>
            </div>

            <!-- Job Filters Bar -->
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    <select class="px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                        <option>All Category</option>
                        <option>IT & Software</option>
                        <option>Management</option>
                        <option>Design</option>
                    </select>
                    <select class="px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                        <option>All Location</option>
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Remote</option>
                    </select>
                    <select class="px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                        <option>Job Type</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Contractual</option>
                    </select>
                </div>
                <button class="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg text-xs shadow transition">
                    <i class="fa-solid fa-filter mr-1"></i> Filter
                </button>
            </div>

            <!-- Job List -->
            <div class="space-y-4">
                <!-- Job Card 1 -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-brand-500 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base">Software Developer</h3>
                        <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                            <span class="bg-emerald-100 text-brand-700 px-2 py-0.5 rounded font-medium"><i class="fa-solid fa-briefcase mr-1"></i> Full Time</span>
                            <span><i class="fa-solid fa-location-dot mr-1"></i> Dhaka</span>
                            <span><i class="fa-regular fa-clock mr-1"></i> Deadline: 31-Aug-2026</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                        <button onclick="switchView(6)" class="text-xs font-semibold text-gray-600 hover:text-brand-600">View Job</button>
                        <button onclick="switchView(7)" class="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg shadow-sm transition">Apply Now</button>
                    </div>
                </div>

                <!-- Job Card 2 -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-brand-500 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base">Graphic Designer</h3>
                        <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                            <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium"><i class="fa-solid fa-briefcase mr-1"></i> Full Time</span>
                            <span><i class="fa-solid fa-laptop-house mr-1"></i> Remote</span>
                            <span><i class="fa-regular fa-clock mr-1"></i> Deadline: 28-Aug-2026</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                        <button onclick="switchView(6)" class="text-xs font-semibold text-gray-600 hover:text-brand-600">View Job</button>
                        <button onclick="switchView(7)" class="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg shadow-sm transition">Apply Now</button>
                    </div>
                </div>

                <!-- Job Card 3 -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-brand-500 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base">Program Officer</h3>
                        <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                            <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium"><i class="fa-solid fa-briefcase mr-1"></i> Full Time</span>
                            <span><i class="fa-solid fa-location-dot mr-1"></i> Chittagong</span>
                            <span><i class="fa-regular fa-clock mr-1"></i> Deadline: 25-Aug-2026</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                        <button onclick="switchView(6)" class="text-xs font-semibold text-gray-600 hover:text-brand-600">View Job</button>
                        <button onclick="switchView(7)" class="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg shadow-sm transition">Apply Now</button>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #5: Job Listings View
            </div>
        </div>

        <!-- VIEW 6: Job Details -->
        <div id="view-6" class="view-container hidden">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main Spec Container -->
                <div class="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">Software Developer</h1>
                    <div class="flex flex-wrap items-center gap-3 text-xs mb-6">
                        <span class="bg-red-100 text-red-600 px-2.5 py-1 rounded font-semibold"><i class="fa-solid fa-clock mr-1"></i> Full Time</span>
                        <span class="text-gray-600"><i class="fa-solid fa-location-dot text-brand-500 mr-1"></i> Dhaka</span>
                        <span class="text-gray-600"><i class="fa-solid fa-money-bill-wave text-brand-500 mr-1"></i> Salary: 40,000 - 60,000 BDT</span>
                    </div>

                    <div class="bg-emerald-50 border-l-4 border-brand-500 p-3 rounded mb-6 text-xs text-brand-800">
                        <i class="fa-solid fa-calendar-check mr-1"></i> <strong>Deadline:</strong> 31-Aug-2026
                    </div>

                    <div class="space-y-6 text-sm text-gray-700">
                        <div>
                            <h3 class="text-base font-bold text-gray-900 mb-2">Job Description</h3>
                            <p class="leading-relaxed text-xs sm:text-sm text-gray-600">
                                বন্ধু ফাউন্ডেশনের ওয়েব অ্যাপ্লিকেশন এবং ডিজিটাল প্ল্যাটফর্ম উন্নয়নের জন্য অভিজ্ঞ সফটওয়্যার ডেভেলপার প্রয়োজন। আমাদের সামাজিক প্রভাব বাড়াতে প্রযুক্তিভিত্তিক সমাধান তৈরিতে কাজ করতে হবে।
                            </p>
                        </div>

                        <div>
                            <h3 class="text-base font-bold text-gray-900 mb-2">Requirements</h3>
                            <ul class="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                                <li>At least 2 years experience</li>
                                <li>Strong knowledge in PHP, Laravel, JS</li>
                                <li>Database design & management</li>
                                <li>Good communication skills</li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-base font-bold text-gray-900 mb-2">Benefits</h3>
                            <ul class="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                                <li>Professional environment</li>
                                <li>Festival bonus</li>
                                <li>Career growth opportunity</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Org Details Card -->
                <div class="space-y-6">
                    <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                        <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-brand-500 mx-auto mb-3">
                            <i class="fa-solid fa-hand-holding-heart text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-900 text-base">Bondhu Foundation</h3>
                        <span class="text-xs text-brand-600 font-semibold block mt-1"><i class="fa-solid fa-circle-check"></i> Verified Organization</span>
                        <div class="flex items-center justify-center space-x-1 text-xs text-amber-500 my-3">
                            <i class="fa-solid fa-star"></i>
                            <span class="font-bold text-gray-700">4.8</span>
                            <span class="text-gray-400">(128 reviews)</span>
                        </div>
                        <button onclick="switchView(7)" class="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg text-sm shadow transition">
                            Apply Now
                        </button>
                        <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center space-x-4 text-gray-400 text-sm">
                            <span class="text-xs text-gray-500">Share Job:</span>
                            <a href="#" class="hover:text-blue-600"><i class="fa-brands fa-facebook"></i></a>
                            <a href="#" class="hover:text-blue-400"><i class="fa-brands fa-twitter"></i></a>
                            <a href="#" class="hover:text-blue-700"><i class="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #6: Job Specification Details View
            </div>
        </div>

        <!-- VIEW 7: Job Application Form -->
        <div id="view-7" class="view-container hidden">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                <div class="border-b border-gray-100 pb-4 mb-6">
                    <p class="text-xs text-gray-400">Home / Jobs / Software Developer / Apply</p>
                    <h1 class="text-2xl font-bold text-gray-900 mt-1">Application Form</h1>
                </div>

                <form onsubmit="event.preventDefault(); alert('Application Submitted Successfully!'); switchView(13);" class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                            <input type="text" placeholder="Enter your full name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Mobile Number *</label>
                            <input type="tel" placeholder="017XXXXXXXX" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Email *</label>
                        <input type="email" placeholder="Enter your email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none">
                    </div>

                    <!-- Address Select Cascade -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Division *</label>
                            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                                <option>Rajshahi</option>
                                <option>Sylhet</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">District *</label>
                            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                                <option>Select District</option>
                                <option selected>Dhaka</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Upazila *</label>
                            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                                <option>Select Upazila</option>
                                <option selected>Dhanmondi</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Union / Thana</label>
                            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                                <option>Select Union</option>
                                <option selected>Dhanmondi Thana</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Word</label>
                            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-700">
                                <option>Select Word</option>
                                <option selected>Word 15</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Upload CV *</label>
                            <input type="file" required class="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs bg-white text-gray-500">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Why should we hire you?</label>
                        <textarea rows="4" placeholder="Write something about yourself..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"></textarea>
                    </div>

                    <div class="text-center pt-2">
                        <button type="submit" class="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg text-sm shadow-md transition">
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #7: Job Application Form View
            </div>
        </div>

        <!-- VIEW 8: Org Information / Verification -->
        <div id="view-8" class="view-container hidden">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <!-- Sidebar Menu -->
                <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <h3 class="font-bold text-gray-800 text-xs uppercase tracking-wider mb-3 px-2">Navigation</h3>
                    <nav class="space-y-1 text-xs font-medium">
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg bg-brand-50 text-brand-700 font-bold">
                            <i class="fa-solid fa-shield-halved mr-2"></i> Verification Status
                        </a>
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                            <i class="fa-solid fa-file-lines mr-2"></i> Documents
                        </a>
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                            <i class="fa-solid fa-address-book mr-2"></i> Contact Information
                        </a>
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                            <i class="fa-solid fa-map-location-dot mr-2"></i> Working Area
                        </a>
                    </nav>
                </div>

                <!-- Main Verification Content -->
                <div class="md:col-span-3 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Verification Status</h2>
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs">
                            <div class="flex items-center space-x-3">
                                <i class="fa-solid fa-circle-check text-brand-500 text-lg"></i>
                                <span class="font-semibold text-gray-800">Organization Verified</span>
                            </div>
                            <span class="bg-brand-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Verified</span>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs">
                            <div class="flex items-center space-x-3">
                                <i class="fa-solid fa-circle-check text-brand-500 text-lg"></i>
                                <span class="font-semibold text-gray-800">Mobile Verified</span>
                            </div>
                            <span class="bg-brand-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Verified</span>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs">
                            <div class="flex items-center space-x-3">
                                <i class="fa-solid fa-circle-check text-brand-500 text-lg"></i>
                                <span class="font-semibold text-gray-800">Address Verified</span>
                            </div>
                            <span class="bg-brand-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Verified</span>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs">
                            <div class="flex items-center space-x-3">
                                <i class="fa-solid fa-circle-check text-brand-500 text-lg"></i>
                                <span class="font-semibold text-gray-800">Information Reviewed</span>
                            </div>
                            <span class="bg-brand-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Passed</span>
                        </div>
                    </div>

                    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
                        <p>Your organization information has been verified successfully.</p>
                        <span class="text-[10px] text-gray-400 mt-1 block">Last verified on 10 August 2026</span>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #8: Org Information / Verification View
            </div>
        </div>

        <!-- VIEW 9: Chairman Profile -->
        <div id="view-9" class="view-container hidden">
            <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-4xl mx-auto">
                <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-gray-100">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" alt="MD. Sajjad Hossain" class="w-28 h-28 rounded-full object-cover border-4 border-brand-500 shadow-md">
                    <div class="text-center sm:text-left">
                        <h1 class="text-2xl font-bold text-gray-900">MD. Sajjad Hossain</h1>
                        <p class="text-brand-600 font-semibold text-sm">Chairman</p>
                        <div class="flex items-center justify-center sm:justify-start space-x-3 mt-3 text-gray-500">
                            <a href="#" class="hover:text-brand-500"><i class="fa-brands fa-facebook text-lg"></i></a>
                            <a href="#" class="hover:text-brand-500"><i class="fa-brands fa-linkedin text-lg"></i></a>
                            <a href="#" class="hover:text-brand-500"><i class="fa-solid fa-envelope text-lg"></i></a>
                        </div>
                    </div>
                </div>

                <!-- Tabs Navigation -->
                <div class="flex border-b border-gray-200 mt-6 text-xs font-bold text-gray-600">
                    <button class="px-4 py-2 text-brand-600 border-b-2 border-brand-500">About</button>
                    <button class="px-4 py-2 hover:text-brand-600">Message</button>
                    <button class="px-4 py-2 hover:text-brand-600">Vision</button>
                    <button class="px-4 py-2 hover:text-brand-600">Activities</button>
                </div>

                <!-- Tab Details -->
                <div class="pt-6 space-y-4 text-xs sm:text-sm text-gray-700">
                    <p class="leading-relaxed">
                        MD. Sajjad Hossain একজন সমাজসেবক ও উদ্যোক্তা। তিনি দীর্ঘ ১০ বছর ধরে বিভিন্ন সামাজিক ও মানবিক কর্মকাণ্ডের সাথে যুক্ত আছেন। তিনি বন্ধু ফাউন্ডেশনের প্রতিষ্ঠাতা চেয়ারম্যান হিসেবে অসহায় মানুষের সেবায় নিরলস কাজ করে যাচ্ছেন।
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
                        <div>
                            <span class="font-bold text-gray-900 block">Education:</span>
                            <span class="text-gray-600">MSc (DU)</span>
                        </div>
                        <div>
                            <span class="font-bold text-gray-900 block">Experience:</span>
                            <span class="text-gray-600">10+ Years</span>
                        </div>
                        <div>
                            <span class="font-bold text-gray-900 block">Profession:</span>
                            <span class="text-gray-600">Social Worker</span>
                        </div>
                        <div>
                            <span class="font-bold text-gray-900 block">Nationality:</span>
                            <span class="text-gray-600">Bangladeshi</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #9: Chairman Profile View
            </div>
        </div>

        <!-- VIEW 10: Contact / Maps -->
        <div id="view-10" class="view-container hidden">
            <div class="text-xs text-gray-400 mb-2">Home / Chairman / Contact</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Info Side -->
                <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <h2 class="text-xl font-bold text-gray-900">Get in Touch</h2>
                    
                    <div class="space-y-4 text-xs">
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <span class="font-bold text-gray-800 block">Phone</span>
                                <span class="text-gray-600">+880 1234-567890</span>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div>
                                <span class="font-bold text-gray-800 block">Email</span>
                                <span class="text-gray-600">info@bondhufoundation.org</span>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div>
                                <span class="font-bold text-gray-800 block">Address</span>
                                <span class="text-gray-600">House 23, Road 08, Dhanmondi, Dhaka-1205, Bangladesh</span>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-100 pt-4">
                        <h3 class="font-bold text-gray-800 text-xs mb-2">Opening Times</h3>
                        <div class="text-xs text-gray-600 space-y-1">
                            <p class="flex justify-between"><span>Saturday - Thursday:</span> <span class="font-semibold">09:00 AM - 05:00 PM</span></p>
                            <p class="flex justify-between"><span>Friday:</span> <span class="text-red-500 font-semibold">Closed</span></p>
                        </div>
                    </div>
                </div>

                <!-- Simulated Map View -->
                <div class="bg-gray-200 rounded-2xl border border-gray-300 relative overflow-hidden min-h-[300px] flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" alt="Map" class="w-full h-full object-cover opacity-60">
                    <div class="absolute bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-200 text-center flex items-center space-x-2">
                        <i class="fa-solid fa-location-dot text-red-500 text-xl animate-bounce"></i>
                        <span class="font-bold text-xs text-gray-800">Bondhu Foundation HQ</span>
                    </div>
                    <button class="absolute bottom-4 right-4 bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow hover:bg-brand-600 transition">Get Directions</button>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #10: Contact / Map Location View
            </div>
        </div>

        <!-- VIEW 11: Login Page -->
        <div id="view-11" class="view-container hidden">
            <div class="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i class="fa-solid fa-hand-holding-heart text-3xl"></i>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p class="text-xs text-gray-500 mt-1">Login to your account</p>
                </div>

                <form onsubmit="event.preventDefault(); switchView(13);" class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Mobile Number / User ID</label>
                        <input type="text" placeholder="017XXXXXXXX" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Password</label>
                        <input type="password" placeholder="••••••••" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none">
                    </div>

                    <div class="flex items-center justify-between text-xs">
                        <label class="flex items-center text-gray-600">
                            <input type="checkbox" class="rounded text-brand-500 mr-2"> Remember me
                        </label>
                        <a href="#" class="text-brand-600 hover:underline">Forgot Password?</a>
                    </div>

                    <button type="submit" class="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg text-sm shadow transition">
                        Login
                    </button>

                    <div class="text-center text-xs text-gray-500 pt-2">
                        Don't have an account? <a href="#" class="text-brand-600 font-bold hover:underline">Create Account</a>
                    </div>
                </form>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #11: Login Authentication View
            </div>
        </div>

        <!-- VIEW 12: User Profile / Navigation Drawer -->
        <div id="view-12" class="view-container hidden">
            <div class="max-w-xs mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <!-- User Banner -->
                <div class="p-6 bg-slate-50 text-center border-b border-gray-100">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" class="w-16 h-16 rounded-full mx-auto border-2 border-brand-500 mb-2 object-cover" alt="User">
                    <h3 class="font-bold text-gray-900 text-sm">MD. Riaz Hossain</h3>
                    <p class="text-xs text-gray-500">User</p>
                </div>

                <!-- Navigation List -->
                <div class="p-3 space-y-1 text-xs font-medium text-gray-700">
                    <button onclick="switchView(13)" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-brand-50 text-brand-600 font-bold">
                        <i class="fa-solid fa-gauge text-base"></i>
                        <span>Dashboard</span>
                    </button>
                    <button onclick="switchView(2)" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <i class="fa-solid fa-building text-base text-gray-400"></i>
                        <span>Organization Profile</span>
                    </button>
                    <button onclick="switchView(5)" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <i class="fa-solid fa-briefcase text-base text-gray-400"></i>
                        <span>Street / Jobs</span>
                    </button>
                    <button class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <div class="flex items-center space-x-3">
                            <i class="fa-solid fa-bell text-base text-gray-400"></i>
                            <span>Notifications</span>
                        </div>
                        <span class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                    </button>
                    <button class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <div class="flex items-center space-x-3">
                            <i class="fa-solid fa-comments text-base text-gray-400"></i>
                            <span>Messages</span>
                        </div>
                        <span class="bg-brand-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
                    </button>
                    <button onclick="switchView(9)" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <i class="fa-solid fa-user text-base text-gray-400"></i>
                        <span>Profile</span>
                    </button>
                    <button class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <i class="fa-solid fa-gear text-base text-gray-400"></i>
                        <span>Settings</span>
                    </button>
                    <div class="pt-2 border-t border-gray-100">
                        <button onclick="switchView(11)" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50">
                            <i class="fa-solid fa-arrow-right-from-bracket text-base"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #12: Navigation Drawer / User Sidebar View
            </div>
        </div>

        <!-- VIEW 13: Organization Dashboard (Separate Skin) -->
        <div id="view-13" class="view-container hidden">
            <!-- Dark Mode Dashboard Wrapper -->
            <div class="bg-darkbg text-gray-100 rounded-2xl p-6 shadow-2xl border border-slate-800">
                <!-- Dashboard Header -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                    <div>
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                <i class="fa-solid fa-chart-line text-lg"></i>
                            </div>
                            <div>
                                <h1 class="text-xl font-bold">Bondhu Foundation</h1>
                                <p class="text-xs text-indigo-400">Organization Admin Panel</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 text-xs">
                        <span class="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                            <i class="fa-solid fa-user-shield text-emerald-400 mr-1.5"></i> Admin Access
                        </span>
                        <button onclick="switchView(1)" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition border border-slate-700">
                            Exit Admin Skin
                        </button>
                    </div>
                </div>

                <!-- Section Label -->
                <div class="mt-6 mb-4">
                    <h2 class="text-lg font-bold text-white">Dashboard Overview</h2>
                </div>

                <!-- Stats Counters Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <!-- Stat Card 1 -->
                    <div class="bg-darkcard p-5 rounded-xl border border-slate-800">
                        <div class="text-xs text-slate-400 mb-2">Total Posts</div>
                        <div class="text-3xl font-extrabold text-white">45</div>
                    </div>

                    <!-- Stat Card 2 -->
                    <div class="bg-darkcard p-5 rounded-xl border border-slate-800">
                        <div class="text-xs text-slate-400 mb-2">Total Activities</div>
                        <div class="text-3xl font-extrabold text-indigo-400">28</div>
                    </div>

                    <!-- Stat Card 3 -->
                    <div class="bg-darkcard p-5 rounded-xl border border-slate-800">
                        <div class="text-xs text-slate-400 mb-2">Total Jobs</div>
                        <div class="text-3xl font-extrabold text-cyan-400">12</div>
                    </div>

                    <!-- Stat Card 4 -->
                    <div class="bg-darkcard p-5 rounded-xl border border-slate-800">
                        <div class="text-xs text-slate-400 mb-2">Total Applications</div>
                        <div class="text-3xl font-extrabold text-emerald-400">24</div>
                    </div>
                </div>

                <!-- Job Applications Table -->
                <div class="bg-darkcard rounded-xl border border-slate-800 overflow-hidden">
                    <div class="p-4 border-b border-slate-800 flex justify-between items-center">
                        <h3 class="font-bold text-sm text-white">Recent Job Applications</h3>
                        <a href="#" class="text-xs text-indigo-400 hover:underline font-semibold">View All Applications &rarr;</a>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th class="p-3.5">Name</th>
                                    <th class="p-3.5">Job Title</th>
                                    <th class="p-3.5">Applied Date</th>
                                    <th class="p-3.5">Status</th>
                                    <th class="p-3.5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-800 text-slate-300">
                                <tr>
                                    <td class="p-3.5 font-medium text-white">Sajid Ahmed</td>
                                    <td class="p-3.5">Software Developer</td>
                                    <td class="p-3.5 text-slate-400">10 Aug 2026</td>
                                    <td class="p-3.5">
                                        <span class="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded">New</span>
                                    </td>
                                    <td class="p-3.5 text-right">
                                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition">View</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="p-3.5 font-medium text-white">Nusrat Jahan</td>
                                    <td class="p-3.5">Graphic Designer</td>
                                    <td class="p-3.5 text-slate-400">09 Aug 2026</td>
                                    <td class="p-3.5">
                                        <span class="bg-indigo-950 text-indigo-400 border border-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded">Shortlisted</span>
                                    </td>
                                    <td class="p-3.5 text-right">
                                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition">View</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="p-3.5 font-medium text-white">Rashedul Islam</td>
                                    <td class="p-3.5">Program Officer</td>
                                    <td class="p-3.5 text-slate-400">08 Aug 2026</td>
                                    <td class="p-3.5">
                                        <span class="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">Under Review</span>
                                    </td>
                                    <td class="p-3.5 text-right">
                                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition">View</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="p-3.5 font-medium text-white">Mehedi Hasan</td>
                                    <td class="p-3.5">Project Coordinator</td>
                                    <td class="p-3.5 text-slate-400">07 Aug 2026</td>
                                    <td class="p-3.5">
                                        <span class="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded">New</span>
                                    </td>
                                    <td class="p-3.5 text-right">
                                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition">View</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center text-xs text-gray-400 font-semibold bg-gray-200 py-1.5 rounded-md">
                Screen #13: Organization Admin Dashboard (Dark Theme Skin)
            </div>
        </div>

    </main>

    <!-- Shared Footer -->
    <footer class="bg-gray-900 text-gray-400 text-xs border-t border-gray-800 mt-12 py-8">
        <div class="max-w-7xl mx-auto px-4 text-center space-y-3">
            <div class="flex items-center justify-center space-x-2 text-white font-bold text-base">
                <i class="fa-solid fa-hand-holding-heart text-brand-500"></i>
                <span>Bondhu Foundation</span>
            </div>
            <p class="text-gray-500">Dedicated to non-profit social welfare and humanitarian support across Bangladesh.</p>
            <p>&copy; 2026 Bondhu Foundation. All Rights Reserved.</p>
        </div>
    </footer>

    <!-- Interactive JavaScript Logic -->
    <script>
        function switchView(viewNumber) {
            // Hide all view containers
            const views = document.querySelectorAll('.view-container');
            views.forEach(view => view.classList.add('hidden'));

            // Show selected view
            const selectedView = document.getElementById(`view-${viewNumber}`);
            if (selectedView) {
                selectedView.classList.remove('hidden');
            }

            // Update header styling for View 13 (Dark mode admin skin vs Light public skin)
            const header = document.getElementById('main-header');
            if (viewNumber === 13) {
                header.classList.add('opacity-50');
            } else {
                header.classList.remove('opacity-50');
            }

            // Highlight corresponding toolbar button
            const buttons = document.querySelectorAll('.view-btn');
            buttons.forEach(btn => {
                btn.classList.remove('bg-brand-500', 'text-white');
                btn.classList.add('bg-gray-800', 'text-gray-300');
            });

            const activeBtn = document.getElementById(`btn-view-${viewNumber}`);
            if (activeBtn) {
                activeBtn.classList.remove('bg-gray-800', 'text-gray-300');
                activeBtn.classList.add('bg-brand-500', 'text-white');
            }

            // Smooth scroll to top of view
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function toggleUserDrawer() {
            switchView(12);
        }
    </script>
</body>
</html>
