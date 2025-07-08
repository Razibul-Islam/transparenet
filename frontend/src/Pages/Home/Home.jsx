import { useState } from "react";
import {
  Shield,
  Package,
  BarChart3,
  Users,
  CheckCircle,
  Globe,
  Clock,
  Eye,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  AlertTriangle,
  Search,
  FileText,
  Smartphone,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("manufacturers");

  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Security",
      description:
        "Blockchain-based tracking ensures tamper-proof records and prevents counterfeit drugs from entering the supply chain.",
    },
    {
      icon: Eye,
      title: "Full Transparency",
      description:
        "Real-time visibility into every step of the drug journey from manufacturer to patient.",
    },
    {
      icon: Clock,
      title: "Faster Response",
      description:
        "Rapid identification and response to supply chain disruptions or safety issues.",
    },
    {
      icon: TrendingUp,
      title: "Cost Reduction",
      description:
        "Optimize inventory management and reduce waste through predictive analytics.",
    },
    {
      icon: Award,
      title: "Compliance Assurance",
      description:
        "Automated compliance monitoring ensures adherence to regulatory requirements.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Support for international supply chains with multi-region tracking capabilities.",
    },
  ];

  const features = [
    {
      icon: Package,
      title: "Smart Tracking",
      description:
        "Track every pharmaceutical product from production to delivery with IoT sensors and RFID technology.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive analytics and reporting tools for supply chain optimization and decision making.",
    },
    {
      icon: AlertTriangle,
      title: "Alert System",
      description:
        "Instant notifications for temperature deviations, delays, or potential security breaches.",
    },
    {
      icon: Search,
      title: "Product Verification",
      description:
        "Quick verification of drug authenticity using QR codes and blockchain verification.",
    },
    {
      icon: FileText,
      title: "Documentation",
      description:
        "Complete audit trails and documentation for regulatory compliance and quality assurance.",
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description:
        "Access the system anywhere with mobile applications for real-time monitoring.",
    },
  ];

  const stakeholders = {
    manufacturers: {
      title: "Pharmaceutical Manufacturers",
      benefits: [
        "Protect brand reputation with authentic product tracking",
        "Streamline production and distribution processes",
        "Ensure regulatory compliance across all markets",
        "Reduce counterfeiting and product diversion",
      ],
    },
    distributors: {
      title: "Distributors & Wholesalers",
      benefits: [
        "Optimize inventory management and reduce waste",
        "Ensure proper storage conditions throughout transit",
        "Maintain complete chain of custody documentation",
        "Improve delivery accuracy and timing",
      ],
    },
    pharmacies: {
      title: "Pharmacies & Retailers",
      benefits: [
        "Verify product authenticity before dispensing",
        "Manage expiration dates and recalls effectively",
        "Maintain patient safety and trust",
        "Streamline inventory tracking and ordering",
      ],
    },
    regulators: {
      title: "Regulatory Bodies",
      benefits: [
        "Real-time monitoring of drug supply chains",
        "Rapid response to safety issues and recalls",
        "Comprehensive audit trails for inspections",
        "Data-driven insights for policy making",
      ],
    },
  };

  const stats = [
    { number: "99.9%", label: "System Uptime", icon: Zap },
    { number: "50M+", label: "Products Tracked", icon: Package },
    { number: "200+", label: "Partners Worldwide", icon: Users },
    { number: "24/7", label: "Monitoring", icon: Clock },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Securing the Global
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Drug Supply Chain
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transparenet provides end-to-end visibility and security for
            pharmaceutical supply chains, ensuring patient safety and regulatory
            compliance through blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Get Started
            </button>
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Transparenet?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive solution addresses the critical challenges in
              pharmaceutical supply chain management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology stack designed for the pharmaceutical industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefits for Every Stakeholder
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparenet creates value across the entire pharmaceutical
              ecosystem
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(stakeholders).map(([key, stakeholder]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/60 text-gray-700 hover:bg-white/80"
                }`}
              >
                {stakeholder.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {stakeholders[activeTab].title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stakeholders[activeTab].benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join leading pharmaceutical companies in securing their supply
              chains with Transparenet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
