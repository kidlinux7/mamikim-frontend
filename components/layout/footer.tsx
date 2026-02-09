import Link from "next/link";
import Image from 'next/image'
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import footerlogo from '@/public/footer.png';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white relative">
            {/* Curved white line at top */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-white rounded-b-full"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Left Column - Mamikim Academy */}
                    <div className="md:col-span-1">
            <div className="flex items-center">
              <Image src={footerlogo} alt="Logo" width={50} height={50} />
              <div className="ml-3">
                <span className="text-2xl font-bold text-gray-900">Mamikim</span>
                <div className="text-xs text-gray-500 uppercase tracking-wider">ACADEMY</div>
              </div>
            </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Empowering learners worldwide with expert-led courses and practical skills in baking and culinary arts.
                        </p>
                        <div className="flex items-center text-gray-400 mb-4">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span className="text-white">Opening Hours</span>
                        </div>
                        <div className="text-orange-500 font-medium">8 am - 7pm</div>
                    </div>

                    {/* Second Column - Categories */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-white mb-4">
                            Categories
                            <div className="w-8 h-0.5 bg-orange-500 mt-2"></div>
                        </h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Baking</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Business management</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sales & Digital marketing</a></li>
                        </ul>
                    </div>

                    {/* Third Column - Popular Courses */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-white mb-4">
                            Popular Courses
                            <div className="w-8 h-0.5 bg-orange-500 mt-2"></div>
                        </h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Baking like you</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cake its</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Essential Cooking</a></li>
                        </ul>
                    </div>

                    {/* Right Column - Subscribe for newsletter */}
                    <div className="md:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-6 h-6 border-2 border-white rounded flex items-center justify-center mr-2">
                                <div className="w-2 h-1 bg-white rounded-sm"></div>
                            </div>
                            <h3 className="text-lg font-bold text-white">Subscribe for newsletter</h3>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Get the latest updates on new courses and learning opportunities.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-orange-500 text-gray-800"
                            />
                            <button className="bg-orange-500 text-white px-4 py-3 rounded-r-lg hover:bg-orange-600 transition-colors font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kitchen Illustrations */}
                {/* <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex justify-center space-x-8 opacity-20">
                        <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center">
                            <span className="text-white text-2xl">🥄</span>
                        </div>
                        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">🍶</span>
                        </div>
                        <div className="w-14 h-14 border-2 border-white rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">🥣</span>
                        </div>
                        <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">🧂</span>
                        </div>
                        <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center">
                            <span className="text-white text-2xl">🥄</span>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Orange Bottom Strip */}
            <div className="bg-orange-500 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-white font-medium">
                      © {currentYear} Mamikim Academy. All right reserved
                    </p>
                </div>
            </div>
        </footer>
  );
}