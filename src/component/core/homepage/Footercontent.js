import { Link } from "react-router-dom";
import image from "../../../assets/Logo/Logo-Full-Light.png"
const FooterContent = () => {
    return (
        <footer className="bg-richblack-700 text-richblack-100 py-10">
            <div className="container mx-auto mt-8 flex flex-col md:flex-row justify-between">
                {/* Left Section */}
            <div className="w-full lg:w-[50%] flex flex-wrap justify-start pl-[50px] mb-4 gap-6">
            {/* Company */}
            <div className="flex-1 min-w-[150px]">
                <div className="mb-2">
                <img src={`${image}`}></img>
                </div>
                <h3 className="font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-yellow-500">About Us</Link></li>
                <li><Link to="/team" className="hover:text-yellow-500">Team</Link></li>
                <li><Link to="/blog" className="hover:text-yellow-500">Blog</Link></li>
                </ul>
            </div>

            {/* Resources */}
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                <li><Link to="/Articles" className="hover:text-yellow-500">Articles</Link></li>
                <li><Link to="/Blog" className="hover:text-yellow-500">Blog</Link></li>
                <li><Link to="/ChartSheet" className="hover:text-yellow-500">Chart Sheet</Link></li>
                <li><Link to="/Codechallenges" className="hover:text-yellow-500">Code Challenges</Link></li>
                <li><Link to="/Docs" className="hover:text-yellow-500">Docs</Link></li>
                <li><Link to="/Projects" className="hover:text-yellow-500">Projects</Link></li>
                <li><Link to="/Videos" className="hover:text-yellow-500">Videos</Link></li>
                <li><Link to="/Workspaces" className="hover:text-yellow-500">Workspaces</Link></li>
                </ul>
            </div>

            {/* Plans and Support */}
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-4">Plans</h3>
                <ul className="space-y-2 text-sm">
                <li><Link to="/pricing" className="hover:text-yellow-500">Pricing</Link></li>
                <li><Link to="/free-trial" className="hover:text-yellow-500">Free Trial</Link></li>
                <li><Link to="/enterprise" className="hover:text-yellow-500">Enterprise</Link></li>
                </ul>
                <h3 className="font-bold text-lg mt-6 mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                <li><Link to="/Helpcenter" className="hover:text-yellow-500">Help Center</Link></li>
                </ul>
            </div>
            </div>


                {/* Vertical Line */}
                <div className="hidden md:block w-[1px] bg-richblack-200 mx-5"></div>

               {/* Right Section */}
            <div className="w-full lg:w-[50%] flex flex-wrap pl-[50px] gap-6">
            {/* Subjects */}
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-4">Subjects</h3>
                <ul className="space-y-2 text-sm">
                <li><Link to="/AI" className="hover:text-yellow-500">AI</Link></li>
                <li><Link to="/CloudComputing" className="hover:text-yellow-500">Cloud Computing</Link></li>
                <li><Link to="/CodeFoundations" className="hover:text-yellow-500">Code Foundations</Link></li>
                <li><Link to="/ComputerScience" className="hover:text-yellow-500">Computer Science</Link></li>
                <li><Link to="/Cybersecurity" className="hover:text-yellow-500">Cybersecurity</Link></li>
                <li><Link to="/DataAnalytics" className="hover:text-yellow-500">Data Analytics</Link></li>
                <li><Link to="/DataScience" className="hover:text-yellow-500">Data Science</Link></li>
                <li><Link to="/DataVisualization" className="hover:text-yellow-500">Data Visualization</Link></li>
                <li><Link to="/DeveloperTools" className="hover:text-yellow-500">Developer Tools</Link></li>
                <li><Link to="/DevOps" className="hover:text-yellow-500">DevOps</Link></li>
                <li><Link to="/GameDevelopment" className="hover:text-yellow-500">Game Development</Link></li>
                <li><Link to="/IT" className="hover:text-yellow-500">IT</Link></li>
                <li><Link to="/Math" className="hover:text-yellow-500">Math</Link></li>
                <li><Link to="/MobileDevelopment" className="hover:text-yellow-500">Mobile Development</Link></li>
                <li><Link to="/WebDesign" className="hover:text-yellow-500">Web Design</Link></li>
                <li><Link to="/WebDevelopment" className="hover:text-yellow-500">Web Development</Link></li>
                </ul>
            </div>

            {/* Language */}
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-4">Language</h3>
                <ul className="space-y-2 text-sm">
                <li><Link to="/Bash" className="hover:text-yellow-500">Bash</Link></li>
                <li><Link to="/C" className="hover:text-yellow-500">C</Link></li>
                <li><Link to="/C++" className="hover:text-yellow-500">C++</Link></li>
                <li><Link to="/C#" className="hover:text-yellow-500">C#</Link></li>
                <li><Link to="/Go" className="hover:text-yellow-500">Go</Link></li>
                <li><Link to="/HTML&CSS" className="hover:text-yellow-500">HTML & CSS</Link></li>
                <li><Link to="/Java" className="hover:text-yellow-500">Java</Link></li>
                <li><Link to="/JavaScript" className="hover:text-yellow-500">JavaScript</Link></li>
                <li><Link to="/Kotlin" className="hover:text-yellow-500">Kotlin</Link></li>
                <li><Link to="/PHP" className="hover:text-yellow-500">PHP</Link></li>
                <li><Link to="/Python" className="hover:text-yellow-500">Python</Link></li>
                <li><Link to="/R" className="hover:text-yellow-500">R</Link></li>
                <li><Link to="/Ruby" className="hover:text-yellow-500">Ruby</Link></li>
                <li><Link to="/SQL" className="hover:text-yellow-500">SQL</Link></li>
                <li><Link to="/Swift" className="hover:text-yellow-500">Swift</Link></li>
                </ul>
            </div>

            {/* Career */}
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-lg mb-4">Career</h3>
                <ul className="space-y-2 text-sm">
                <li><Link to="/Careerpaths" className="hover:text-yellow-500">Career paths</Link></li>
                <li><Link to="/Careerservices" className="hover:text-yellow-500">Career services</Link></li>
                <li><Link to="/Interviewprep" className="hover:text-yellow-500">Interview prep</Link></li>
                <li><Link to="/Professionalcertification" className="hover:text-yellow-500">Professional certification</Link></li>
                <li><Link to="/-" className="hover:text-yellow-500">-</Link></li>
                <li><Link to="/FullCatalog" className="hover:text-yellow-500">Full Catalog</Link></li>
                <li><Link to="/BetaContent" className="hover:text-yellow-500">Beta Content</Link></li>
                </ul>
            </div>
            </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-10 text-center text-sm border-t border-gray-700 pt-5">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
                <p className="mt-2">
                    <Link to="/terms" className="hover:text-yellow-500">Terms of Service</Link> |{" "}
                    <Link to="/privacy" className="hover:text-yellow-500">Privacy Policy</Link>
                </p>
            </div>
        </footer>
    );
};

export default FooterContent;
