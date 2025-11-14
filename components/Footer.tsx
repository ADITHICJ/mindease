export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 px-10 mt-20">
      <div className="flex flex-col md:flex-row justify-between">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">MindEase</h3>
          <p className="text-gray-400 text-sm max-w-xs">
            Your companion for emotional wellbeing.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex space-x-10 mt-6 md:mt-0">

          <div>
            <h4 className="font-semibold text-white mb-2">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">Tools</li>
              <li className="hover:underline cursor-pointer">FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">Contact</li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
