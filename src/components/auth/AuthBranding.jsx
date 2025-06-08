import { FileText, Users, BarChart3 } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import DecorativeBackground from '../common/DecorativeBackground';

const AuthBranding = () => {
  const features = [
    { icon: FileText, title: "Case Management" },
    { icon: Users, title: "Victim Protection" },
    { icon: BarChart3, title: "Data Analytics" }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
      <DecorativeBackground variant="blue" />
      
      <div className="relative z-10 flex flex-col justify-center items-center w-full px-16 py-20">
        <div className="text-center mb-16">
          <BrandLogo size="xlarge" color="white" className="mb-8 justify-center" />
          <p className="text-xl text-blue-100 font-light max-w-md">
            Empowering justice through technology and transparency
          </p>
        </div>

        <div className="flex space-x-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <IconComponent className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-sm text-blue-100 font-medium">{feature.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthBranding;