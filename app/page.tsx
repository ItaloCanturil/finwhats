import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/landing-page/HeroSection";
import HowItWorksSection from "@/landing-page/HowItWorksSection";
import FeaturesSection from "@/landing-page/FeaturesSection";
import DemoSection from "@/landing-page/DemoSection";
import PricingSection from "@/landing-page/PricingSection";
import FAQSection from "@/landing-page/FAQSection";

const HomePage = () => {
	return (
		<>
			<Header />
			<main>
				<HeroSection />
				<HowItWorksSection />
				<FeaturesSection />
				<DemoSection />
				<PricingSection />
				<FAQSection />
			</main>
			<Footer />
		</>
	);
};

export default HomePage;
