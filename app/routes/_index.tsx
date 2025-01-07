import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `End-to-End Manufacturing`,
      description: `From PCB assembly to final product testing, get complete control over your electronics manufacturing process with real-time updates and quality assurance at every step.`,
      icon: <i className="las la-microchip"></i>,
    },
    {
      heading: `Rapid Prototyping`,
      description: `Transform your designs into functional prototypes in record time with our advanced manufacturing capabilities and experienced engineering team.`,
      icon: <i className="las la-bolt"></i>,
    },
    {
      heading: `Quality Control`,
      description: `Industry-leading quality management system with rigorous testing protocols ensures your products meet the highest standards every time.`,
      icon: <i className="las la-check-circle"></i>,
    },
    {
      heading: `Supply Chain Management`,
      description: `Optimize your component sourcing with our global network of verified suppliers and real-time inventory management system.`,
      icon: <i className="las la-link"></i>,
    },
    {
      heading: `Technical Support`,
      description: `Get expert guidance from our engineering team throughout your manufacturing journey, from design review to production optimization.`,
      icon: <i className="las la-tools"></i>,
    },
    {
      heading: `Digital Documentation`,
      description: `Access all your manufacturing documentation, compliance certificates, and quality reports in one secure digital platform.`,
      icon: <i className="las la-file-alt"></i>,
    },
  ]

  const testimonials = [
    {
      name: `David Chen`,
      designation: `CTO, IoT Solutions Inc`,
      content: `Their manufacturing expertise and digital platform transformed our production process. We reduced time-to-market by 40% while maintaining superior quality.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Sarah Williams`,
      designation: `Procurement Manager, Smart Devices Ltd`,
      content: `The transparency and control we get through their platform is game-changing. Real-time updates and quality tracking give us complete peace of mind.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `Operations Director, Tech Innovations`,
      content: `We've scaled our production by 300% since partnering with them. Their digital platform and manufacturing expertise made it seamless.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Startup`,
      description: `Perfect for early-stage hardware companies`,
      monthly: 2999,
      yearly: 32989,
      features: [
        `Up to 1000 units/month`,
        `Basic quality control`,
        `Email support`,
      ],
    },
    {
      title: `Scale-up`,
      description: `For growing hardware businesses`,
      monthly: 4999,
      yearly: 54989,
      features: [
        `Up to 10,000 units/month`,
        `Advanced quality control`,
        `Priority support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large-scale production`,
      monthly: 9999,
      yearly: 109989,
      features: [
        `Unlimited production capacity`,
        `Custom quality protocols`,
        `24/7 dedicated support`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `What types of electronics can you manufacture?`,
      answer: `We specialize in PCB assembly, IoT devices, consumer electronics, and industrial control systems. Our facilities are equipped to handle both simple and complex electronic assemblies.`,
    },
    {
      question: `How do you ensure quality control?`,
      answer: `We implement a rigorous quality management system that includes automated optical inspection (AOI), functional testing, and compliance with international standards like ISO 9001.`,
    },
    {
      question: `What is your minimum order quantity?`,
      answer: `Our minimum order quantity starts at 100 units for most products. However, we offer flexible solutions for prototyping and small batch production.`,
    },
    {
      question: `How long does the manufacturing process take?`,
      answer: `Typical lead times range from 2-4 weeks depending on complexity and quantity. Rush orders can be accommodated for an additional fee.`,
    },
  ]

  const steps = [
    {
      heading: `Submit Your Design`,
      description: `Upload your design files and specifications through our secure digital platform.`,
    },
    {
      heading: `Design Review`,
      description: `Our engineering team reviews your design for manufacturability and provides optimization suggestions.`,
    },
    {
      heading: `Production Setup`,
      description: `We prepare the production line and source components according to your specifications.`,
    },
    {
      heading: `Quality Assured Manufacturing`,
      description: `Your products are manufactured with real-time quality monitoring and regular updates.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😓`,
      title: `Struggling with quality inconsistencies and production delays`,
    },
    {
      emoji: `😟`,
      title: `Losing visibility and control over manufacturing process`,
    },
    {
      emoji: `😤`,
      title: `Dealing with communication gaps and coordination challenges`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your Electronics Manufacturing with Digital Excellence`}
        subtitle={`Join industry leaders who've achieved 40% faster time-to-market and 99.9% quality consistency with our digital manufacturing platform`}
        buttonText={`Start Manufacturing`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/r9slb6-kuvamtemplate1-HGlc`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={500}
            suffixText={`successful manufacturing projects delivered`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Industry Leaders`} />
      <LandingPainPoints
        title={`73% of electronics manufacturers struggle with quality control and production visibility`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to Manufacturing Excellence`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need for World-Class Electronics Manufacturing`}
        subtitle={`Streamline your production process with our comprehensive manufacturing platform`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories from Industry Leaders`}
        subtitle={`Join hundreds of innovative companies who've transformed their manufacturing process`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Scale Your Manufacturing with Confidence`}
        subtitle={`Choose the perfect plan for your production needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Our Manufacturing Services`}
        subtitle={`Everything you need to know about working with us`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Manufacturing?`}
        subtitle={`Join 500+ companies already achieving manufacturing excellence`}
        buttonText={`Start Manufacturing Now`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
